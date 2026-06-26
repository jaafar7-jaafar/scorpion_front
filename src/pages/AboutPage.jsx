import React from 'react';

export default function AboutPage({ onBookNow }) {
  return (
    <div className="pt-20 min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs6KvsXyjmnBFAkotAaHq7fhX4gHR9XljkROvR35xIq67sQcdoVrcwqzUXj8m2E0T-jo79CIxb-BecWTiAqN8vSAAbXp8r9lRB_A4X65L87PO3nCIMhTXwt74XI1FUTvaLlNx1efKjOZO_dvV0EJd9K_cphoDwe9YaiAyLA44UKyxn-i4HujJ-SPd7uli2JOo_2ygD8wXx4uDw3kTrBwrkHDqG71yvDYyvpd_oVFQhZSvejML7Op7c4u4VA1BhDsMcyQv_rqNcq0Ef"
            alt="Golf course"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-container mx-auto px-6 sm:px-8 text-white text-center">
          <span className="text-primary-fixed font-semibold text-sm uppercase tracking-widest block mb-3">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Driven by Passion, <br />Defined by Quality
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed">
            Since 2012, Scorpion Golf Cart Rental has been setting the standard for luxury golf car rentals — where every ride feels like a first-class experience.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest block mb-3">Our Story</span>
            <h2 className="font-serif text-3xl font-bold text-primary mb-5">A Legacy Built on the Greens</h2>
            <p className="text-zinc-500 leading-relaxed mb-4">
              Scorpion Golf Cart Rental was founded by a group of passionate golfers who believed the on-course experience deserved the same level of refinement as the game itself. What started as a small fleet of two cars has grown into a premium rental operation trusted by clubs, resorts, and private clients across the region.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Every car in our fleet is hand-selected, maintained to exacting standards, and delivered with white-glove service. We don't just rent golf cars — we craft experiences.
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVadqyOncZj1Qi5JR5kYgob-KOEi_2otJ4ILIHVCo9soB95B06lsMgwWlWhmpbCPd0DweeOibioIwKON5KnZC7f7upCzz2D8ucW52khP7fzMRZZlWPDKRlv5pjIhJ5msnqq9T5ZFgHF8VWyw5zPZoVRJc_13ZxdidkjbNAw-P6yBsS-IT6toKnX2KcqiLP3eQpmg4onQt8GbAaK5F8xaWLwqk20UBPPo4g4uk9v8AzhOi12suPNnnM7OeWw50O0knp9qKpfFMyCf6"
              alt="Luxury golf car"
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
              { icon: 'eco', title: 'Sustainability', desc: 'Our all-electric fleet reduces carbon emissions without sacrificing performance.' },
              { icon: 'handshake', title: 'Integrity', desc: 'Honest pricing, transparent terms, and no surprises — ever.' },
              { icon: 'favorite', title: 'Passion', desc: 'We love the game as much as you do. That passion shows in everything we do.' },
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
            Join hundreds of satisfied clients who have elevated their on-course experience with Scorpion Golf Cart Rental.
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
