import { HOME_FAQS, FLEET_FAQS, GUIDE_FAQS, EXPLORE_FAQS } from './faqs';

export const SITE_URL = 'https://www.scorpiongolfcarts.com';
export const BUSINESS_NAME = 'Scorpion Golf Cart Rental';
export const PHONE = '+5016007672';
export const PHONE_DISPLAY = '+501 600-7672';
export const WHATSAPP_URL = 'https://wa.me/5016007672';
// Google Business Profile, by its permanent Maps customer ID (survives name changes).
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=16527417127535337220';
// Short review link on our own domain (public/review/index.html): it forwards each
// phone or computer to the most reliable Google review form, including in-app browsers.
export const GOOGLE_REVIEW_URL = 'https://www.scorpiongolfcarts.com/review';
// Short Google Business Profile link (public/google/index.html opens it in Google Maps).
export const GOOGLE_PROFILE_SHORT_URL = 'https://www.scorpiongolfcarts.com/google';
export const SOCIAL_PROFILES = [
  GOOGLE_MAPS_URL,
  'https://www.instagram.com/scorpiongolfcarts',
  'https://www.tiktok.com/@scorpiongolfcarts',
  // Add Tripadvisor and Facebook URLs here once they exist: they help search
  // and AI engines connect the brand to this site.
];

// One source for page metadata, the sitemap, build-time rendering, and schema.
export const SEO_PAGES = {
  '/': {
    title: 'Golf Cart Rental San Pedro, Belize | Scorpion Golf Carts',
    description: 'Golf cart rental in San Pedro, Ambergris Caye. 4-seaters from $35/day and 6-seaters from $65/day, with free delivery to your hotel or Airbnb. Book online or on WhatsApp.',
    name: 'Golf Cart Rental San Pedro, Belize',
    faqs: HOME_FAQS,
  },
  '/cars': {
    title: '4 & 6-Seater Golf Cart Rentals in San Pedro | Scorpion',
    description: 'Compare 4-seater and 6-seater golf carts for rent in San Pedro, Belize. See rates, what is included, and request availability with delivery to your accommodation.',
    name: 'Golf Cart Rentals',
    faqs: FLEET_FAQS,
  },
  '/san-pedro-golf-cart-rental-guide': {
    title: 'San Pedro Golf Cart Rental Guide (Ambergris Caye) | Scorpion',
    description: 'How to rent a golf cart in San Pedro, Belize: choosing seating, comparing quotes, hotel and airstrip pickup, what to bring, and driving tips for Ambergris Caye.',
    name: 'San Pedro Golf Cart Rental Guide',
    article: true,
    faqs: GUIDE_FAQS,
  },
  '/things-to-do-in-san-pedro-by-golf-cart': {
    title: 'Things to Do in San Pedro by Golf Cart | Ambergris Caye Guide',
    description: 'Where to go on Ambergris Caye by golf cart: San Pedro town, Boca del Rio, Secret Beach, the north and south of the island, tour docks, and practical driving tips.',
    name: 'Things to Do in San Pedro by Golf Cart',
    article: true,
    faqs: EXPLORE_FAQS,
  },
  '/about': {
    title: 'About Scorpion Golf Cart Rental | San Pedro, Belize',
    description: 'Get to know Scorpion Golf Cart Rental in San Pedro, Ambergris Caye. Learn about our rental service, maintained carts, and delivery to your accommodation.',
    name: 'About Scorpion',
    type: 'AboutPage',
  },
  '/contact': {
    title: 'Contact Scorpion Golf Cart Rental | San Pedro, Belize',
    description: 'Contact Scorpion Golf Cart Rental in San Pedro, Belize. Call or WhatsApp +501 600-7672 to check availability, arrange delivery, or ask about your booking.',
    name: 'Contact',
    type: 'ContactPage',
  },
  '/rental-terms': {
    title: 'Rental Terms & Policies | Scorpion Golf Cart Rental',
    description: 'Golf cart rental terms for Scorpion in San Pedro, Belize: booking confirmation, starting rates, free delivery, 24-hour free cancellation, drivers, and payment.',
    name: 'Rental Terms',
  },
  '/privacy': {
    title: 'Privacy Policy | Scorpion Golf Cart Rental',
    description: 'How Scorpion Golf Cart Rental in San Pedro, Belize collects and uses information from booking requests, reviews, analytics, and WhatsApp or phone contact.',
    name: 'Privacy Policy',
  },
};

const BUSINESS_ID = `${SITE_URL}/#business`;

function businessNode() {
  return {
    // AutoRental is the closest schema.org type and is itself a LocalBusiness.
    '@type': 'AutoRental',
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    alternateName: 'Scorpion Golf Carts',
    description: 'Golf cart rental in San Pedro, Ambergris Caye, Belize, offering 4-seater and 6-seater carts with delivery to hotels, resorts, and Airbnb rentals.',
    url: `${SITE_URL}/`,
    telephone: PHONE,
    image: `${SITE_URL}/og-image.jpg`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/scorpionlogo.png` },
    address: { '@type': 'PostalAddress', addressLocality: 'San Pedro', addressRegion: 'Belize District', addressCountry: 'BZ' },
    // Same point as the verified Google Business Profile pin, so the site and profile match.
    geo: { '@type': 'GeoCoordinates', latitude: 17.9211527, longitude: -87.961338 },
    hasMap: GOOGLE_MAPS_URL,
    areaServed: [
      { '@type': 'City', name: 'San Pedro, Belize' },
      { '@type': 'Place', name: 'Ambergris Caye, Belize' },
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00', closes: '23:59', // open 24 hours
    }],
    contactPoint: [{
      '@type': 'ContactPoint', telephone: PHONE, contactType: 'reservations',
      areaServed: 'BZ', availableLanguage: ['English'],
    }],
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    knowsAbout: ['Golf cart rental', 'San Pedro, Belize', 'Ambergris Caye'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Golf cart rentals',
      itemListElement: ['4-seater golf cart rental', '6-seater golf cart rental'].map(name => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, areaServed: { '@type': 'Place', name: 'San Pedro, Ambergris Caye, Belize' }, provider: { '@id': BUSINESS_ID } },
      })),
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function pageSchema(path, title, description) {
  const url = `${SITE_URL}${path}`;
  const page = SEO_PAGES[path];
  const graph = [
    businessNode(),
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BUSINESS_NAME, alternateName: 'Scorpion Golf Carts', inLanguage: 'en', publisher: { '@id': BUSINESS_ID } },
    {
      '@type': page?.type || 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
      inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': BUSINESS_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
      ...(path !== '/' && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    },
  ];
  if (path !== '/') graph.push({
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page?.name || title, item: url },
    ],
  });
  if (page?.article) graph.push({
    '@type': 'Article', '@id': `${url}#article`, headline: page.name, description,
    inLanguage: 'en', mainEntityOfPage: { '@id': `${url}#webpage` },
    image: `${SITE_URL}/og-image.jpg`, author: { '@id': BUSINESS_ID }, publisher: { '@id': BUSINESS_ID },
    about: { '@type': 'Place', name: 'San Pedro, Ambergris Caye, Belize' },
  });
  if (page?.faqs?.length) graph.push({
    '@type': 'FAQPage', '@id': `${url}#faq`, isPartOf: { '@id': `${url}#webpage` },
    mainEntity: page.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
