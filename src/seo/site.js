export const SITE_URL = 'https://www.scorpiongolfcarts.com';
export const BUSINESS_NAME = 'Scorpion Golf Cart Rental';
export const WHATSAPP_URL = 'https://wa.me/5016007672';

// One source for page metadata, the sitemap, and build-time rendering.
export const SEO_PAGES = {
  '/': {
    title: 'Golf Cart Rental San Pedro, Belize | Scorpion Golf Carts',
    description: 'Explore San Pedro, Ambergris Caye with Scorpion Golf Cart Rental. Choose a 4 or 6-seater, arrange hotel or Airbnb delivery, and request your booking online.',
    name: 'Golf Cart Rental San Pedro, Belize',
  },
  '/cars': {
    title: '4 & 6-Seater Golf Cart Rentals in San Pedro | Scorpion',
    description: 'Compare golf cart options for your San Pedro, Belize stay. Choose seating for your group and request availability, rental rates, and delivery with Scorpion.',
    name: 'Golf Cart Rentals',
  },
  '/about': {
    title: 'About Scorpion Golf Cart Rental | San Pedro, Belize',
    description: 'Get to know Scorpion Golf Cart Rental in San Pedro, Ambergris Caye. Learn about our rental service, maintained carts, and delivery to your accommodation.',
    name: 'About Scorpion',
    type: 'AboutPage',
  },
  '/san-pedro-golf-cart-rental-guide': {
    title: 'San Pedro Golf Cart Rental Guide | Scorpion Golf Carts',
    description: 'Plan your San Pedro golf cart rental: compare seating, prepare your travel dates, arrange pickup, and ask the right questions before booking on Ambergris Caye.',
    name: 'San Pedro Golf Cart Rental Guide',
  },
  '/contact': {
    title: 'Contact Scorpion Golf Cart Rental | San Pedro, Belize',
    description: 'Contact Scorpion Golf Cart Rental in San Pedro, Belize. Call or WhatsApp +501 600-7672 to check availability, arrange delivery, or ask about your booking.',
    name: 'Contact',
    type: 'ContactPage',
  },
};

export function pageSchema(path, title, description) {
  const url = `${SITE_URL}${path}`;
  const page = SEO_PAGES[path];
  const graph = [
    {
      '@type': 'LocalBusiness', '@id': `${SITE_URL}/#business`, name: BUSINESS_NAME,
      url: `${SITE_URL}/`, telephone: '+5016007672', image: `${SITE_URL}/og-image.jpg`, logo: `${SITE_URL}/scorpionlogo.png`,
      address: { '@type': 'PostalAddress', addressLocality: 'San Pedro', addressRegion: 'Belize District', addressCountry: 'BZ' },
      areaServed: { '@type': 'Place', name: 'San Pedro, Ambergris Caye, Belize' },
      openingHours: 'Mo-Su 08:00-22:00', sameAs: ['https://www.instagram.com/scorpiongolfcarts'],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BUSINESS_NAME, publisher: { '@id': `${SITE_URL}/#business` } },
    {
      '@type': page?.type || 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
      inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#business` },
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
  return { '@context': 'https://schema.org', '@graph': graph };
}
