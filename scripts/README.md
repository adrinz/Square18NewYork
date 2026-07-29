# Product Data Scripts

## Import Etsy Products from CSV (All 59+ products)

To include **all** your Etsy products on the website:

### 1. Download your Etsy CSV

1. Sign in to [Etsy](https://www.etsy.com) and go to **Shop Manager**
2. Click **Settings** → **Options**
3. Open the **Download Data** tab
4. Under **"Currently for Sale Listings"**, click **Download CSV**
5. Save the file as `etsy-listings.csv` in this project folder (replacing the sample file if present)

### 2. Run the import script

```bash
# If the file is in the project root and named etsy-listings.csv:
node scripts/import-etsy-csv.js

# Or specify the path:
node scripts/import-etsy-csv.js path/to/etsy-listings.csv
```

The script will:
- Parse all products from your Etsy CSV
- Merge them with existing eBay products
- Update `src/data/products.js`

### 3. Refresh your website

The Products page will now show all Etsy + eBay products. Run `npm start` if the dev server isn’t already running.

**Notes:**
- eBay products are loaded from `src/data/ebay-products.json`. Run `node scripts/fetch-products.js` to refresh eBay data.
- Etsy's CSV does not include listing URLs. For direct product links, run `fetch-products.js` first (to get URLs from RSS), then run the CSV import — the script will keep URLs for products that match by title.

---

## Fetch Products from Web (RSS + eBay)

For a quick refresh without a CSV (limited to ~25 most recent Etsy items):

```bash
node scripts/fetch-products.js
```

This fetches from the Etsy RSS feed and eBay store page. Use the CSV import above when you need all Etsy products.

---

## Build the Trip Plan PDF

Renders `DISNEY_WORLD_TRIP_PLAN_AUG_2026.md` into a print-ready, letter-size PDF with a cover page and table of contents:

```bash
npm run build:trip-pdf

# Or with explicit paths:
node scripts/build-trip-pdf.js input.md output.pdf
```

Edit the markdown file and re-run to regenerate. The script has no npm dependencies — it converts the markdown itself and prints through headless Google Chrome, so the only requirement is Chrome or Chromium on your `PATH` (set `CHROME_BIN` to point at a specific browser).
