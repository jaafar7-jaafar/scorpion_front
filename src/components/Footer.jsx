import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { CallLink, WhatsAppLink } from './ContactButtons';

const COLUMNS = [
  { title: 'Rentals', links: [['/cars', 'Golf carts & rates'], ['/contact', 'Delivery & booking'], ['/about', 'About Scorpion']] },
  { title: 'Plan your trip', links: [['/san-pedro-golf-cart-rental-guide', 'San Pedro rental guide'], ['/things-to-do-in-san-pedro-by-golf-cart', 'Things to do by golf cart'], ['/', 'Golf cart rental San Pedro']] },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white/75 pb-28 md:pb-0">
      {/* Island wave rolling into the footer. */}
      <svg aria-hidden="true" className="absolute bottom-full left-0 block h-8 w-full text-primary md:h-14" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 38c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v22H0z" />
      </svg>
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="col-span-2 space-y-4 lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/scorpionlogo.png" alt="" width="44" height="44" loading="lazy" className="h-11 w-11 rounded-full bg-white object-contain p-0.5" />
            <span className="font-serif text-xl font-bold text-white">Scorpion Golf Cart Rental</span>
          </Link>
          <p className="max-w-sm leading-relaxed">4 and 6-seater golf cart rentals in San Pedro, Ambergris Caye, Belize, delivered free to your hotel, resort, or Airbnb.</p>
          <SocialLinks />
        </div>

        {COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-sun">{title}</p>
            <ul className="space-y-3">
              {links.map(([to, label]) => <li key={label}><Link to={to} className="hover:text-white hover:underline underline-offset-4">{label}</Link></li>)}
            </ul>
          </div>
        ))}

        <div className="col-span-2 lg:col-span-1">
          <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-sun">Contact</p>
          <address className="not-italic space-y-3">
            <p className="font-semibold text-white">Scorpion Golf Cart Rental</p>
            <p>San Pedro, Ambergris Caye, Belize</p>
            <p>Open 24 hours, every day</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <WhatsAppLink location="footer" className="btn-whatsapp !px-4 !py-2.5 text-sm">WhatsApp</WhatsAppLink>
              <CallLink location="footer" className="btn-ghost-light !px-4 !py-2.5 text-sm" />
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Scorpion Golf Cart Rental. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/rental-terms" className="hover:text-white hover:underline underline-offset-4">Rental terms</Link>
            <Link to="/privacy" className="hover:text-white hover:underline underline-offset-4">Privacy</Link>
          </nav>
          <p>
            Built by{' '}
            <a href="https://www.instagram.com/jaf_aurion" target="_blank" rel="noreferrer" className="font-semibold text-white/90 hover:underline">JAF-AURION</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
