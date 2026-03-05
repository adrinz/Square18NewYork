import React from 'react';
import { ExternalLink, ShoppingBag, Store, Truck, Shield, CreditCard } from 'lucide-react';
import './ProductsPage.css';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/square18newyork';
const EBAY_SHOP_URL = 'https://www.ebay.com/usr/square18newyork';

const ProductsPage = () => {
  return (
    <main className="products-page">
      <section className="products-page__header">
        <div className="container">
          <h1 className="products-page__title">Shop All Products</h1>
          <p className="products-page__subtitle">
            Discover our Premium Home, Decor, Arts, Fashion & Lifestyle goods with curated quality and everyday excellence. Click on the link below to visit our Etsy and eBay stores.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="products-page__content">
          <div className="products-page__store-redirect">
            <div className="store-redirect__icon">
              <Store size={64} />
            </div>
            <h2 className="store-redirect__title">Shop Our Products on Etsy and eBay</h2>
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
