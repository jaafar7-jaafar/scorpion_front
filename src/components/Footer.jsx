import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 mt-auto">
      <div className="max-w-container mx-auto px-6 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="text-lg font-bold text-primary font-serif">Scorpion Golf Cart Rental</div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Redefining leisure with premium golf cart rentals since 2012. Explore San Pedro in comfort and style.
          </p>
          <p className="text-xs text-zinc-400">
            Built by{' '}
            <a
              href="https://www.instagram.com/jaf_aurion"
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:underline transition-colors"
            >
              <span style={{ color: '#1a2a6c' }}>JAF</span>-AURION
            </a>
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold text-primary font-serif text-sm uppercase tracking-wider">Navigation</h4>
          <Link to="/" className="text-zinc-500 hover:text-primary transition-colors text-sm">Home</Link>
          <Link to="/cars" className="text-zinc-500 hover:text-primary transition-colors text-sm">Our Fleet</Link>
          <Link to="/about" className="text-zinc-500 hover:text-primary transition-colors text-sm">About Us</Link>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="font-bold text-primary font-serif text-sm uppercase tracking-wider">Contact</h4>
          <a
            href="https://wa.me/5016007672?text=Hi%20I%20am%20interested%20in%20renting%20a%20golf%20car"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Us
          </a>
          <p className="text-zinc-400 text-xs">Available daily 8am – 10pm</p>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Scorpion Golf Cart Rental. All rights reserved.
      </div>
    </footer>
  );
}
