/**
 * Lead capture → LeadZap agency pipeline.
 *
 * One write, fire-and-forget so a visitor's submit never blocks on it: a
 * plain `no-cors` POST to a bound Google Apps Script web app that appends a
 * row to the agency's Sheet. (The old second write to an agency Supabase
 * `leads` table was removed 10 Oct 2026: the table never existed, so it only
 * sent the visitor's details out for nothing.) The LeadZap enquiry backup
 * (src/lib/enquiry.ts) is called separately by the form.
 *
 * Any client site reuses this module by overriding the VITE_* build vars and
 * VITE_CLIENT_SLUG. If the Sheet is not configured the lead is stashed to
 * localStorage so nothing is silently lost.
 */

// --- Google Sheet (Apps Script web app) ---------------------------------
const SHEET_URL =
  (import.meta.env.VITE_LEADS_SHEET_URL as string | undefined) || "";
const SHEET_TOKEN =
  (import.meta.env.VITE_LEADS_SHEET_TOKEN as string | undefined) || "";

/** Which client site this build belongs to — the tenant key everywhere. */
const CLIENT_SLUG =
  (import.meta.env.VITE_CLIENT_SLUG as string | undefined) || "kova";

export type LeadInput = {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  message?: string;
  interest?: string;
  configSummary?: string | null;
  lang?: string;
};

/**
 * Submit a lead to every configured destination. Resolves `true` if at least
 * one write reported success. Never throws — the caller should always show the
 * visitor a friendly confirmation regardless. On total failure the lead is
 * stashed to localStorage as a backstop.
 */
export async function submitLead(input: LeadInput): Promise<boolean> {
  const row = {
    client_slug: CLIENT_SLUG,
    name: input.name || null,
    phone: input.phone || null,
    email: input.email || null,
    location: input.location || null,
    message: input.message || null,
    interest: input.interest || null,
    config_summary: input.configSummary || null,
    lang: input.lang || "en",
    source_url: typeof window !== "undefined" ? window.location.href : null,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
  };

  // The Sheet write is no-cors (opaque) so we can't confirm it — treat a
  // configured Sheet as best-effort success. Stash only when it is unconfigured.
  const ok = await sendToSheet(row);
  if (!ok && !(SHEET_URL && SHEET_TOKEN)) {
    stash(row);
    return false;
  }
  return true;
}

/**
 * Append to the Google Sheet via the Apps Script web app. `no-cors` because
 * Apps Script sends no CORS headers — the POST still goes through, we just get
 * an opaque response we can't read (which is fine, it's fire-and-forget).
 */
async function sendToSheet(row: Record<string, unknown>): Promise<boolean> {
  if (!SHEET_URL || !SHEET_TOKEN) return false;
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      // text/plain avoids a CORS preflight; the script JSON.parses the body.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: SHEET_TOKEN, ...row }),
    });
    return true; // opaque — assume delivered
  } catch (err) {
    console.warn("[leads] sheet write failed", err);
    return false;
  }
}

/** Backstop: keep failed leads in localStorage so they can be recovered. */
function stash(row: unknown) {
  try {
    const key = "kova-unsent-leads";
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.push({ ...(row as object), stashed_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(arr));
  } catch {
    /* localStorage unavailable — nothing more we can do */
  }
}
