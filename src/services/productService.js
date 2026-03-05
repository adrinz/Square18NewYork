export const ETSY_SHOP_URL = 'https://www.etsy.com/shop/square18newyork';
export const EBAY_SHOP_URL = 'https://www.ebay.com/usr/square18newyork';

const STATIC_EBAY_PRODUCTS = [
  {
    id: 'ebay-1',
    name: 'For Samsung Galaxy S25 Ultra S24 S23 S22 Frosted Case MagSafe Shockproof Cover',
    price: 10.99,
    originalPrice: null,
    image: null,
    freeShipping: false,
    marketplace: 'ebay',
    bulkDiscount: 'Save up to 5% when you buy more',
    listingUrl: EBAY_SHOP_URL,
  },
  {
    id: 'ebay-2',
    name: 'Magnetic Phone Case For iPhone 17 16 15 14 13 12 Pro Max Plus Bumper Hard Cover',
    price: 11.99,
    originalPrice: null,
    image: null,
    freeShipping: false,
    marketplace: 'ebay',
    bulkDiscount: 'Save up to 5% when you buy more',
    listingUrl: EBAY_SHOP_URL,
  },
  {
    id: 'ebay-3',
    name: 'Wallet Card Holder Case for iPhone 16e 15 14 13 12 11 Pro Max XS Leather Cover',
    price: 12.99,
    originalPrice: null,
    image: null,
    freeShipping: false,
    marketplace: 'ebay',
    bulkDiscount: 'Save up to 5% when you buy more',
    listingUrl: EBAY_SHOP_URL,
  },
];

export function getStaticEbayProducts() {
  return STATIC_EBAY_PRODUCTS;
}

export async function fetchEtsyProducts() {
  const res = await fetch('/api/etsy-products');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API request failed (${res.status})`);
  }
  const data = await res.json();
  return data.products || [];
}

export async function fetchAllProducts() {
  const ebayProducts = getStaticEbayProducts();

  try {
    const etsyProducts = await fetchEtsyProducts();
    return {
      products: [...etsyProducts, ...ebayProducts],
      error: null,
    };
  } catch (err) {
    console.error('Failed to fetch Etsy products:', err);
    return {
      products: ebayProducts,
      error: err.message || 'Failed to load Etsy products',
    };
  }
}
