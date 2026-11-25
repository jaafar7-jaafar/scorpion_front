import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '../seo/site';

// Describes what this website's code actually collects. Update it if forms,
// analytics, or third-party services change. Owner review recommended.
export default function PrivacyPage() {
  return (
    <article>
      <Seo />
      <PageHero
        crumb="Privacy Policy"
        eyebrow="Policies"
        title="Privacy Policy"
        lead="How Scorpion Golf Cart Rental collects and uses information when you visit this website, request a golf cart rental, or leave a review."
      />
      <div className="container-page max-w-3xl py-12 md:py-16">
        <div className="prose-guide space-y-12">
          <section>
            <h2>Information you give us</h2>
            <ul>
              <li><strong>Booking requests:</strong> your name, email address, phone number, accommodation or delivery address, pickup and return dates and times, cart seating, decoration request, and any notes you add.</li>
              <li><strong>Reviews:</strong> the name, rating, and comment you submit. Reviews are published on this website.</li>
              <li><strong>Messages and calls:</strong> information you share when you contact us by WhatsApp or phone.</li>
            </ul>
          </section>
          <section>
            <h2>How we use it</h2>
            <p>We use booking information to check availability, confirm your rental, arrange delivery and pickup, and contact you about your booking. We use reviews to show visitors what past guests say. We do not sell your personal information.</p>
          </section>
          <section>
            <h2>Analytics and third-party services</h2>
            <p>This website may use Google Analytics to count page views and clicks on booking, phone, and WhatsApp buttons, which helps us understand how visitors find us. The service-area map is provided by Google Maps. WhatsApp conversations are handled by WhatsApp. These services process data under their own privacy policies.</p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>To ask about, correct, or delete information you have given us, including a review, contact us at <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a> or <a href={WHATSAPP_URL}>on WhatsApp</a>, 24 hours a day.</p>
          </section>
          <section>
            <h2>Related pages</h2>
            <p>Read our <Link to="/rental-terms">rental terms and policies</Link> or visit our <Link to="/contact">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
