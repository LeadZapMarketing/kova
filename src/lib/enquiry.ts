/**
 * LeadZap enquiry intake (backup copy of every form enquiry, 9 Oct 2026).
 *
 * Sent AS WELL AS the form's own delivery (Sheet + WhatsApp),
 * never instead of it. Each enquiry is queued in localStorage and retried
 * until the intake stores it (or answers that it never can), so a closed tab
 * or a dropped connection loses nothing. The same id again is the same
 * enquiry, so retrying is safe. The intake only accepts the site's own
 * origins: a local build gets 403 and nothing is stored.
 */

const INTAKE_URL =
  "https://kira-prod.tail1a5ab5.ts.net/intake/v1/lzs_Xm8z5-eSveHs4NRv3ZCimAYm";
const QUEUE_KEY = "lz-enquiries";
const MAX_AGE_MS = 7 * 864e5;

type Enquiry = {
  id: string;
  form: string;
  page: string;
  fields: Record<string, string>;
  submitted_at: string;
  hp: string;
};

function load(): Enquiry[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(queue: Enquiry[]) {
  try {
    if (queue.length) localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-20)));
    else localStorage.removeItem(QUEUE_KEY);
  } catch {
    /* storage full or blocked: nothing more to do */
  }
}

function post(item: Enquiry): Promise<boolean> {
  return fetch(INTAKE_URL, {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(item),
  })
    // Stored, or never storable: stop retrying either way.
    .then((r) => r.ok || [400, 403, 404, 413].includes(r.status))
    .catch(() => false);
}

function flush() {
  const queue = load().filter((i) => Date.now() - Date.parse(i.submitted_at) < MAX_AGE_MS);
  if (!queue.length) {
    save([]);
    return;
  }
  Promise.all(queue.map(post)).then((ok) => save(queue.filter((_, i) => !ok[i])));
}

/** Call right after the form's own send, e.g. lzEnquiry("contact", { name, phone, ... }). */
export function lzEnquiry(form: string, fields: Record<string, string>) {
  if (typeof window === "undefined") return;
  const id =
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
  const queue = load();
  queue.push({
    id,
    form,
    page: location.href,
    fields,
    submitted_at: new Date().toISOString(),
    hp: "",
  });
  save(queue);
  flush();
}

// Anything a closed tab left behind goes on the next page load.
if (typeof window !== "undefined") flush();
