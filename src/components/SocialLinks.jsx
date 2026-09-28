import React from 'react';
import { trackEvent } from '../utils/analytics';

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/scorpiongolfcarts',
    Icon: InstagramIcon,
    background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
  },
  {
    name: 'TikTok',
    href: 'https://vt.tiktok.com/ZSbr3pfYX/',
    Icon: TikTokIcon,
    background: '#000000',
  },
];

export default function SocialLinks({ className = '', size = 'md' }) {
  const boxSize = size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-[18px] h-[18px]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ name, href, Icon, background }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Follow us on ${name}`}
          onClick={() => trackEvent('social_click', { network: name.toLowerCase() })}
          className={`${boxSize} rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 shadow-sm`}
          style={{ background }}
        >
          <Icon className={iconSize} />
        </a>
      ))}
    </div>
  );
}
