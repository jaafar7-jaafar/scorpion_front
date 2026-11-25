import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '../seo/site';

// Owner review: this page only restates policies already published on the site.
// Add deposit, fuel, damage, insurance, and age terms once the owner confirms them.
export default function TermsPage() {
  return (
    <article>
      <Seo />
      <PageHero
        crumb="Rental Terms"
        eyebrow="Policies"
        title="Rental Terms & Policies"
        lead="The key terms for renting a golf cart from Scorpion Golf Cart Rental in San Pedro, Ambergris Caye, Belize. Your full rental agreement is confirmed with you before your rental starts."
      />
      <div className="container-page max-w-3xl py-12 md:py-16">
        <div className="prose-guide space-y-12">
          <section>
            <h2>Booking requests</h2>
            <p>Submitting the booking form on this website, or messaging us on WhatsApp or by phone, is a request for a rental. A booking is confirmed only when our team confirms availability, your cart, your quote, and your delivery time with you by WhatsApp, phone, or email.</p>
          </section>
          <section>
            <h2>Rates and quotes</h2>
            <p>Published rates are starting daily rates: from $35 per day for a 4-seater golf cart and from $65 per day for a 6-seater. Your quote depends on your dates and the cart you choose. Before you confirm, ask us to state the currency, taxes, fuel arrangements, and any deposit included in your total.</p>
          </section>
          <section>
            <h2>Delivery and pickup</h2>
            <p>Delivery and pickup are free at hotels, resorts, and Airbnb rentals in San Pedro. Pickup at the San Pedro airstrip (SPR) can be arranged. Please give us accurate accommodation details and a phone number we can reach during your stay.</p>
          </section>
          <section>
            <h2>Cancellation</h2>
            <p>You can cancel free of charge up to 24 hours before your rental begins. Contact our team by WhatsApp or phone to cancel or change your booking.</p>
          </section>
          <section>
            <h2>Drivers</h2>
            <p>Drivers must hold a valid driver's license. Confirm driver eligibility and any additional documents with our team before your rental starts. Drive carefully, follow local traffic rules, and ask us about permitted routes before longer trips.</p>
          </section>
          <section>
            <h2>Payment</h2>
            <p>We accept cash and major credit and debit cards.</p>
          </section>
          <section>
            <h2>Questions</h2>
            <p>Contact us any day from 8am to 10pm (Belize time) at <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a> or <a href={WHATSAPP_URL}>on WhatsApp</a>. See also our <Link to="/privacy">privacy policy</Link> and <Link to="/contact">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
