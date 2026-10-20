import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { WHATSAPP_URL } from '../seo/site';
import { trackEvent, trackAdsConversion } from '../utils/analytics';

export default function ContactPage({ onBookNow }) {
  return (
    <section className="pt-28 pb-20 bg-surface">
      <Seo />
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Breadcrumbs current="Contact" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Contact Scorpion Golf Cart Rental</h1>
        <p className="text-lg text-zinc-600 leading-relaxed mb-8">Planning a golf cart rental in San Pedro, Ambergris Caye? Contact our team to check availability, confirm rental details, and arrange delivery to your accommodation.</p>
        <address className="not-italic bg-white rounded-2xl p-7 border border-zinc-100 space-y-4 mb-8">
          <p className="font-bold text-primary">Scorpion Golf Cart Rental</p>
          <p>San Pedro, Ambergris Caye, Belize</p>
          <p><a href="tel:+5016007672" onClick={() => trackEvent('phone_click', { location: 'contact' })} className="text-secondary font-semibold underline">+501 600-7672</a></p>
          <p>Available daily, 8am–10pm (Belize time)</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => { trackEvent('whatsapp_click', { location: 'contact' }); trackAdsConversion(process.env.REACT_APP_GADS_CONVERSION_LABEL_WHATSAPP); }} className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold">Message Us on WhatsApp</a>
        </address>
        <h2 className="font-serif text-2xl font-bold text-primary mb-3">What to include in your inquiry</h2>
        <p className="text-zinc-600 leading-relaxed mb-6">Send your pickup and return dates, the number of passengers, and the name or location of your hotel, resort, or Airbnb. We will confirm availability and delivery arrangements with you.</p>
        <button onClick={onBookNow} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold">Send a Booking Request</button>
      </div>
    </section>
  );
}
