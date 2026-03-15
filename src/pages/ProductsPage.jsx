import React, { useState, useMemo } from 'react';
import { ExternalLink, ShoppingBag, Store, Truck, Shield, CreditCard, Search, Lock } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import SEO from '../components/common/SEO';
import products from '../data/products';
import './ProductsPage.css';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/square18newyork';
const EBAY_SHOP_URL = 'https://www.ebay.com/usr/square18newyork';
const TRUSTED_CUSTOMERS = '10,000+';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    let result = activeTab === 'all' ? products : products.filter(p => p.marketplace === activeTab);
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }
    if (sortBy !== 'default') {
      const sorted = [...result];
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'price-desc':
          sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'name-asc':
          sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          break;
        case 'name-desc':
          sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
          break;
        default:
          break;
      }
      result = sorted;
    }
    return result;
  }, [activeTab, searchQuery, sortBy]);

  const etsyCount = products.filter(p => p.marketplace === 'etsy').length;
  const ebayCount = products.filter(p => p.marketplace === 'ebay').length;

  return (
    <main className="products-page">
      <SEO
        title="Shop All Products"
        description="Discover our Premium Home, Decor, Arts, Fashion & Lifestyle goods with curated quality and everyday excellence. Shop on Etsy or eBay."
        path="/products"
      />
      <section className="products-page__header">
        <div className="container">
          <h1 className="products-page__title">Shop All Products</h1>
          <p className="products-page__subtitle">
            Discover our Premium Home, Decor, Arts, Fashion & Lifestyle goods with curated quality and everyday excellence. Click any product to shop on Etsy or eBay.
          </p>
        </div>
      </section>

      <section className="products-page__marketplace-tabs">
        <div className="container">
          <div className="marketplace-tabs">
            <button
              className={`marketplace-tab ${activeTab === 'all' ? 'marketplace-tab--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Products
              <span className="marketplace-tab__count">{products.length}</span>
            </button>
            <button
              className={`marketplace-tab ${activeTab === 'etsy' ? 'marketplace-tab--active' : ''}`}
              onClick={() => setActiveTab('etsy')}
            >
              Etsy
              <span className="marketplace-tab__count">{etsyCount}</span>
            </button>
            <button
              className={`marketplace-tab ${activeTab === 'ebay' ? 'marketplace-tab--active' : ''}`}
              onClick={() => setActiveTab('ebay')}
            >
              eBay
              <span className="marketplace-tab__count">{ebayCount}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="products-page__content">
          {/* Trust badges & Why buy from us */}
          <div className="products-page__trust-section">
            <div className="products-page__trusted-by">
              <span className="products-page__trusted-by-label">Trusted by</span>
              <span className="products-page__trusted-by-count">{TRUSTED_CUSTOMERS}</span>
              <span className="products-page__trusted-by-label">customers</span>
            </div>
            <div className="products-page__trust-badges">
              <div className="products-page__trust-badge">
                <Lock size={20} />
                <span>SSL Secured</span>
              </div>
              <div className="products-page__trust-badge">
                <CreditCard size={20} />
                <span>Secure Payment</span>
              </div>
              <div className="products-page__trust-badge">
                <Shield size={20} />
                <span>Buyer Protection</span>
              </div>
            </div>
          </div>

          {/* Toolbar: Search & Sort */}
          <div className="products-page__toolbar">
            <div className="products-page__search">
              <Search size={20} className="products-page__search-icon" aria-hidden />
              <input
                type="search"
                placeholder="Search products..."
                className="products-page__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products by name"
              />
            </div>
            <div className="products-page__toolbar-right">
              <div className="products-page__sort">
                <label htmlFor="sort-products" className="products-page__sort-label">Sort by</label>
                <select
                  id="sort-products"
                  className="products-page__sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="products-page__results-info">
                <p>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
          <div className="products-page__grid products-page__grid--grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.marketplace}-${index}`} product={product} />
            ))}
          </div>
          ) : (
            <div className="products-page__empty-state">
              <p>No products match your search. Try a different term or browse all products.</p>
            </div>
          )}

          <div className="products-page__store-redirect">
            <div className="store-redirect__icon">
              <Store size={64} />
            </div>
            <h2 className="store-redirect__title">Visit Our Official Stores</h2>
            <p className="store-redirect__description">
              Browse our complete collection of quality products on our official Etsy and eBay stores.
              Enjoy secure checkout, buyer protection, and fast shipping.
            </p>

            <div className="store-redirect__buttons">
              <a
                href={ETSY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-redirect__btn store-redirect__btn--etsy"
              >
                <ShoppingBag size={20} />
                Visit Our Etsy Shop
                <ExternalLink size={16} />
              </a>

              <a
                href={EBAY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-redirect__btn store-redirect__btn--ebay"
              >
                <ShoppingBag size={20} />
                Visit Our eBay Shop
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="store-redirect__features">
              <div className="store-redirect__feature">
                <Truck size={24} />
                <span>Fast Shipping</span>
              </div>
              <div className="store-redirect__feature">
                <Shield size={24} />
                <span>Buyer Protection</span>
              </div>
              <div className="store-redirect__feature">
                <CreditCard size={24} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
