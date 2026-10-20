import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function AboutPage({ onBookNow }) {
  return (
    <div className="pt-20 min-h-screen bg-surface">
      <Seo />
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-about.jpg"
            alt="Scorpion Golf Carts fleet in San Pedro, Belize"
            width="512"
            height="512"
            fetchPriority="high"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-container mx-auto px-6 sm:px-8 text-white text-center">
          <span className="text-primary-fixed font-semibold text-sm uppercase tracking-widest block mb-3">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Scorpion Golf Cart Rental<br />in San Pedro, Belize
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
            Explore San Pedro and Ambergris Caye with a golf cart that suits your group, your accommodation, and your travel plans.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-3">Our Story</span>
            <h2 className="font-serif text-3xl font-bold text-primary mb-5">Golf Cart Rentals for Your Island Stay</h2>
            <p className="text-zinc-500 leading-relaxed mb-4">
              Scorpion Golf Cart Rental serves visitors staying in San Pedro on Ambergris Caye, Belize. Our service helps you arrange a cart for your stay, whether you are traveling as a couple, with family, or with friends.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Choose from 4 and 6-seater options and tell us your arrival dates and accommodation. Our team will confirm availability and help coordinate delivery and pickup.{' '}
              <Link to="/cars" className="text-secondary font-semibold hover:underline">
                Explore our full fleet
              </Link>.
            </p>
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200"
            >
              Book Your Experience
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 16px 40px rgba(1,45,29,0.12)' }}>
            <img
              src="/images/story-about.jpg"
              alt="Scorpion Golf Carts — premium rental fleet in San Pedro, Belize"
              width="512"
              height="512"
              loading="lazy"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-container mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-2">What Drives Us</span>
            <h2 className="font-serif text-3xl font-bold text-primary">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'workspace_premium', title: 'Excellence', desc: 'We accept nothing less than the best — in our fleet, our service, and our results.' },
              { icon: 'eco', title: 'Responsibility', desc: 'We keep our fleet well-maintained and our practices responsible, without ever sacrificing performance.' },
              { icon: 'handshake', title: 'Integrity', desc: 'Honest pricing, transparent terms, and no surprises — ever.' },
              { icon: 'favorite', title: 'Passion', desc: 'We enjoy helping visitors make the most of their time in San Pedro.' },
            ].map(({ icon, title, desc }) => (
              <div key={icon} className="bg-white rounded-2xl p-7 border border-zinc-100 text-center"
                style={{ boxShadow: '0 4px 16px rgba(1,45,29,0.05)' }}>
                <div className="w-14 h-14 bg-primary-container/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-container mx-auto px-6 sm:px-8 text-center text-white">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8 leading-relaxed">
            Tell us your travel dates, group size, and where you are staying. We will help you arrange your San Pedro golf cart rental.
          </p>
          <button
            onClick={onBookNow}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-fixed transition-all duration-200 shadow-xl"
          >
            Book Now
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
