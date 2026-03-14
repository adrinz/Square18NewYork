import React, { useState, useMemo } from 'react';
import { ExternalLink, ShoppingBag, Store, Truck, Shield, CreditCard } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import products from '../data/products';
import './ProductsPage.css';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/square18newyork';
const EBAY_SHOP_URL = 'https://www.ebay.com/usr/square18newyork';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return products;
    return products.filter(p => p.marketplace === activeTab);
  }, [activeTab]);

  const etsyCount = products.filter(p => p.marketplace === 'etsy').length;
  const ebayCount = products.filter(p => p.marketplace === 'ebay').length;

  return (
    <main className="products-page">
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
          <div className="products-page__results-info">
            <p>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="products-page__grid products-page__grid--grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.marketplace}-${index}`} product={product} />
            ))}
          </div>

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
