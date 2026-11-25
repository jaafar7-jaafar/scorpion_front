// WebMCP: expose tools to AI agents running in the visitor's browser.
// Feature-detected, so browsers without navigator.modelContext are unaffected.
// Booking stays human-confirmed: the tool only opens a prefilled form.
import { BUSINESS_NAME, PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from '../seo/site';

const RENTAL_INFO = {
  business: BUSINESS_NAME,
  website: `${SITE_URL}/`,
  location: 'San Pedro, Ambergris Caye, Belize',
  carts: ['4-seater golf cart from $35 per day', '6-seater golf cart from $65 per day'],
  delivery: 'Free delivery and pickup at hotels, resorts, and Airbnbs in San Pedro; San Pedro airstrip (SPR) pickup by arrangement',
  cancellation: 'Free cancellation up to 24 hours before the rental starts',
  payment: 'Cash and major credit and debit cards',
  hours: 'Daily, 8am to 10pm (Belize time)',
  phone_and_whatsapp: PHONE_DISPLAY,
  whatsapp_url: WHATSAPP_URL,
  pages: {
    fleet_and_rates: `${SITE_URL}/cars`,
    rental_guide: `${SITE_URL}/san-pedro-golf-cart-rental-guide`,
    things_to_do: `${SITE_URL}/things-to-do-in-san-pedro-by-golf-cart`,
    rental_terms: `${SITE_URL}/rental-terms`,
    contact: `${SITE_URL}/contact`,
  },
  note: 'Rates are starting daily rates. Final quotes, currency, and availability are confirmed by the Scorpion team.',
};

const text = (value) => ({ content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] });
const DATE = '^\\d{4}-\\d{2}-\\d{2}$';
const TIME = '^\\d{2}:\\d{2}$';

export function registerAgentTools({ openBooking }) {
  const modelContext = typeof navigator !== 'undefined' ? navigator.modelContext : undefined;
  if (!modelContext) return () => {};

  const tools = [
    {
      name: 'get_rental_info',
      description: 'Get Scorpion Golf Cart Rental facts for San Pedro, Belize: cart sizes and starting daily rates, free delivery area, cancellation policy, payment methods, hours, and contact details.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(RENTAL_INFO),
    },
    {
      name: 'start_booking_request',
      description: 'Open the golf cart booking request form on this page, prefilled with the details provided. The visitor reviews the form, chooses the cart seating, and presses send. Nothing is submitted by this tool.',
      inputSchema: {
        type: 'object',
        properties: {
          fullName: { type: 'string', description: 'Renter full name' },
          email: { type: 'string', description: 'Email address' },
          phone: { type: 'string', description: 'Phone or WhatsApp number with country code' },
          accommodation: { type: 'string', description: 'Hotel, resort, or Airbnb in San Pedro for delivery' },
          pickupDate: { type: 'string', pattern: DATE, description: 'Rental start date, YYYY-MM-DD' },
          pickupTime: { type: 'string', pattern: TIME, description: 'Rental start time, HH:MM (24-hour)' },
          dropoffDate: { type: 'string', pattern: DATE, description: 'Rental end date, YYYY-MM-DD' },
          dropoffTime: { type: 'string', pattern: TIME, description: 'Rental end time, HH:MM (24-hour)' },
          passengers: { type: 'integer', minimum: 1, maximum: 6, description: 'Number of people riding together' },
          notes: { type: 'string', description: 'Any other requests' },
        },
      },
      execute: async (input = {}) => {
        const { accommodation, passengers, notes, ...rest } = input;
        const prefill = {};
        for (const key of ['fullName', 'email', 'phone', 'pickupDate', 'pickupTime', 'dropoffDate', 'dropoffTime']) {
          if (typeof rest[key] === 'string') prefill[key] = rest[key].slice(0, 200);
        }
        if (accommodation) Object.assign(prefill, { address: 'other', addressOther: String(accommodation).slice(0, 200) });
        const noteParts = [passengers && `Group size: ${passengers}`, notes && String(notes).slice(0, 1000)].filter(Boolean);
        if (noteParts.length) prefill.notes = noteParts.join('\n');
        openBooking(null, prefill);
        return text('The booking request form is open and prefilled. Ask the visitor to choose the cart seating, check the details, and press the send button. The Scorpion team will then confirm availability by WhatsApp or email.');
      },
    },
  ];

  try {
    if (typeof modelContext.registerTool === 'function') {
      const registrations = tools.map((tool) => modelContext.registerTool(tool));
      return () => registrations.forEach((r) => r?.unregister?.());
    }
    if (typeof modelContext.provideContext === 'function') modelContext.provideContext({ tools });
  } catch {
    // An experimental API must never break the page.
  }
  return () => {};
}
