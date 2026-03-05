let cachedShopId = null;

const ETSY_BASE_URL = 'https://openapi.etsy.com/v3';
const SHOP_NAME = 'square18newyork';

async function getShopId(apiKey) {
  if (cachedShopId) return cachedShopId;

  const res = await fetch(
    `${ETSY_BASE_URL}/application/shops?shop_name=${SHOP_NAME}`,
    { headers: { 'x-api-key': apiKey } }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to fetch shop ID (${res.status}): ${body}`);
  }

  const data = await res.json();
  const shopId = data.results?.[0]?.shop_id;
  if (!shopId) throw new Error('Shop not found for name: ' + SHOP_NAME);

  cachedShopId = shopId;
  return shopId;
}

function transformListing(listing) {
  const firstImage = listing.images?.[0];
  const imageUrl = firstImage?.url_570xN || null;
  const priceRaw = listing.price?.amount;
  const divisor = listing.price?.divisor || 100;
  const price = priceRaw != null ? priceRaw / divisor : 0;

  return {
    id: `etsy-${listing.listing_id}`,
    name: listing.title,
    price,
    originalPrice: null,
    image: imageUrl,
    freeShipping: true,
    marketplace: 'etsy',
    listingUrl: listing.url,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.ETSY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ETSY_API_KEY environment variable is not configured' });
  }

  try {
    const shopId = await getShopId(apiKey);

    const listingsRes = await fetch(
      `${ETSY_BASE_URL}/application/shops/${shopId}/listings/active?includes=Images&limit=100`,
      { headers: { 'x-api-key': apiKey } }
    );

    if (!listingsRes.ok) {
      const body = await listingsRes.text();
      throw new Error(`Failed to fetch listings (${listingsRes.status}): ${body}`);
    }

    const listingsData = await listingsRes.json();
    const products = (listingsData.results || []).map(transformListing);

    return res.status(200).json({ products, count: products.length });
  } catch (err) {
    console.error('Etsy API error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch Etsy products' });
  }
}
