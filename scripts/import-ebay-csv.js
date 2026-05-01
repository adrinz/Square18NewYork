#!/usr/bin/env node

/**
 * eBay CSV Import for Square18 New York
 *
 * Imports products from eBay "all active listings" report CSV,
 * updates src/data/ebay-products.json, and regenerates src/data/products.js
 * by merging with existing Etsy products.
 *
 * Usage:
 *   node scripts/import-ebay-csv.js /path/to/ebay-report.csv
 *   node scripts/import-ebay-csv.js ebay-listings.csv
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

function parseNumber(value) {
  if (!value) return 0;
  const numeric = String(value).replace(/[^0-9.]/g, '');
  return numeric ? parseFloat(numeric) : 0;
}

function loadExistingProducts() {
  try {
    const content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
    const productsMatch = content.match(/const products = (\[[\s\S]*?\]);/);
    if (!productsMatch) return [];
    return JSON.parse(productsMatch[1]);
  } catch (_) {}
  return [];
}

function loadNonProductExports() {
  const defaults = {
    testimonials: [
      { id: 1, name: 'Sarah M.', location: 'Brooklyn, NY', rating: 5, text: 'Absolutely love the quality of products from Square18! The shipping was fast and everything arrived in perfect condition. Will definitely be ordering again.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 2, name: 'Michael R.', location: 'Manhattan, NY', rating: 5, text: 'Found exactly what I was looking for at great prices. The customer service team was incredibly helpful when I had questions about my order.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 3, name: 'Jennifer L.', location: 'Queens, NY', rating: 5, text: "The curated selection is impressive. Every item I've purchased has exceeded my expectations in quality. Square18 is now my go-to online store.", avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    ],
    stats: [
      { label: 'Products', value: '100+' },
      { label: 'Happy Customers', value: '10,000+' },
      { label: 'Brand Partners', value: '50+' },
      { label: 'Years of Excellence', value: '4+' },
    ],
    features: [
      { title: 'Curated Selection', description: 'Hand-picked products from trusted brands and suppliers, ensuring quality in every purchase.', icon: 'CheckCircle' },
      { title: 'Fast Shipping', description: 'Quick and reliable delivery across the nation with real-time tracking on all orders.', icon: 'Truck' },
      { title: 'Secure Shopping', description: 'Your data is protected with industry-leading security measures and encrypted transactions.', icon: 'Shield' },
      { title: 'Easy Returns', description: "30-day hassle-free return policy. Not satisfied? We'll make it right.", icon: 'RefreshCw' },
    ],
  };

  try {
    const content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
    const testimonialsMatch = content.match(/export const testimonials = (\[[\s\S]*?\]);/);
    const statsMatch = content.match(/export const stats = (\[[\s\S]*?\]);/);
    const featuresMatch = content.match(/export const features = (\[[\s\S]*?\]);/);
    return {
      testimonials: testimonialsMatch ? JSON.parse(testimonialsMatch[1]) : defaults.testimonials,
      stats: statsMatch ? JSON.parse(statsMatch[1]) : defaults.stats,
      features: featuresMatch ? JSON.parse(featuresMatch[1]) : defaults.features,
    };
  } catch (_) {}

  return defaults;
}

function parseEbayCSV(csvPath, existingEbayByItemId) {
  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => (h || '').toLowerCase().trim());
  const getIndex = (headerName) => headers.findIndex(h => h === headerName.toLowerCase());

  const idxItemNumber = getIndex('item number');
  const idxTitle = getIndex('title');
  const idxCurrentPrice = getIndex('current price');
  const idxStartPrice = getIndex('start price');
  const idxWatchers = getIndex('watchers');
  const idxAvailableQty = getIndex('available quantity');

  if (idxItemNumber < 0 || idxTitle < 0) {
    throw new Error('CSV missing required headers: Item number and Title');
  }

  const byItemId = new Map();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const itemId = (row[idxItemNumber] || '').trim();
    const name = (row[idxTitle] || '').trim();
    if (!itemId || !name) continue;

    const currentPrice = idxCurrentPrice >= 0 ? parseNumber(row[idxCurrentPrice]) : 0;
    const startPrice = idxStartPrice >= 0 ? parseNumber(row[idxStartPrice]) : 0;
    const price = currentPrice || startPrice || 0;
    const watchers = idxWatchers >= 0 ? parseInt(row[idxWatchers] || '0', 10) || 0 : 0;
    const availableQty = idxAvailableQty >= 0 ? parseInt(row[idxAvailableQty] || '0', 10) || 0 : 0;

    const existing = byItemId.get(itemId);
    if (!existing) {
      const previous = existingEbayByItemId.get(itemId);
      byItemId.set(itemId, {
        name,
        price,
        image: previous?.image || null,
        listingUrl: `https://www.ebay.com/itm/${itemId}`,
        marketplace: 'ebay',
        freeShipping: previous?.freeShipping !== false,
        bulkDiscount: previous?.bulkDiscount || undefined,
        watchers,
        availableQty,
      });
      continue;
    }

    // Merge duplicate rows for same item ID; keep best details.
    if (!existing.price && price) existing.price = price;
    if (watchers > existing.watchers) existing.watchers = watchers;
    if (availableQty > existing.availableQty) existing.availableQty = availableQty;
    if (name.length > existing.name.length) existing.name = name;
  }

  return Array.from(byItemId.values())
    .map(({ watchers, availableQty, ...product }) => product)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  const csvPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(__dirname, '..', 'ebay-listings.csv');

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: eBay CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const existingProducts = loadExistingProducts();
  const existingEtsy = existingProducts.filter(p => p.marketplace === 'etsy');
  const existingEbay = existingProducts.filter(p => p.marketplace === 'ebay');
  const existingEbayByItemId = new Map(
    existingEbay
      .map(p => {
        const itemId = (p.listingUrl || '').match(/\/itm\/(\d+)/)?.[1];
        return itemId ? [itemId, p] : null;
      })
      .filter(Boolean)
  );

  console.log('Importing eBay products from:', csvPath);
  const ebayProducts = parseEbayCSV(csvPath, existingEbayByItemId);

  fs.mkdirSync(path.dirname(EBAY_PRODUCTS_PATH), { recursive: true });
  fs.writeFileSync(EBAY_PRODUCTS_PATH, JSON.stringify(ebayProducts, null, 2), 'utf-8');

  const { testimonials, stats, features } = loadNonProductExports();
  const allProducts = [...existingEtsy, ...ebayProducts];

  const output = `// Auto-generated: Etsy CSV import + eBay products
// Last updated: ${new Date().toISOString()}
// Etsy: ${existingEtsy.length} products | eBay: ${ebayProducts.length} products
// Re-import Etsy: node scripts/import-etsy-csv.js etsy-listings.csv
// Re-import eBay: node scripts/import-ebay-csv.js /path/to/ebay-listings.csv

const products = ${JSON.stringify(allProducts, null, 2)};

export default products;

export const testimonials = ${JSON.stringify(testimonials, null, 2)};

export const stats = ${JSON.stringify(stats, null, 2)};

export const features = ${JSON.stringify(features, null, 2)};
`;

  fs.writeFileSync(PRODUCTS_PATH, output, 'utf-8');

  console.log(`
✓ Import complete!
  Etsy:  ${existingEtsy.length} products
  eBay:  ${ebayProducts.length} products
  Total: ${allProducts.length} products

  Updated: src/data/ebay-products.json
  Updated: src/data/products.js
`);
}

main();
