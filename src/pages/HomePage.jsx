import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../api';
import { resolveImageUrl } from '../utils/imageUrl';
import CarCard from '../components/CarCard';
import ReviewsSection from '../components/ReviewsSection';
import ServiceAreaSection from '../components/ServiceAreaSection';
import Seo from '../components/Seo';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import { WhatsAppLink } from '../components/ContactButtons';
import { HOME_FAQS } from '../seo/faqs';
import { DeliveryIcon, GolfCartIcon, GolfCartLongIcon, PalmIcon } from '../components/BrandIcons';

const PARTNERS = [
  { name: 'Tropic Air', url: 'https://www.tropicair.com', img: 'uploads/partners/tropicair.jpg', icon: 'flight' },
  { name: 'Maya Island Air', url: 'https://mayaislandair.com', img: 'uploads/partners/mayaislandair.jpg', icon: 'flight' },
  { name: 'Sprinter', url: 'https://sprinter.bz', img: 'uploads/partners/sprinter.jpg', icon: 'luggage' },
  { name: 'Belize Water Taxi', url: 'https://belizewatertaxi.com', img: 'uploads/partners/belizewatertaxi.jpg', icon: 'directions_boat' },
];

const TRUST = [
  { icon: <DeliveryIcon />, title: 'Free delivery', text: 'To your hotel, resort, or Airbnb in San Pedro' },
  { icon: <GolfCartIcon />, title: '4 & 6 seats', text: 'A cart sized for couples, families, and groups' },
  { icon: 'event_available', title: 'Free cancellation', text: 'Up to 24 hours before your rental starts' },
  { icon: 'support_agent', title: 'Local team', text: 'Phone and WhatsApp, daily 8am–10pm' },
];

const RATES = [
  { seats: '4-Seater', price: '$35', bestFor: 'Couples, small families, and groups of up to four', Icon: GolfCartIcon },
  { seats: '6-Seater', price: '$65', bestFor: 'Larger families and groups who want to ride together', featured: true, Icon: GolfCartLongIcon },
];

const DESTINATIONS = ['San Pedro Town', 'Secret Beach', 'Boca del Rio', 'North Ambergris Caye', 'San Pedro Airstrip', 'Hotels & resorts', 'Airbnb delivery', 'South Ambergris Caye'];

const RATE_INCLUDES = ['Free delivery & pickup in San Pedro', 'Free cancellation up to 24h before', 'Local support by phone & WhatsApp'];

const STEPS = [
  { title: 'Send your dates', text: 'Request online or on WhatsApp with your dates, group size, and where you are staying.' },
  { title: 'We confirm', text: 'Our team checks availability and confirms your cart, quote, and delivery time.' },
  { title: 'Start exploring', text: 'Your golf cart is delivered to your accommodation. We pick it up when you are done.' },
];

const GUIDES = [
  { to: '/san-pedro-golf-cart-rental-guide', tag: 'Rental guide', title: 'How to rent a golf cart in San Pedro', text: 'Choosing seating, comparing quotes, hotel and airstrip pickup, what to bring, and driving tips.' },
  { to: '/things-to-do-in-san-pedro-by-golf-cart', tag: 'Explore', title: 'Things to do in San Pedro by golf cart', text: 'Secret Beach, Boca del Rio, the north and south of the island, tour docks, and day-trip tips.' },
];

function SectionHeader({ eyebrow, title, lead, action }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {lead && <p className="section-lead mt-4">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export default function HomePage({ onBookNow }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then((r) => setCars(r.data.slice(0, 3))).catch(() => setCars([]));
  }, []);

  return (
    <>
      <Seo />

      {/* ── Hero: answer-first copy, prices, and actions above the fold ── */}
      <section className="relative bg-island overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
        <div aria-hidden="true" className="hero-aurora" />
        <div className="relative container-page grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
            <p className="chip mb-6">
              <span aria-hidden="true" className="material-symbols-outlined icon-fill text-[18px] text-secondary">location_on</span>
              San Pedro · Ambergris Caye · Belize
            </p>
            <h1 className="font-serif text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-primary">
              Golf Cart Rental in{' '}
              <span className="whitespace-nowrap">
                <span className="relative inline-block">
                  San Pedro
                  <svg aria-hidden="true" className="hero-underline absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4" viewBox="0 0 300 16" preserveAspectRatio="none" fill="none">
                    <path d="M3 11c55-7 120-9 180-6 40 2 78 5 114 1" stroke="#f2b544" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>,
              </span>{' '}Belize
            </h1>
            <p className="mt-5 max-w-xl text-lg md:text-xl leading-relaxed text-zinc-700">
              Explore Ambergris Caye at your own pace. Choose a 4 or 6-seater golf cart and get free delivery to your hotel, resort, or Airbnb.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">4-seater <strong className="text-secondary">from $35/day</strong></span>
              <span className="chip">6-seater <strong className="text-secondary">from $65/day</strong></span>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex">
              <button onClick={onBookNow} className="btn-primary">
                Book Now
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <WhatsAppLink location="hero">Ask on WhatsApp</WhatsAppLink>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-zinc-600">
              <span aria-hidden="true" className="material-symbols-outlined icon-fill text-[18px] text-secondary">verified</span>
              Free cancellation up to 24 hours before · Open daily 8am–10pm
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-sand-deep shadow-[0_30px_60px_-20px_rgba(1,45,29,0.35)]">
              <img
                src="/og-image.jpg"
                alt="White golf cart available to rent in San Pedro"
                width="1200"
                height="630"
                fetchPriority="high"
                className="ken-burns aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
            </div>
            <div className="float-badge absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 pr-5 shadow-xl backdrop-blur-md">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun text-primary"><DeliveryIcon /></span>
              <span className="text-sm leading-snug"><strong className="block text-primary">Delivered to your door</strong><span className="text-zinc-600">Hotels, resorts &amp; Airbnbs in San Pedro</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip: swipe on phones, grid on larger screens ── */}
      <section aria-label="Why renters choose Scorpion" className="border-b border-zinc-100 bg-white pt-14 pb-8 md:py-12">
        <ul className="container-page flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible [scrollbar-width:none]">
          {TRUST.map(({ icon, title, text }) => (
            <li key={title} className="flex min-w-[78%] snap-start items-start gap-3 rounded-2xl bg-sand/70 p-4 sm:min-w-[45%] md:min-w-0 md:bg-transparent md:p-0">
              <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/60 text-primary ${typeof icon === 'string' ? 'material-symbols-outlined text-[24px]' : ''}`}>{icon}</span>
              <span><strong className="block text-primary">{title}</strong><span className="text-sm text-zinc-600">{text}</span></span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Destination marquee: where Scorpion delivers ── */}
      <section aria-label="Places we deliver golf carts" className="marquee-wrap overflow-hidden bg-primary py-4 text-white">
        <div className="marquee">
          {[false, true].map((clone) => (
            <ul key={String(clone)} aria-hidden={clone || undefined} className="flex shrink-0 items-center">
              {DESTINATIONS.map((place, i) => (
                <li key={place} className="flex items-center gap-4 whitespace-nowrap px-4 font-serif text-lg font-semibold md:text-xl">
                  {place}
                  <span aria-hidden="true" className="text-sun">{i % 2 ? <PalmIcon size={20} /> : <GolfCartIcon size={20} />}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ── Rates ── */}
      <section id="rates" className="section bg-white">
        <div className="container-page">
          <SectionHeader eyebrow="Rates" title="Simple daily golf cart rates" lead="Starting daily rates for San Pedro golf cart rentals. We confirm the total for your dates before you book." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RATES.map(({ seats, price, bestFor, featured, Icon }) => (
              <article key={seats} className={`reveal relative rounded-[1.75rem] p-7 md:p-8 ${featured ? 'bg-primary text-white' : 'card'}`}>
                {featured && <span className="absolute right-6 top-6 rounded-full bg-sun px-3 py-1 text-xs font-bold text-primary">Groups</span>}
                <span aria-hidden="true" className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${featured ? 'bg-white/10 text-sun' : 'bg-primary-fixed/60 text-primary'}`}><Icon size={30} /></span>
                <h3 className={`font-serif text-2xl font-bold ${featured ? 'text-white' : 'text-primary'}`}>{seats} golf cart</h3>
                <p className={`mt-1 text-sm ${featured ? 'text-white/70' : 'text-zinc-600'}`}>{bestFor}</p>
                <p className="mt-6 flex items-end gap-1.5">
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${featured ? 'text-sun' : 'text-secondary'}`}>From</span>
                  <span className={`font-serif text-6xl font-bold leading-none ${featured ? 'text-white' : 'text-primary'}`}>{price}</span>
                  <span className={`mb-1.5 ${featured ? 'text-white/70' : 'text-zinc-500'}`}>/day</span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {RATE_INCLUDES.map((item) => (
                    <li key={item} className={`flex items-center gap-2 text-sm ${featured ? 'text-white/85' : 'text-zinc-700'}`}>
                      <span aria-hidden="true" className={`material-symbols-outlined icon-fill text-[20px] ${featured ? 'text-sun' : 'text-secondary'}`}>check_circle</span>{item}
                    </li>
                  ))}
                </ul>
                <button onClick={onBookNow} className={`${featured ? 'btn-sun' : 'btn-primary'} mt-8 w-full`}>Book Now</button>
              </article>
            ))}
            <article className="reveal flex flex-col rounded-[1.75rem] border-2 border-dashed border-sun/60 bg-sun-soft/60 p-7 md:col-span-2 md:p-8 lg:col-span-1">
              <span aria-hidden="true" className="material-symbols-outlined mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[28px] text-amber-700">calendar_month</span>
              <h3 className="font-serif text-2xl font-bold text-primary">Weekly &amp; longer stays</h3>
              <p className="mt-1 text-sm text-zinc-600">Staying on Ambergris Caye for a week or more</p>
              <p className="mt-6 flex-1 leading-relaxed text-zinc-700">Rentals are priced by the day. Send your dates and group size and we will reply with a quote for your whole stay, including delivery and pickup.</p>
              <WhatsAppLink location="rates_long_stay" className="btn-whatsapp mt-8 w-full">Get a quote on WhatsApp</WhatsAppLink>
            </article>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeader eyebrow="How it works" title="Book your golf cart in three steps" />
          <div aria-hidden="true" className="road mb-6 md:mb-8">
            <span className="road-line" />
            <span className="road-cart"><GolfCartIcon size={40} facing="right" /></span>
          </div>
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {STEPS.map(({ title, text }, i) => (
              <li key={title} className="reveal card flex gap-4 p-6 md:flex-col md:p-8">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary font-serif text-xl font-bold text-sun">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-zinc-600 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Fleet preview (live inventory, with a static fallback) ── */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our fleet"
            title="Golf carts for rent in San Pedro"
            lead="4-seater and 6-seater golf carts, delivered to your hotel, resort, or Airbnb on Ambergris Caye."
            action={<Link to="/cars" className="btn-outline self-start">See all carts &amp; rates</Link>}
          />
          {cars.length > 0 ? (
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 [scrollbar-width:none]">
              {cars.map((car) => (
                <div key={car.id} className="w-[85%] shrink-0 snap-start md:w-auto"><CarCard car={car} onBookNow={onBookNow} /></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {RATES.map(({ seats, price, bestFor, Icon }) => (
                <Link key={seats} to="/cars" className="reveal card card-hover flex items-center gap-5 p-6">
                  <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed/60 text-primary"><Icon size={30} /></span>
                  <span className="min-w-0">
                    <strong className="block font-serif text-xl text-primary">{seats} golf carts</strong>
                    <span className="block text-sm text-zinc-600">{bestFor} · from {price}/day</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Scorpion: bento grid ── */}
      <section className="section bg-sand">
        <div className="container-page">
          <SectionHeader eyebrow="Why Scorpion" title="A San Pedro golf cart rental that comes to you" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 md:gap-5">
            <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-primary p-8 text-white sm:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-end min-h-[260px]">
              <span aria-hidden="true" className="absolute -right-8 -top-4 text-white/10"><GolfCartIcon size={200} /></span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold">Free delivery &amp; pickup</h3>
              <p className="mt-3 leading-relaxed text-white/75">We bring your golf cart to your hotel, resort, or Airbnb anywhere in San Pedro and collect it when your rental ends. Pickup at the San Pedro airstrip (SPR) can be arranged.</p>
            </div>
            {[
              { icon: <GolfCartLongIcon />, title: 'Seats for every group', text: 'Choose a 4-seater for couples and small groups or a 6-seater for families and friends.' },
              { icon: 'chat', title: 'Easy booking', text: 'Send a request online or message us on WhatsApp. We confirm the details with you.', sun: true },
              { icon: 'build', title: 'Maintained carts', text: 'Our golf carts are regularly serviced and cleaned between rentals.' },
              { icon: 'event_available', title: 'Flexible plans', text: 'Free cancellation up to 24 hours before your rental begins.' },
            ].map(({ icon, title, text, sun }) => (
              <div key={title} className={`reveal flex gap-4 rounded-[1.75rem] p-5 sm:block sm:p-7 ${sun ? 'bg-sun-soft border border-sun/30' : 'bg-white border border-zinc-200/70'}`}>
                <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ${typeof icon === 'string' ? 'material-symbols-outlined text-[24px]' : ''}`}>{icon}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary sm:mt-5">{title}</h3>
                  <p className="mt-1 text-zinc-600 leading-relaxed sm:mt-2">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting to San Pedro ── */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeader eyebrow="Getting here" title="Arriving by plane or water taxi?" lead="Most visitors reach San Pedro on a short flight or a water taxi. Send us your arrival details and we will arrange your golf cart." />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {PARTNERS.map(({ name, url, img, icon }) => (
              <li key={name} className="reveal">
                <a href={url} target="_blank" rel="noreferrer" className="card card-hover block overflow-hidden">
                  <div className="relative aspect-[16/10] bg-primary-fixed/40">
                    <span aria-hidden="true" className="material-symbols-outlined absolute inset-0 m-auto flex h-12 w-12 items-center justify-center !text-[36px] text-secondary/60">{icon}</span>
                    <img src={resolveImageUrl(img)} alt={`${name} logo`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="relative h-full w-full object-cover" />
                  </div>
                  <span className="flex items-center justify-between px-4 py-3 text-sm font-bold text-primary">{name}<span aria-hidden="true" className="material-symbols-outlined text-[16px] text-zinc-400">open_in_new</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceAreaSection />

      {/* ── Guides: internal links to long-form content ── */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeader eyebrow="Plan your trip" title="San Pedro golf cart guides" />
          <div className="grid gap-5 md:grid-cols-2">
            {GUIDES.map(({ to, tag, title, text }) => (
              <Link key={to} to={to} className="reveal group card card-hover flex flex-col p-7 md:p-9">
                <span className="self-start rounded-full bg-sun-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">{tag}</span>
                <h3 className="mt-5 font-serif text-2xl md:text-3xl font-bold text-primary">{title}</h3>
                <p className="mt-3 flex-1 text-zinc-600 leading-relaxed">{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-secondary">Read the guide<span aria-hidden="true" className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section bg-sand">
        <div className="container-page">
          <FaqList faqs={HOME_FAQS} title="Golf cart rental FAQ" id="faq" columns intro="Quick answers about renting a golf cart in San Pedro, Belize. Still unsure? Message us on WhatsApp." />
        </div>
      </section>

      <ReviewsSection />

      <CtaBand onBookNow={onBookNow} location="home_cta" />
    </>
  );
}
