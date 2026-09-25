import React from 'react';

const AREAS = [
  'San Pedro Town',
  'North Ambergris Caye (Truck Stop area)',
  'Boca del Rio',
  'San Pedro Airstrip (SPR) pickup',
  'Hotels & resorts island-wide',
  'Airbnb & vacation rentals',
];

export default function ServiceAreaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-2">Where We Deliver</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
              Based in San Pedro, Serving All of Ambergris Caye
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Scorpion Golf Cart Rental delivers island-wide, free of charge, to any hotel, resort, or Airbnb
              in San Pedro. We regularly welcome travelers from Belize, Canada, the USA, and around the world
              planning their Ambergris Caye trip.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-zinc-600">
                  <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-zinc-100" style={{ boxShadow: '0 16px 40px rgba(1,45,29,0.12)' }}>
            <iframe
              title="Scorpion Golf Cart Rental — San Pedro, Ambergris Caye, Belize"
              src="https://www.google.com/maps?q=17.9175,-87.9658&z=13&output=embed"
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
