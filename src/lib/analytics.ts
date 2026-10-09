/**
 * Analytics events.
 *
 * WhatsApp is the primary conversion action on this site (Malaysian
 * customers tap-to-chat rather than fill a form), so every WhatsApp entry
 * point reports a `whatsapp_click` event. The agency console counts leads
 * on that EXACT event name — renaming it silently zeroes the counter — and
 * the same name/category/label triple is used across all LeadZap client
 * sites so the numbers stay comparable.
 *
 * Everything here is best-effort and must NEVER interfere with the click:
 * the handlers below only ever send a beacon, never call preventDefault,
 * so if gtag/GTM is missing or blocked by an ad blocker the link still
 * navigates to WhatsApp exactly as before.
 */

// window.gtag / window.dataLayer are declared globally in vite-env.d.ts.

/**
 * Fire the WhatsApp conversion event.
 *
 * Sent to both destinations so it works whichever tag is installed:
 *   - gtag.js (GA4) — the direct `event` command.
 *   - GTM — a dataLayer push, which gtag.js itself ignores (it only reads
 *     arguments-style commands), so this cannot double-count on a GA4-only
 *     install.
 *
 * The links are all `target="_blank"`, so the current document survives the
 * click and the beacon has time to leave — no navigation delay needed.
 */
export function trackWhatsAppClick() {
  sendLeadEvent("whatsapp_click", "whatsapp_button");
}

/**
 * Fire when the contact form's backend accepted a real lead. Call it only
 * after submitLead() resolved `true` — never for the honeypot (spam) path
 * or a submit that never left the browser.
 */
export function trackGenerateLead() {
  sendLeadEvent("generate_lead", "contact_form");
}

/** Fire on a tap of any `tel:` link. */
export function trackPhoneClick() {
  sendLeadEvent("phone_click", "phone_link");
}

/**
 * The one way every lead event leaves the page (owner standard, 4 Oct 2026):
 * a gtag `event` for GA4 plus a dataLayer push for GTM, same name/category/
 * label triple on both. If a Google Ads conversion is ever added, send it
 * here next to these two.
 */
function sendLeadEvent(name: string, label: string) {
  try {
    window.gtag?.("event", name, {
      event_category: "engagement",
      event_label: label,
    });

    window.dataLayer?.push({
      event: name,
      event_category: "engagement",
      event_label: label,
    });
  } catch {
    // Analytics must never break the click or the form.
  }
}
