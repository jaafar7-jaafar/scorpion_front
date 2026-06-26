import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Carts', to: '/cars' },
  { label: 'About', to: '/about' },
];

export default function Navbar({ onBookNow }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-nav' : 'bg-white/95 backdrop-blur-sm'
      } border-b border-zinc-100`}
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-serif text-primary select-none">
          Scorpion Golf Cart Rental
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = location.pathname === l.to || (l.to !== '/' && location.pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`font-sans font-medium transition-colors duration-200 ${
                  active
                    ? 'text-primary border-b-2 border-primary pb-0.5 font-semibold'
                    : 'text-zinc-500 hover:text-primary'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBookNow}
            className="bg-primary text-white px-5 py-2 rounded-lg font-sans font-semibold text-sm tracking-wide hover:bg-secondary transition-all duration-200 shadow-md shadow-primary/20 hover:-translate-y-0.5 active:scale-95"
          >
            Book Now
          </button>
          <button
            className="md:hidden text-primary p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`font-sans py-2 border-b border-zinc-100 last:border-0 ${
                  active ? 'text-primary font-semibold' : 'text-zinc-500'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
