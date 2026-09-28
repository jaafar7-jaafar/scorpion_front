const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const ADS_ID = process.env.REACT_APP_GOOGLE_ADS_ID;

let initialized = false;

// Injects gtag.js and configures GA4 + (optionally) Google Ads.
// No-op if no measurement ID is configured, so this is always safe to call.
export function initAnalytics() {
  if (initialized || !GA_ID) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
  if (ADS_ID) gtag('config', ADS_ID);
}

// Generic GA4 event (shows up in GA4 reports regardless of Ads setup)
export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

// Fires a Google Ads conversion. `label` is the per-action conversion label
// from Google Ads (Conversions > the specific action > "Tag setup" snippet),
// e.g. REACT_APP_GADS_CONVERSION_LABEL_WHATSAPP=AbC-D1234efGH.
export function trackAdsConversion(label) {
  if (!ADS_ID || !label) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
  }
}
