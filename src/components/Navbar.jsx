import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { CallLink, WhatsAppLink } from './ContactButtons';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Carts & Rates', to: '/cars' },
  { label: 'Rental Guide', to: '/san-pedro-golf-cart-rental-guide' },
  { label: 'Things to Do', to: '/things-to-do-in-san-pedro-by-golf-cart' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ onBookNow }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(1,45,29,0.08)]' : 'bg-white/70 backdrop-blur-md'}`}>
      <nav aria-label="Main" className="container-page flex h-16 md:h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 min-w-0 select-none" aria-label="Scorpion Golf Cart Rental home">
          <img src="/scorpionlogo.png" alt="" width="40" height="40" className="h-10 w-10 object-contain shrink-0" />
          <span className="leading-none">
            <span className="block font-serif text-[17px] font-bold text-primary">Scorpion</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Golf Cart Rental</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={isActive(l.to) ? 'page' : undefined}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${isActive(l.to) ? 'bg-primary-fixed/60 text-primary' : 'text-zinc-600 hover:text-primary hover:bg-zinc-100'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CallLink location="navbar" className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 font-bold text-primary hover:text-secondary" />
          <button onClick={onBookNow} className="btn-primary !px-4 !py-2.5 text-sm md:!px-5">
            Book Now
          </button>
          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl text-primary hover:bg-zinc-100"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined text-[28px]">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden h-[calc(100dvh-4rem)] md:h-[calc(100dvh-72px)] overflow-y-auto bg-white border-t border-zinc-100">
          <div className="container-page py-4 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-zinc-100 py-4 font-serif text-2xl font-bold ${isActive(l.to) ? 'text-secondary' : 'text-primary'}`}
              >
                {l.label}
                <span aria-hidden="true" className="material-symbols-outlined text-[24px] text-zinc-300">chevron_right</span>
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-6">
              <CallLink location="mobile_menu" className="btn-outline">Call</CallLink>
              <WhatsAppLink location="mobile_menu">WhatsApp</WhatsAppLink>
            </div>
            <p className="pt-5 text-center text-sm text-zinc-500">Open daily 8am–10pm · San Pedro, Belize</p>
            <div className="flex justify-center pt-5 pb-10">
              <SocialLinks className="gap-4" size="lg" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
