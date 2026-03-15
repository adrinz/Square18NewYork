import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Square18 New York';
const SITE_URL = 'https://square18newyork.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logo.png`;

/**
 * SEO component for per-page meta tags.
 * @param {string} title - Page title (appended to site name)
 * @param {string} description - Meta description
 * @param {string} [path] - Canonical path (optional)
 * @param {string} [image] - og:image URL for social sharing (optional)
 */
const SEO = ({ title, description, path, image }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Online Retail`;
  const canonicalUrl = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;
