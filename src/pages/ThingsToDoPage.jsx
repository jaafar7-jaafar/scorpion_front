import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ArticleLayout from '../components/ArticleLayout';
import FaqList from '../components/FaqList';
import CtaBand from '../components/CtaBand';
import { EXPLORE_FAQS } from '../seo/faqs';
import { WHATSAPP_URL } from '../seo/site';
import { PLACES as ALL_PLACES } from '../seo/places';
import PlaceIcon from '../components/PlaceIcon';
import IslandMap from '../components/IslandMap';

const PLACES = ALL_PLACES.filter((p) => !p.mapOnly);


const TOC = [
  { id: 'places', label: 'Where to go' },
  { id: 'day-trip', label: 'Plan a day trip' },
  { id: 'best-cart', label: 'Which cart to rent' },
  { id: 'explore-faq', label: 'FAQ' },
];

export default function ThingsToDoPage({ onBookNow }) {
  return (
    <article>
      <Seo />
      <PageHero
        crumb="Things to Do in San Pedro by Golf Cart"
        eyebrow="Explore Ambergris Caye"
        title="Things to Do in San Pedro by Golf Cart"
        lead="A golf cart turns Ambergris Caye into an easy road trip. Here are the places visitors most often drive to from San Pedro, Belize, plus practical tips for planning your day with a rental cart."
      />

      <ArticleLayout toc={TOC} onBookNow={onBookNow}>
        <section id="places" aria-labelledby="places-heading">
          <h2 id="places-heading">Where to go on Ambergris Caye by golf cart</h2>
          <div className="!mt-6"><IslandMap onBookNow={onBookNow} stacked /></div>
          <ol className="!mt-6 grid gap-4 sm:grid-cols-2">
            {PLACES.map(({ icon, name, text }, i) => (
              <li key={name} className="reveal card p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun-soft text-amber-800"><PlaceIcon icon={icon} /></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Stop {i + 1}</span>
                </div>
                <h3 className="mt-4">{name}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-zinc-600">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="day-trip">
          <h2>Plan a golf cart day trip</h2>
          <ul>
            <li>Start early for longer drives, such as Secret Beach or the north of the island.</li>
            <li>Bring water, sunscreen, a hat, and cash for beach bars and small vendors.</li>
            <li>Expect slower progress on unpaved roads, especially after rain.</li>
            <li>Keep your phone charged and save our number, <a href={WHATSAPP_URL}>+501 600-7672 on WhatsApp</a>, in case you need help.</li>
            <li>Return to town before dark if you are not comfortable driving unlit roads.</li>
          </ul>
        </section>

        <section id="best-cart">
          <h2>Which golf cart is best for exploring?</h2>
          <p>A 4-seater is easy to drive and park for couples and small groups. A 6-seater keeps a larger group together for beach days and dinners. Both are delivered free to your hotel, resort, or Airbnb in San Pedro. <Link to="/cars">Compare golf cart sizes and rates</Link> or read the <Link to="/san-pedro-golf-cart-rental-guide">San Pedro golf cart rental guide</Link> before you book.</p>
        </section>

        <FaqList faqs={EXPLORE_FAQS} title="Exploring Ambergris Caye by golf cart: FAQ" id="explore-faq" />

        <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 md:p-8">
          <h2>Book a golf cart for your Ambergris Caye trip</h2>
          <p>Tell us your dates, group size, and where you are staying. We will confirm availability and arrange delivery.</p>
          <button onClick={onBookNow} className="btn-primary">Request Availability</button>
          <p>Questions first? <Link to="/contact">Contact our San Pedro team</Link>.</p>
        </section>
      </ArticleLayout>

      <CtaBand onBookNow={onBookNow} location="explore_cta" />
    </article>
  );
}
