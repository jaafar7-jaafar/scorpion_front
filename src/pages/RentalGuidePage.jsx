import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ArticleLayout from '../components/ArticleLayout';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import { GUIDE_FAQS } from '../seo/faqs';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '../seo/site';

const QUICK_FACTS = [
  ['Where', 'San Pedro, Ambergris Caye, Belize'],
  ['Cart sizes', '4-seater and 6-seater golf carts'],
  ['Starting rates', 'From $35/day (4-seater) and $65/day (6-seater)'],
  ['Delivery', 'Free delivery and pickup at hotels, resorts, and Airbnbs in San Pedro'],
  ['Cancellation', 'Free cancellation up to 24 hours before your rental starts'],
  ['Booking', 'Online request, phone, or WhatsApp, daily 8am to 10pm'],
];

const TOC = [
  { id: 'quick-facts', label: 'Quick facts' },
  { id: 'why-rent', label: 'Why rent a golf cart' },
  { id: 'choose-size', label: '4 or 6-seater?' },
  { id: 'cost', label: 'How much it costs' },
  { id: 'delivery', label: 'Delivery & airstrip pickup' },
  { id: 'what-to-bring', label: 'What to bring' },
  { id: 'driving', label: 'Driving tips' },
  { id: 'guide-faq', label: 'FAQ' },
];

export default function RentalGuidePage({ onBookNow }) {
  return (
    <article>
      <Seo />
      <PageHero
        crumb="San Pedro Golf Cart Rental Guide"
        eyebrow="Rental guide"
        title="San Pedro Golf Cart Rental Guide"
        lead="Renting a golf cart is one of the easiest ways to get around San Pedro and Ambergris Caye, Belize. This guide covers how to choose a cart, what a rental costs, how delivery and airstrip pickup work, what to bring, and how to drive safely on the island."
      />

      <ArticleLayout toc={TOC} onBookNow={onBookNow}>
        <section id="quick-facts" aria-labelledby="facts-heading" className="rounded-[1.75rem] bg-sand p-6 md:p-8">
          <h2 id="facts-heading">Scorpion golf cart rental: quick facts</h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-[15px] sm:grid-cols-[9rem_1fr]">
            {QUICK_FACTS.map(([term, detail]) => (
              <div key={term} className="contents"><dt className="font-bold text-primary">{term}</dt><dd className="mb-2 text-zinc-700 sm:mb-0">{detail}</dd></div>
            ))}
          </dl>
        </section>

        <section id="why-rent">
          <h2>Why rent a golf cart in San Pedro?</h2>
          <p>Golf carts are one of the most common ways for visitors to get around Ambergris Caye. A cart lets you move between your accommodation, San Pedro town, beaches, restaurants, grocery stores, and tour docks on your own schedule, without waiting for taxis. For a stay of more than a day or two, or for a family or group, a rental is usually the most flexible option.</p>
        </section>

        <section id="choose-size">
          <h2>Choose a 4 or 6-seater for your group</h2>
          <p>Start with the number of people who will ride together. A 4-seater suits a couple, a small family, or a group of up to four. A 6-seater gives a larger family or group of friends room to travel in one cart. Ask about luggage space separately, particularly if you plan to use the cart on arrival or departure day.</p>
          <p><Link to="/cars">Compare our 4-seater and 6-seater golf carts</Link> and request the seating you need. Our team confirms availability after your inquiry.</p>
        </section>

        <section id="cost">
          <h2>How much does a golf cart rental cost?</h2>
          <p>Scorpion rates start from $35 per day for a 4-seater and $65 per day for a 6-seater. Your quote depends on your dates and cart. Share your pickup and return dates and times to get a quote for your whole stay.</p>
          <p>Before confirming any San Pedro golf cart rental, ask which currency the quote uses, whether taxes are included, and how fuel, deposits, damage responsibility, late returns, and cancellations are handled. If you plan to drive north of town, ask whether a bridge pass is included. Compare the total for your dates rather than only the starting daily rate.</p>
        </section>

        <section id="delivery">
          <h2>Hotel, Airbnb, and airstrip delivery</h2>
          <p>Scorpion delivers and picks up your cart free of charge at hotels, resorts, and Airbnb rentals in San Pedro. Send the name and location of your accommodation and a phone number we can reach during your trip. For an Airbnb, include clear arrival instructions.</p>
          <p>Arriving by plane? Pickup at the San Pedro airstrip (SPR) can be arranged. Send your flight arrival time with your booking. If you are arriving by water taxi, ask our team to confirm a meeting point.</p>
        </section>

        <section id="what-to-bring">
          <h2>What to bring and prepare before you book</h2>
          <ul>
            <li>Your full name and a working email or WhatsApp number.</li>
            <li>Your travel dates, pickup time, and return time.</li>
            <li>Your group size and preferred cart seating.</li>
            <li>Your accommodation and requested meeting location.</li>
            <li>A valid driver's license. Confirm driver eligibility and any additional documents with our team.</li>
          </ul>
        </section>

        <section id="driving">
          <h2>Driving a golf cart on Ambergris Caye</h2>
          <ul>
            <li>Traffic in Belize drives on the right-hand side of the road.</li>
            <li>Drive slowly in San Pedro town, where carts share narrow streets with cars, taxis, bicycles, and pedestrians.</li>
            <li>Some roads outside town are unpaved and can be bumpy or muddy after rain. Allow extra time.</li>
            <li>Use your headlights after dark, and park in well-lit places.</li>
            <li>Do not leave valuables in the cart, and remove the key when you park.</li>
            <li>Ask our team about current road conditions and permitted routes before longer trips.</li>
          </ul>
          <p>Looking for ideas? See our guide to <Link to="/things-to-do-in-san-pedro-by-golf-cart">things to do in San Pedro by golf cart</Link>.</p>
        </section>

        <FaqList faqs={GUIDE_FAQS} title="San Pedro golf cart rental FAQ" id="guide-faq" />

        <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 md:p-8">
          <h2>Request your San Pedro golf cart rental</h2>
          <p>Send your dates and accommodation to check availability. An online request starts the booking process, and our team will contact you to confirm the details.</p>
          <button onClick={onBookNow} className="btn-primary">Request Availability</button>
          <p>Prefer to talk? Call <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>, <a href={WHATSAPP_URL}>message us on WhatsApp</a>, or visit our <Link to="/contact">contact page</Link>.</p>
        </section>
      </ArticleLayout>

      <CtaBand onBookNow={onBookNow} location="guide_cta" />
    </article>
  );
}
