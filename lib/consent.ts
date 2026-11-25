/**
 * Cookie/storage consent stored in localStorage. This key is the ONLY thing the
 * site writes to browser storage. Optional categories are off by default.
 *
 * To add an analytics or marketing script in the future, load it only after
 * `readConsent()?.analytics === true` (or `.marketing`) and listen for the
 * CONSENT_EVENT to react to changes. No optional scripts exist today.
 */
export const CONSENT_KEY = "cdh-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "cdh:consent-change";
export const OPEN_SETTINGS_EVENT = "cdh:open-cookie-settings";

export type ConsentState = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO date of the choice. */
  updatedAt: string;
};

export function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      updatedAt: String(parsed.updatedAt ?? ""),
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
