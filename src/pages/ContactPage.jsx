import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import ServiceAreaSection from '../components/ServiceAreaSection';
import { CallLink, WhatsAppLink } from '../components/ContactButtons';

const STEPS = [
  'Send your pickup and return dates, group size, and where you are staying, using the booking form, WhatsApp, or a phone call.',
  'Our team checks availability and replies on WhatsApp or by email to confirm your cart, quote, and delivery time.',
  'We deliver your golf cart to your hotel, resort, or Airbnb in San Pedro, or meet you at the airstrip by arrangement.',
  'At the end of your rental, we pick the cart up from your accommodation.',
];

export default function ContactPage({ onBookNow }) {
  return (
    <>
      <Seo />
      <PageHero
        crumb="Contact"
        eyebrow="Contact & delivery"
        title="Contact Scorpion Golf Cart Rental"
        lead="Planning a golf cart rental in San Pedro, Ambergris Caye? Contact our team to check availability, confirm rental details, and arrange delivery to your accommodation."
      />

      <section className="section bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <address className="not-italic self-start rounded-[1.75rem] bg-primary p-7 text-white md:p-9 lg:sticky lg:top-28">
            <p className="font-serif text-2xl font-bold">Scorpion Golf Cart Rental</p>
            <ul className="mt-6 space-y-4 text-white/85">
              <li className="flex items-center gap-3"><span aria-hidden="true" className="material-symbols-outlined text-[24px] text-sun">location_on</span>San Pedro, Ambergris Caye, Belize</li>
              <li className="flex items-center gap-3"><span aria-hidden="true" className="material-symbols-outlined text-[24px] text-sun">call</span><CallLink location="contact" icon={false} className="font-bold text-white underline underline-offset-4" /></li>
              <li className="flex items-center gap-3"><span aria-hidden="true" className="material-symbols-outlined text-[24px] text-sun">schedule</span>Available daily, 8am–10pm (Belize time)</li>
            </ul>
            <div className="mt-8 grid gap-3">
              <WhatsAppLink location="contact">Message Us on WhatsApp</WhatsAppLink>
              <CallLink location="contact_button" className="btn-ghost-light">Call now</CallLink>
            </div>
          </address>

          <div>
            <h2 className="section-title">What to include in your inquiry</h2>
            <p className="section-lead mt-4">Send your pickup and return dates, the number of passengers, and the name or location of your hotel, resort, or Airbnb. We will confirm availability and delivery arrangements with you.</p>

            <h2 className="mt-12 font-serif text-2xl md:text-3xl font-bold text-primary">How booking a golf cart with Scorpion works</h2>
            <ol className="mt-6 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-4 rounded-2xl bg-sand/70 p-4">
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-sun">{i + 1}</span>
                  <span className="leading-relaxed text-zinc-700">{step}</span>
                </li>
              ))}
            </ol>
            <button onClick={onBookNow} className="btn-primary mt-8 w-full sm:w-auto">Send a Booking Request</button>
            <p className="mt-6 text-zinc-600">Have questions before you book? Read the <Link to="/san-pedro-golf-cart-rental-guide" className="link">San Pedro golf cart rental guide</Link> or <Link to="/cars" className="link">compare our golf carts</Link>.</p>
          </div>
        </div>
      </section>

      <ServiceAreaSection />
    </>
  );
}
