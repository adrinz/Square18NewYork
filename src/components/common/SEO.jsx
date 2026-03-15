import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Square18 New York';

/**
 * SEO component for per-page meta tags.
 * @param {string} title - Page title (appended to site name)
 * @param {string} description - Meta description
 * @param {string} [path] - Canonical path (optional)
 */
const SEO = ({ title, description, path }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Online Retail`;
  const canonicalUrl = path
    ? `https://square18newyork.com${path}`
    : 'https://square18newyork.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
