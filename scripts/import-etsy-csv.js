#!/usr/bin/env node

/**
 * Etsy CSV Import for Square18 New York
 *
 * Imports all products from your Etsy "Currently for Sale" CSV export,
 * merges them with existing eBay products, and updates src/data/products.js.
 *
 * Note: Etsy's CSV does not include Listing IDs, so product links go to your
 * shop. For direct listing links, run fetch-products.js first to get URLs from
 * the RSS feed, then run this script — matching products will keep their URLs.
 *
 * How to get your Etsy CSV:
 * 1. Sign in to Etsy → Shop Manager → Settings → Options
 * 2. Click "Download Data" tab
 * 3. Under "Currently for Sale Listings", click "Download CSV"
 * 4. Save the file (e.g. etsy-listings.csv)
 *
 * Usage:
 *   node scripts/import-etsy-csv.js path/to/etsy-listings.csv
 *   node scripts/import-etsy-csv.js etsy-listings.csv
 *
 * If no path is given, looks for etsy-listings.csv in the project root.
 */

const fs = require('fs');
const path = require('path');

const EBAY_PRODUCTS_PATH = path.join(__dirname, '..', 'src', 'data', 'ebay-products.json');
const PRODUCTS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.js');

function parseCSV(content) {
  const lines = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current.trim()) lines.push(current);
      current = '';
      if (char === '\r' && content[i + 1] === '\n') i++;
    } else if (char === ',' && !inQuotes) {
      current += '\x00';
    } else {
      current += char;
    }
  }
  if (current.trim()) lines.push(current);

  return lines.map(line => line.split('\x00').map(cell => cell.replace(/^"|"$/g, '').trim()));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseEtsyCSV(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => (h || '').toLowerCase().trim());
  const products = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const get = (names) => {
      for (const n of names) {
        const idx = headers.findIndex(h => h.includes(n) || n.includes(h));
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return null;
    };

    const title = get(['title']) || get(['name']);
    if (!title) continue;

    const priceStr = get(['price']);
    const price = priceStr ? parseFloat(priceStr.replace(/[^0-9.]/g, '')) : 0;

    let image = get(['image 1', 'image1', 'image_url', 'image url', 'main image']);
    if (!image) {
      for (let j = 1; j <= 10; j++) {
        image = get([`image ${j}`, `image${j}`]);
        if (image) break;
      }
    }

    let listingUrl = get(['listing url', 'listing link', 'listinglink', 'url', 'link']);
    const listingId = get(['listing id', 'listingid', 'listing_id']);
    if (!listingUrl && listingId) {
      const slug = slugify(title).slice(0, 80);
      listingUrl = `https://www.etsy.com/listing/${listingId}/${slug}`;
    }
    if (!listingUrl) {
      listingUrl = 'https://www.etsy.com/shop/square18newyork';
    }

    products.push({
      name: title.replace(/\s*by\s+Square18NewYork\s*$/i, '').trim(),
      price,
      image: image || null,
      listingUrl,
      marketplace: 'etsy',
      freeShipping: true,
    });
  }

  return products;
}

function loadExistingProducts() {
  try {
    const content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
    const productsMatch = content.match(/const products = (\[[\s\S]*?\]);/);
    if (!productsMatch) return [];

    let jsonStr = productsMatch[1]
      .replace(/\bETSY_SHOP_URL\b/g, '"https://www.etsy.com/shop/square18newyork"')
      .replace(/\bEBAY_SHOP_URL\b/g, '"https://www.ebay.com/usr/square18newyork"')
      .replace(/(\w+):\s*'/g, '"$1": "')
      .replace(/'([^']*)'(?=\s*[,}\]])/g, '"$1"')
      .replace(/(\w+):\s*null/g, '"$1": null')
      .replace(/(\w+):\s*(\d+\.?\d*)/g, '"$1": $2')
      .replace(/(\w+):\s*(true|false)/g, '"$1": $2');

    return JSON.parse(jsonStr);
  } catch (_) {}
  return [];
}

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Sarah M.', location: 'Brooklyn, NY', rating: 5, text: 'Absolutely love the quality of products from Square18! The shipping was fast and everything arrived in perfect condition. Will definitely be ordering again.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 2, name: 'Michael R.', location: 'Manhattan, NY', rating: 5, text: 'Found exactly what I was looking for at great prices. The customer service team was incredibly helpful when I had questions about my order.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 3, name: 'Jennifer L.', location: 'Queens, NY', rating: 5, text: "The curated selection is impressive. Every item I've purchased has exceeded my expectations in quality. Square18 is now my go-to online store.", avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];
const DEFAULT_STATS = [
  { label: 'Products', value: '100+' },
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Brand Partners', value: '50+' },
  { label: 'Years of Excellence', value: '4+' },
];
const DEFAULT_FEATURES = [
  { title: 'Curated Selection', description: 'Hand-picked products from trusted brands and suppliers, ensuring quality in every purchase.', icon: 'CheckCircle' },
  { title: 'Fast Shipping', description: 'Quick and reliable delivery across the nation with real-time tracking on all orders.', icon: 'Truck' },
  { title: 'Secure Shopping', description: 'Your data is protected with industry-leading security measures and encrypted transactions.', icon: 'Shield' },
  { title: 'Easy Returns', description: "30-day hassle-free return policy. Not satisfied? We'll make it right.", icon: 'RefreshCw' },
];

function loadNonProductExports() {
  try {
    const content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
    const testimonialsMatch = content.match(/export const testimonials = (\[[\s\S]*?\]);/);
    const statsMatch = content.match(/export const stats = (\[[\s\S]*?\]);/);
    const featuresMatch = content.match(/export const features = (\[[\s\S]*?\]);/);
    return {
      testimonials: testimonialsMatch ? JSON.parse(testimonialsMatch[1]) : DEFAULT_TESTIMONIALS,
      stats: statsMatch ? JSON.parse(statsMatch[1]) : DEFAULT_STATS,
      features: featuresMatch ? JSON.parse(featuresMatch[1]) : DEFAULT_FEATURES,
    };
  } catch (_) {}
  return { testimonials: DEFAULT_TESTIMONIALS, stats: DEFAULT_STATS, features: DEFAULT_FEATURES };
}

function main() {
  const csvPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(__dirname, '..', 'etsy-listings.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`
Error: Etsy CSV file not found: ${csvPath}

To get your Etsy CSV:
1. Sign in to Etsy → Shop Manager
2. Settings → Options → Download Data tab
3. Under "Currently for Sale Listings", click "Download CSV"
4. Save the file as etsy-listings.csv in this project folder
   (or pass the path: node scripts/import-etsy-csv.js /path/to/file.csv)
`);
    process.exit(1);
  }

  console.log('Importing Etsy products from:', csvPath);

  const etsyProducts = parseEtsyCSV(csvPath);
  const existingProducts = loadExistingProducts();
  let ebayProducts = existingProducts.filter(p => p.marketplace === 'ebay');

  // Fallback: load eBay from ebay-products.json if parsing failed
  if (ebayProducts.length === 0) {
    try {
      const ebayPath = path.join(__dirname, '..', 'src', 'data', 'ebay-products.json');
      if (fs.existsSync(ebayPath)) {
        ebayProducts = JSON.parse(fs.readFileSync(ebayPath, 'utf-8'));
      }
    } catch (_) {}
  }
  const existingEtsyByTitle = new Map(
    existingProducts
      .filter(p => p.marketplace === 'etsy' && p.listingUrl && !p.listingUrl.includes('/shop/'))
      .map(p => [p.name.toLowerCase().trim(), p])
  );

  // Use existing listing URLs from RSS for products that match by title
  for (const p of etsyProducts) {
    const key = p.name.toLowerCase().trim();
    const existing = existingEtsyByTitle.get(key);
    if (existing?.listingUrl) {
      p.listingUrl = existing.listingUrl;
    }
    if (existing?.image && !p.image) {
      p.image = existing.image;
    }
  }
  const { testimonials, stats, features } = loadNonProductExports();

  const allProducts = [...etsyProducts, ...ebayProducts];

  const output = `// Auto-generated: Etsy CSV import + eBay products
// Last updated: ${new Date().toISOString()}
// Etsy: ${etsyProducts.length} products | eBay: ${ebayProducts.length} products
// Re-import Etsy: node scripts/import-etsy-csv.js etsy-listings.csv
// Re-fetch eBay: node scripts/fetch-products.js

const products = ${JSON.stringify(allProducts, null, 2)};

export default products;

export const testimonials = ${JSON.stringify(testimonials, null, 2)};

export const stats = ${JSON.stringify(stats, null, 2)};

export const features = ${JSON.stringify(features, null, 2)};
`;

  fs.writeFileSync(PRODUCTS_PATH, output, 'utf-8');

  console.log(`
✓ Import complete!
  Etsy:  ${etsyProducts.length} products
  eBay:  ${ebayProducts.length} products
  Total: ${allProducts.length} products

  Updated: src/data/products.js
`);
}

main();
