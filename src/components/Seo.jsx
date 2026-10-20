import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { BUSINESS_NAME, SITE_URL, SEO_PAGES, pageSchema } from '../seo/site';

export default function Seo({ title, description, path, noindex = false }) {
  const location = useLocation();
  const pagePath = path || location.pathname.replace(/\/$/, '') || '/';
  const page = SEO_PAGES[pagePath];
  const pageTitle = title || page?.title || BUSINESS_NAME;
  const pageDescription = description || page?.description;
  const url = `${SITE_URL}${pagePath}`;
  const image = `${SITE_URL}/og-image.jpg`;
  useEffect(() => {
    // Remove the initial admin directive only after React commits its own one.
    document.querySelector('meta[data-admin-robots]')?.remove();
  }, []);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      {pageDescription && <meta property="og:description" content={pageDescription} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Scorpion Golf Cart Rental in San Pedro, Belize" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {pageDescription && <meta name="twitter:description" content={pageDescription} />}
      <meta name="twitter:image" content={image} />

      {!noindex && <script type="application/ld+json">{JSON.stringify(pageSchema(pagePath, pageTitle, pageDescription)).replace(/</g, '\\u003c')}</script>}
    </Helmet>
  );
}
