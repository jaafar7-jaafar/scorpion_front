import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

const FACTS = [
  ['Business', 'Scorpion Golf Cart Rental (Scorpion Golf Carts)'],
  ['Service', 'Golf cart rental for visitors to San Pedro and Ambergris Caye'],
  ['Location', 'San Pedro, Ambergris Caye, Belize'],
  ['Carts', '4-seater and 6-seater golf carts'],
  ['Delivery', 'Free delivery and pickup at hotels, resorts, and Airbnbs in San Pedro'],
  ['Hours', 'Open 24 hours, every day'],
  ['Phone & WhatsApp', '+501 600-7672'],
];

const VALUES = [
  { icon: 'workspace_premium', title: 'Excellence', desc: 'We accept nothing less than the best, in our fleet, our service, and our results.' },
  { icon: 'eco', title: 'Responsibility', desc: 'We keep our fleet well-maintained and our practices responsible, without sacrificing performance.' },
  { icon: 'handshake', title: 'Integrity', desc: 'Honest pricing, transparent terms, and no surprises.' },
  { icon: 'favorite', title: 'Passion', desc: 'We enjoy helping visitors make the most of their time in San Pedro.' },
];

export default function AboutPage({ onBookNow }) {
  return (
    <>
      <Seo />
      <PageHero
        crumb="About"
        eyebrow="About us"
        title="Scorpion Golf Cart Rental in San Pedro, Belize"
        lead="Explore San Pedro and Ambergris Caye with a golf cart that suits your group, your accommodation, and your travel plans."
      />

      <section className="section bg-white">
        <div className="container-page grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="eyebrow mb-3">Our story</p>
            <h2 className="section-title">Golf cart rentals for your island stay</h2>
            <p className="section-lead mt-5">
              Scorpion Golf Cart Rental serves visitors staying in San Pedro on Ambergris Caye, Belize. Our service helps you arrange a cart for your stay, whether you are traveling as a couple, with family, or with friends.
            </p>
            <p className="section-lead mt-4">
              Choose from 4 and 6-seater options and tell us your arrival dates and accommodation. Our team will confirm availability and help coordinate delivery and pickup.{' '}
              <Link to="/cars" className="link">Explore our full fleet</Link>.
            </p>
            <button onClick={onBookNow} className="btn-primary mt-8">
              Book Now
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-sand-deep shadow-[0_30px_60px_-25px_rgba(1,45,29,0.35)]">
            <img
              src="/images/story-about.jpg"
              alt="Four-seater golf cart available for rent"
              width="512"
              height="512"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="facts-heading" className="section bg-sand">
        <div className="container-page max-w-4xl">
          <p className="eyebrow mb-3">At a glance</p>
          <h2 id="facts-heading" className="section-title">Scorpion at a glance</h2>
          <dl className="card mt-8 grid grid-cols-1 gap-x-6 gap-y-2 p-6 text-[15px] sm:grid-cols-[11rem_1fr] md:p-8">
            {FACTS.map(([term, detail]) => (
              <div key={term} className="contents">
                <dt className="font-bold text-primary">{term}</dt>
                <dd className="mb-3 text-zinc-700 sm:mb-1">{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="section-lead mt-6">Planning your trip? Read our <Link to="/san-pedro-golf-cart-rental-guide" className="link">San Pedro golf cart rental guide</Link> or see <Link to="/things-to-do-in-san-pedro-by-golf-cart" className="link">things to do in San Pedro by golf cart</Link>.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <p className="eyebrow mb-3">What drives us</p>
          <h2 className="section-title">Our core values</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="reveal card p-7">
                <span aria-hidden="true" className="material-symbols-outlined text-[24px] icon-fill flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed/60 text-primary">{icon}</span>
                <h3 className="mt-5 font-serif text-xl font-bold text-primary">{title}</h3>
                <p className="mt-2 leading-relaxed text-zinc-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand onBookNow={onBookNow} location="about_cta" title="Ready to experience the difference?" text="Tell us your travel dates, group size, and where you are staying. We will help you arrange your San Pedro golf cart rental." />
    </>
  );
}
