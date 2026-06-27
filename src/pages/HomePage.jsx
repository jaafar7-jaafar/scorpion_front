import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getCars, getReviews } from '../api';
import { MOCK_CARS, MOCK_REVIEWS } from '../utils/mockData';
import { resolveImageUrl } from '../utils/imageUrl';
import CarCard from '../components/CarCard';
import ReviewsSection from '../components/ReviewsSection';

const PARTNERS = [
  {
    name: 'Tropic Air',
    url: 'https://www.tropicair.com',
    img: 'uploads/partners/tropicair.jpg',
  },
  {
    name: 'Maya Island Air',
    url: 'https://mayaaislandair.com',
    img: 'uploads/partners/mayaislandair.jpg',
  },
  {
    name: 'Sprinter',
    url: 'https://sprinter.bz',
    img: 'uploads/partners/sprinter.jpg',
  },
  {
    name: 'Belize Water Taxi',
    url: 'https://belizewatertaxi.com',
    img: 'uploads/partners/belizewatertaxi.jpg',
  },
];

const FAQS = [
  {
    q: "Do I need a driver's license to rent a golf cart in San Pedro, Belize?",
    a: "Yes, a valid driver's license is required to rent and operate a golf cart in San Pedro to comply with local regulations and ensure safety.",
  },
  {
    q: 'Is free hotel or Airbnb delivery included with my golf cart rental?',
    a: 'Yes. Every Scorpion Golf Cart rental includes free delivery and pickup anywhere in San Pedro, including hotels, resorts, and Airbnb accommodations.',
  },
  {
    q: 'How does the online booking process work?',
    a: 'Simply submit your booking request through our website. We will confirm availability and contact you via WhatsApp or email to finalize your reservation.',
  },
  {
    q: 'What happens if my travel plans change or I need to cancel?',
    a: 'We offer free cancellation up to 24 hours before your rental begins. Just reach out to our team and we\'ll take care of the rest.',
  },
  {
    q: 'Are the golf carts safe and well maintained?',
    a: 'Absolutely. All our golf carts are regularly serviced, cleaned, and inspected to ensure a reliable and comfortable experience while exploring San Pedro.',
  },
  {
    q: 'How can I contact Scorpion Golf Cart Rental during my rental?',
    a: 'Our local team is available 24/7 via WhatsApp, phone, or email to assist you before, during, and after your rental.',
  },
];

export default function HomePage({ onBookNow }) {
  const [cars, setCars] = useState([]);
  const [avgRating, setAvgRating] = useState('4.9');
  const [reviewCount, setReviewCount] = useState(200);
  const [faqOpen, setFaqOpen] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    getCars()
      .then((r) => setCars(r.data.slice(0, 3)))
      .catch(() => setCars(MOCK_CARS.slice(0, 3)));

    getReviews()
      .then((r) => {
        const data = r.data;
        if (data.length) {
          const avg = (data.reduce((s, rv) => s + rv.rating, 0) / data.length).toFixed(1);
          setAvgRating(avg);
          setReviewCount(data.length);
        }
      })
      .catch(() => {
        const avg = (MOCK_REVIEWS.reduce((s, rv) => s + rv.rating, 0) / MOCK_REVIEWS.length).toFixed(1);
        setAvgRating(avg);
        setReviewCount(MOCK_REVIEWS.length);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS0aUXluexP4zCSD634ns6tn8hrur8oepJovvnDUYRcThcPiPr4GimlIp7mXPyGYAGppfSo93uafAhvF7KWZPWzvXXum5iSQva7OZW9WZX5nWASNeof3o0s-V3Cs5iEzeCqiU224txpn-36Fbds707aIbblhld-5iptjUDY5QwZacwpEIZYC4FSDx6PLRrqVQZ9Vn6QSe_LVKo4qP5RPkIv_s0WJJkBqqixm4Nwa3R6oIObRe_M3DXTEAgZ8HGXo3-hhbb2LoNPxHm"
            alt="Luxury golf car on fairway"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.82)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/65 via-primary/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-container mx-auto px-6 sm:px-8 w-full py-20">
          <div className="max-w-2xl text-white">
            {/* Rating badge */}
            <div className="flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-[#c1ecd4]"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>
                    {s <= 4 ? 'star' : 'star_half'}
                  </span>
                ))}
              </div>
              <span className="font-semibold text-sm">{avgRating}/5 from {reviewCount}+ reviews</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Experience the <br />Course in{' '}
              <em className="font-normal not-italic" style={{ fontStyle: 'italic' }}>Style</em>
            </h1>
            <p className="text-lg text-white/85 mb-10 max-w-lg leading-relaxed">
              Elevate your game with the ultimate luxury leisure fleet. Precision engineering meets sophisticated design for the modern golfer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookNow}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-secondary transition-all duration-200 shadow-xl shadow-black/20 hover:-translate-y-0.5 active:scale-95"
              >
                Book Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <Link
                to="/cars"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 active:scale-95"
              >
                View Our Fleet
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="material-symbols-outlined animate-bounce">keyboard_arrow_down</span>
        </div>
      </section>

      {/* ── Feature Bento Grid ────────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large card */}
            <div className="md:col-span-7 bg-white p-6 md:p-10 rounded-2xl border border-zinc-100 flex flex-col justify-between group overflow-hidden relative"
              style={{ boxShadow: '0 4px 16px rgba(1,45,29,0.06)' }}>
              <div className="relative z-10">
                <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-3">Premium Performance</span>
                <h2 className="font-serif text-3xl font-bold text-primary mb-4">Quiet. Powerful. Efficient.</h2>
                <p className="text-zinc-500 max-w-md leading-relaxed">
                  Our all-electric fleet features the latest lithium-ion technology, ensuring whisper-quiet operation and extended range across even the most challenging terrains.
                </p>
              </div>
              <div className="absolute bottom-[-10%] right-[-5%] w-1/2 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '240px' }}>electric_rickshaw</span>
              </div>
            </div>

            {/* Dark card */}
            <div className="md:col-span-5 bg-primary-container p-6 md:p-10 rounded-2xl flex flex-col justify-center">
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary mb-3">Fleet Standards</h3>
              <p className="text-primary/70 leading-relaxed">
                Every cart undergoes a rigorous 48-point inspection before it joins our elite rental inventory.
              </p>
            </div>

            {/* Three feature cards */}
            {[
              { icon: 'chair', title: 'Plush Interiors', desc: 'Marine-grade leather seating for four.' },
              { icon: 'air', title: 'Climate Control', desc: 'Integrated fan systems for warm days.' },
              { icon: 'map', title: 'Smart GPS', desc: 'Integrated course navigation for all 18 holes.' },
            ].map(({ icon, title, desc }) => (
              <div key={icon} className="md:col-span-4 bg-white p-5 md:p-8 rounded-2xl border border-zinc-100 text-center"
                style={{ boxShadow: '0 4px 16px rgba(1,45,29,0.06)' }}>
                <span className="material-symbols-outlined text-primary block mb-4" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 0" }}>{icon}</span>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{title}</h3>
                <p className="text-zinc-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet Preview ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-2">Our Fleet</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Featured Carts</h2>
            <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed">
              Discover our curated selection of high-performance electric golf cars designed for the perfect round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} onBookNow={onBookNow} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              View Full Fleet
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="max-w-container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center text-white">
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '12+', label: 'Years Experience' },
              { value: '24', label: 'Premium Carts' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary-fixed mb-1">{value}</div>
                <div className="text-white/70 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Supported Locations / Partner Slider ─────────────────────────── */}
      <section className="py-14 bg-surface">
        <div className="max-w-container mx-auto px-6 sm:px-8 text-center mb-8">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-2">Supported Locations</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Our Trusted Partners</h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
            Conveniently located near Belize's top travel hubs.
          </p>
        </div>

        {/* marquee-viewport clips overflow and acts as hover target */}
        <div className="marquee-viewport relative w-full overflow-hidden">
          {/* Soft fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 z-10 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 z-10 bg-gradient-to-l from-surface to-transparent" />

          {/*
            Two identical sets placed side by side.
            Each set animates translateX(-100%) — its own full width.
            When set A exits left, set B has scrolled into view seamlessly.
            The reset back to 0 happens off-screen → no visible jump.
          */}
          <div className="flex py-3">
            {[false, true].map((isClone) => (
              <div key={isClone ? 'b' : 'a'} className="marquee-set" aria-hidden={isClone || undefined}>
                {PARTNERS.map(({ name, url, img }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="marquee-card rounded-2xl overflow-hidden border border-zinc-100 bg-white hover:border-secondary/40 hover:shadow-xl transition-all duration-300 group"
                    style={{ boxShadow: '0 2px 12px rgba(1,45,29,0.06)' }}
                  >
                    <div className="w-full overflow-hidden bg-zinc-100" style={{ height: '148px' }}>
                      <img
                        src={resolveImageUrl(img)}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 bg-white">
                      <span className="text-xs font-semibold text-primary truncate">{name}</span>
                      <span
                        className="material-symbols-outlined text-zinc-300 group-hover:text-secondary transition-colors shrink-0"
                        style={{ fontSize: '15px' }}
                      >open_in_new</span>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 sm:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-2">FAQ</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight">
                Frequently Asked<br className="hidden sm:block" /> Questions
              </h2>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm md:text-right">
              Everything you need to know before renting. Can't find an answer?{' '}
              <button onClick={onBookNow} className="text-secondary font-semibold hover:underline">
                Contact us directly.
              </button>
            </p>
          </div>

          {/* Accordion grid — 1 col mobile, 2 col desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FAQS.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-secondary/30 bg-primary-container/30'
                      : 'border-zinc-100 bg-zinc-50/60 hover:border-zinc-200 hover:bg-zinc-50'
                  }`}
                  style={{ boxShadow: isOpen ? '0 4px 20px rgba(1,45,29,0.08)' : 'none' }}
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-semibold text-sm leading-relaxed transition-colors ${
                      isOpen ? 'text-primary' : 'text-zinc-700'
                    }`}>
                      {item.q}
                    </span>
                    <span
                      className={`material-symbols-outlined shrink-0 mt-0.5 transition-all duration-300 ${
                        isOpen ? 'text-secondary rotate-45' : 'text-zinc-400'
                      }`}
                      style={{ fontSize: '20px' }}
                    >
                      add
                    </span>
                  </button>

                  {/* Smooth height animation */}
                  <div
                    ref={(el) => (answerRefs.current[i] = el)}
                    style={{
                      maxHeight: isOpen
                        ? `${answerRefs.current[i]?.scrollHeight ?? 200}px`
                        : '0px',
                      transition: 'max-height 0.3s ease',
                      overflow: 'hidden',
                    }}
                  >
                    <p className="px-6 pb-5 text-sm text-zinc-500 leading-relaxed border-t border-zinc-100/80 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <ReviewsSection />
    </div>
  );
}
