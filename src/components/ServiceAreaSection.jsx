import React from 'react';
import IslandMap from './IslandMap';

const AREAS = [
  'San Pedro Town',
  'North Ambergris Caye (Truck Stop area)',
  'Boca del Rio',
  'San Pedro Airstrip (SPR) pickup',
  'Hotels & resorts island-wide',
  'Airbnb & vacation rentals',
];

function Intro() {
  return (
    <>
      <p className="eyebrow mb-3">Where we deliver</p>
      <h2 className="section-title">Based in San Pedro, serving all of Ambergris Caye</h2>
      <p className="section-lead mt-4">
        Scorpion Golf Cart Rental delivers island-wide, free of charge, to any hotel, resort, or Airbnb
        in San Pedro. We regularly welcome travelers from Belize, Canada, the USA, and around the world
        planning their Ambergris Caye trip.
      </p>
      <ul className="mt-7 flex flex-wrap gap-2">
        {AREAS.map((area) => (
          <li key={area} className="chip">
            <span aria-hidden="true" className="material-symbols-outlined icon-fill text-[18px] text-secondary">location_on</span>
            {area}
          </li>
        ))}
      </ul>
    </>
  );
}

// `illustrated` shows the interactive island map (no third-party iframe: faster);
// otherwise an embedded Google Map, used on the contact page.
export default function ServiceAreaSection({ illustrated = false, onBookNow }) {
  if (illustrated) {
    return (
      <section className="section bg-sand">
        <div className="container-page">
          <div className="reveal max-w-3xl"><Intro /></div>
          <p className="mt-10 mb-5 font-serif text-xl font-bold text-primary md:text-2xl">Tap a stop and take a test drive around the island</p>
          <IslandMap onBookNow={onBookNow} />
        </div>
      </section>
    );
  }
  return (
    <section className="section bg-sand">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div><Intro /></div>
        <div className="reveal overflow-hidden rounded-[2rem] border-4 border-white bg-sand-deep shadow-[0_30px_60px_-25px_rgba(1,45,29,0.35)]">
          <iframe
            title="San Pedro service area, Ambergris Caye, Belize"
            src="https://www.google.com/maps?q=San+Pedro+Ambergris+Caye+Belize&z=13&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
