import { GOOGLE_PROFILE_SHORT_URL, GOOGLE_REVIEW_URL } from '../seo/site';
import { trackEvent } from '../utils/analytics';

// Google "G" mark in brand colors (decorative).
export function GoogleG({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} shrink-0 rounded-full bg-white p-0.5`}>
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2.1-1.9 3.2-4.8 3.2-8.2Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.7H2v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.7 13.9a6.6 6.6 0 0 1 0-4.2V6.8H2a11 11 0 0 0 0 9.9l3.7-2.8Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2 6.8l3.7 2.9C6.6 7.4 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

// "Review us on Google" — one tracked link used across the site.
export function ReviewLink({ location, className = 'btn-primary', children = 'Review us on Google', icon = true }) {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('google_review_click', { location })}
      className={className}
    >
      {icon && <GoogleG />}
      {children}
    </a>
  );
}

// Opens the Google Business Profile in Google Maps.
export function ProfileLink({ location, className = 'btn-outline', children = 'Find us on Google Maps' }) {
  return (
    <a
      href={GOOGLE_PROFILE_SHORT_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('google_profile_click', { location })}
      className={className}
    >
      <span aria-hidden="true" className="material-symbols-outlined icon-fill text-[20px]">location_on</span>
      {children}
    </a>
  );
}
