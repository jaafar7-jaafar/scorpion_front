import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../api';
import CarCard from '../components/CarCard';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import CrewQuiz from '../components/CrewQuiz';
import { WhatsAppLink } from '../components/ContactButtons';
import { FLEET_FAQS } from '../seo/faqs';
import { WHATSAPP_URL } from '../seo/site';

const SIZES = [
  { seats: '4-seater golf cart', rate: 'From $35/day', bestFor: 'Couples, small families, and groups of up to four' },
  { seats: '6-seater golf cart', rate: 'From $65/day', bestFor: 'Larger families and groups who want to ride together' },
];

const INCLUDED = [
  'Free delivery and pickup at your hotel, resort, or Airbnb in San Pedro',
  'Pickup at the San Pedro airstrip (SPR) by arrangement',
  'Free cancellation up to 24 hours before your rental starts',
  'Cash and major credit and debit cards accepted',
  'Local support by phone and WhatsApp, daily 8am to 10pm',
];

export default function CarsPage({ onBookNow }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getCars()
      .then((r) => setCars(r.data))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  // Filter buttons come from the unique seat values assigned to cars
  const filterOptions = ['All', ...Array.from(new Set(cars.map((c) => c.seat).filter(Boolean))).sort()];
  // Reset to 'All' if the previously selected filter no longer exists
  const activeFilter = filterOptions.includes(filter) ? filter : 'All';

  const filtered = cars.filter((car) => {
    const q = search.toLowerCase();
    const matchesSearch = !search || car.name.toLowerCase().includes(q) || car.description.toLowerCase().includes(q);
    return matchesSearch && (activeFilter === 'All' || car.seat === activeFilter);
  });

  return (
    <>
      <Seo />
      <PageHero
        crumb="Golf Cart Rentals"
        eyebrow="Our fleet"
        title="Golf Cart Rentals in San Pedro"
        lead="Find a golf cart for your stay on Ambergris Caye. Compare seating for your group, then request availability and a quote for your travel dates, with delivery to your hotel, resort, or Airbnb."
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip">4-seater <strong className="text-secondary">from $35/day</strong></span>
          <span className="chip">6-seater <strong className="text-secondary">from $65/day</strong></span>
          <span className="chip">Free delivery in San Pedro</span>
        </div>
      </PageHero>

      <section className="container-page py-10 md:py-14">
        {/* Filters: horizontal pills on phones, search beside them on larger screens */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0 [scrollbar-width:none]" role="group" aria-label="Filter by seats">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                aria-pressed={activeFilter === opt}
                className={`shrink-0 rounded-full px-3 sm:px-5 py-2.5 text-sm font-bold transition-all ${activeFilter === opt ? 'bg-primary text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <span aria-hidden="true" className="material-symbols-outlined text-[24px] absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
            <input
              type="text"
              aria-label="Search golf carts"
              placeholder="Search cart models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-zinc-200" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-3/4 rounded bg-zinc-200" />
                  <div className="h-4 w-full rounded bg-zinc-100" />
                  <div className="mt-4 h-11 rounded-xl bg-zinc-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[1.75rem] bg-sand px-6 py-14 text-center">
            <span aria-hidden="true" className="material-symbols-outlined mb-3 block text-5xl text-zinc-400">search_off</span>
            <h2 className="font-serif text-2xl font-bold text-primary">{loadError ? 'Contact us for current availability' : 'No carts found'}</h2>
            <p className="mt-2 text-zinc-600">{loadError ? 'Call or WhatsApp +501 600-7672 for current fleet availability and rental rates.' : 'Try adjusting your search or filter.'}</p>
            {loadError
              ? <a href={WHATSAPP_URL} className="btn-whatsapp mt-6">Ask about available carts</a>
              : <button onClick={() => { setSearch(''); setFilter('All'); }} className="btn-outline mt-6">Clear filters</button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => <CarCard key={car.id} car={car} onBookNow={onBookNow} />)}
          </div>
        )}
      </section>

      <section aria-labelledby="quiz-heading" className="container-page pb-16 md:pb-24">
        <h2 id="quiz-heading" className="sr-only">Find the right golf cart for your group</h2>
        <CrewQuiz onBookNow={onBookNow} />
      </section>

      <section aria-labelledby="sizes-heading" className="section bg-sand">
        <div className="container-page">
          <p className="eyebrow mb-3">Compare</p>
          <h2 id="sizes-heading" className="section-title max-w-3xl">4-seater or 6-seater: which golf cart should you rent?</h2>
          <p className="section-lead mt-4 max-w-3xl">Pick the cart by how many people will ride together. Both sizes are delivered to your accommodation in San Pedro, and our team confirms availability and your total quote before your rental is booked.</p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm md:text-base">
              <caption className="sr-only">Golf cart sizes and starting rates</caption>
              <thead className="bg-primary text-white"><tr><th scope="col" className="px-3 sm:px-5 py-3">Cart</th><th scope="col" className="px-3 sm:px-5 py-3">Starting rate</th><th scope="col" className="px-3 sm:px-5 py-3">Best for</th></tr></thead>
              <tbody>{SIZES.map(({ seats, rate, bestFor }) => (<tr key={seats} className="border-t border-zinc-100"><th scope="row" className="px-3 sm:px-5 py-4 font-semibold text-primary">{seats}</th><td className="px-3 sm:px-5 py-4 text-zinc-700">{rate}</td><td className="px-3 sm:px-5 py-4 text-zinc-600">{bestFor}</td></tr>))}</tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-600">Starting rates are per day. Ask for the full total for your dates, including currency, taxes, fuel, and any deposit.</p>
        </div>
      </section>

      <section aria-labelledby="included-heading" className="section bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Included</p>
            <h2 id="included-heading" className="section-title">What comes with every Scorpion rental</h2>
            <p className="section-lead mt-4">New to the island? Read our <Link to="/san-pedro-golf-cart-rental-guide" className="link">San Pedro golf cart rental guide</Link> and our list of <Link to="/things-to-do-in-san-pedro-by-golf-cart" className="link">things to do in San Pedro by golf cart</Link>.</p>
            <WhatsAppLink location="cars_included" className="btn-whatsapp mt-7">Ask us on WhatsApp</WhatsAppLink>
          </div>
          <ul className="grid gap-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-sand/70 p-4 text-zinc-700">
                <span aria-hidden="true" className="material-symbols-outlined text-[24px] icon-fill text-secondary">check_circle</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container-page max-w-4xl">
          <FaqList faqs={FLEET_FAQS} title="Golf cart rental questions" id="fleet-faq" />
        </div>
      </section>

      <CtaBand onBookNow={onBookNow} location="cars_cta" />
    </>
  );
}
