#!/usr/bin/env node

/**
 * Product Scraper for Square18 New York
 * 
 * Fetches product listings from Etsy (via RSS feed) and eBay (via store search page).
 * Outputs a JavaScript module at src/data/products.js with all product data.
 *
 * Usage:  node scripts/fetch-products.js
 * 
 * No API keys required — uses public RSS and HTML endpoints.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ETSY_RSS_URL = 'https://www.etsy.com/shop/square18newyork/rss';
const EBAY_SEARCH_URL = 'https://www.ebay.com/sch/square18newyork/m.html?_dkr=1&_ipg=100&_ssn=square18newyork&_oac=1';

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseEtsyRSS(xml) {
  const products = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const title = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';
    const desc = (item.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';

    const imgMatch = desc.match(/src="([^"]+)"/);
    const priceMatch = desc.match(/<p class="price">([0-9.]+)\s*USD<\/p>/);

    const name = title
      .replace(/\s*by\s+Square18NewYork\s*$/i, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();

    if (name && link) {
      products.push({
        name,
        price: priceMatch ? parseFloat(priceMatch[1]) : 0,
        image: imgMatch ? imgMatch[1].replace(/\\/g, '') : null,
        listingUrl: link.replace(/\?ref=rss$/, ''),
        marketplace: 'etsy',
        freeShipping: true,
      });
    }
  }

  return products;
}

function parseEbayHTML(html) {
  const products = [];
  const listingRegex = /<a[^>]*href="(https:\/\/www\.ebay\.com\/itm\/\d+[^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
  let match;

  while ((match = listingRegex.exec(html)) !== null) {
    const url = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();

    if (!text || text.length < 10) continue;
    if (text.includes('Opens in a new window')) continue;

    const hashMatch = url.match(/hash=item[^:]+:g:([^&]+)/);
    const imageUrl = hashMatch
      ? `https://i.ebayimg.com/images/g/${hashMatch[1]}/s-l500.jpg`
      : null;

    const itemId = (url.match(/\/itm\/(\d+)/) || [])[1];
    if (!itemId) continue;
    if (products.some(p => p.listingUrl.includes(itemId))) continue;

    products.push({
      name: text.replace(/Opens in a new window or tab/g, '').trim(),
      price: 0,
      image: imageUrl,
      listingUrl: `https://www.ebay.com/itm/${itemId}`,
      marketplace: 'ebay',
      freeShipping: true,
    });
  }

  const priceRegex = /\$([0-9]+\.[0-9]{2})/g;
  let priceIdx = 0;
  let priceMatch;
  while ((priceMatch = priceRegex.exec(html)) !== null) {
    if (priceIdx < products.length) {
      products[priceIdx].price = parseFloat(priceMatch[1]);
      priceIdx++;
    }
  }

  return products;
}

async function main() {
  console.log('Fetching products from Etsy and eBay...\n');

  let etsyProducts = [];
  let ebayProducts = [];

  try {
    console.log('  Fetching Etsy RSS feed...');
    const etsyXml = await fetch(ETSY_RSS_URL);
    etsyProducts = parseEtsyRSS(etsyXml);
    console.log(`  Found ${etsyProducts.length} Etsy products`);
  } catch (err) {
    console.error('  Failed to fetch Etsy products:', err.message);
  }

  try {
    console.log('  Fetching eBay store page...');
    const ebayHtml = await fetch(EBAY_SEARCH_URL);
    ebayProducts = parseEbayHTML(ebayHtml);
    console.log(`  Found ${ebayProducts.length} eBay products`);
  } catch (err) {
    console.error('  Failed to fetch eBay products:', err.message);
  }

  const allProducts = [...etsyProducts, ...ebayProducts];

  // Save eBay products for CSV import merge
  const ebayPath = path.join(__dirname, '..', 'src', 'data', 'ebay-products.json');
  fs.mkdirSync(path.dirname(ebayPath), { recursive: true });
  if (ebayProducts.length > 0) {
    fs.writeFileSync(ebayPath, JSON.stringify(ebayProducts, null, 2), 'utf-8');
  }

  const EXTRAS = `
export const testimonials = [{"id":1,"name":"Sarah M.","location":"Brooklyn, NY","rating":5,"text":"Absolutely love the quality of products from Square18! The shipping was fast and everything arrived in perfect condition. Will definitely be ordering again.","avatar":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"},{"id":2,"name":"Michael R.","location":"Manhattan, NY","rating":5,"text":"Found exactly what I was looking for at great prices. The customer service team was incredibly helpful when I had questions about my order.","avatar":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"},{"id":3,"name":"Jennifer L.","location":"Queens, NY","rating":5,"text":"The curated selection is impressive. Every item I've purchased has exceeded my expectations in quality. Square18 is now my go-to online store.","avatar":"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"}];
export const stats = [{"label":"Products","value":"100+"},{"label":"Happy Customers","value":"10,000+"},{"label":"Brand Partners","value":"50+"},{"label":"Years of Excellence","value":"4+"}];
export const features = [{"title":"Curated Selection","description":"Hand-picked products from trusted brands and suppliers, ensuring quality in every purchase.","icon":"CheckCircle"},{"title":"Fast Shipping","description":"Quick and reliable delivery across the nation with real-time tracking on all orders.","icon":"Truck"},{"title":"Secure Shopping","description":"Your data is protected with industry-leading security measures and encrypted transactions.","icon":"Shield"},{"title":"Easy Returns","description":"30-day hassle-free return policy. Not satisfied? We'll make it right.","icon":"RefreshCw"}];
`;

  const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.js');
  const output = `// Auto-generated by scripts/fetch-products.js
// Last updated: ${new Date().toISOString()}
// Re-run: node scripts/fetch-products.js

const products = ${JSON.stringify(allProducts, null, 2)};

export default products;${EXTRAS}`;

  fs.writeFileSync(productsPath, output, 'utf-8');

  console.log(`\nWrote ${allProducts.length} products to src/data/products.js`);
  console.log(`  Etsy: ${etsyProducts.length}`);
  console.log(`  eBay: ${ebayProducts.length}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
