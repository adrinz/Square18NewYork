import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  Clock, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MapPin,
  CreditCard
} from 'lucide-react';
import './ShippingPage.css';

const ShippingPage = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: '$5.99',
      freeOver: '$50',
      description: 'Most economical option for non-urgent orders.',
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      price: '$12.99',
      freeOver: '$150',
      description: 'Faster delivery for when you need it sooner.',
    },
    {
      name: 'Overnight Shipping',
      time: 'Next Business Day',
      price: '$24.99',
      freeOver: null,
      description: 'Guaranteed next business day delivery.',
    },
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our customer service or log into your account to start the return process.',
    },
    {
      step: 2,
      title: 'Pack Your Item',
      description: 'Place the item in its original packaging with all tags and accessories.',
    },
    {
      step: 3,
      title: 'Ship It Back',
      description: 'Use the prepaid shipping label we provide or ship via your preferred carrier.',
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Once inspected, your refund will be processed within 5-7 business days.',
    },
  ];

  const returnPolicies = [
    '30-day return window from delivery date',
    'Items must be unused and in original packaging',
    'All tags and labels must be attached',
    'Receipt or proof of purchase required',
    'Free returns on defective items',
    'Original shipping charges are non-refundable',
  ];

  const nonReturnableItems = [
    'Personal care items',
    'Customized or personalized products',
    'Clearance or final sale items',
    'Items without original packaging',
    'Worn or used products',
  ];

  return (
    <main className="shipping-page">
      {/* Hero Section */}
      <section className="shipping-hero">
        <div className="container">
          <div className="shipping-hero__content text-center">
            <span className="section-subtitle">Customer Information</span>
            <h1 className="shipping-hero__title">Shipping & Returns</h1>
            <div className="divider divider-center"></div>
            <p className="shipping-hero__desc">
              Everything you need to know about delivery options, tracking your 
              order, and our hassle-free return policy.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="shipping-options section">
        <div className="container">
          <div className="section-header">
            <div className="section-header__icon">
              <Truck size={32} />
            </div>
            <div>
              <span className="section-subtitle">Delivery Options</span>
              <h2 className="section-title">Shipping Methods</h2>
            </div>
          </div>

          <div className="shipping-options__grid">
            {shippingOptions.map((option, index) => (
              <div key={index} className="shipping-option-card">
                <div className="shipping-option-card__header">
                  <h3 className="shipping-option-card__name">{option.name}</h3>
                  <span className="shipping-option-card__price">{option.price}</span>
                </div>
                <div className="shipping-option-card__time">
                  <Clock size={16} />
                  <span>{option.time}</span>
                </div>
                <p className="shipping-option-card__desc">{option.description}</p>
                {option.freeOver && (
                  <div className="shipping-option-card__free">
                    <CheckCircle size={16} />
                    <span>Free on orders over {option.freeOver}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="shipping-info-boxes">
            <div className="info-box">
              <MapPin size={24} />
              <div className="info-box__content">
                <h4>Shipping Coverage</h4>
                <p>We currently ship to all 50 US states. International shipping coming soon.</p>
              </div>
            </div>
            <div className="info-box">
              <Package size={24} />
              <div className="info-box__content">
                <h4>Order Tracking</h4>
                <p>Track your package in real-time via email link or your account dashboard.</p>
              </div>
            </div>
            <div className="info-box">
              <CreditCard size={24} />
              <div className="info-box__content">
                <h4>Free Shipping</h4>
                <p>Enjoy free standard shipping on all orders over $50.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="returns-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-header__icon">
              <RefreshCw size={32} />
            </div>
            <div>
              <span className="section-subtitle">Easy Returns</span>
              <h2 className="section-title">Return Policy</h2>
            </div>
          </div>

          <div className="returns-intro">
            <p>
              We want you to be completely satisfied with your purchase. If you're not 
              happy with your order for any reason, we offer a hassle-free 30-day return 
              policy on most items.
            </p>
          </div>

          {/* Return Steps */}
          <div className="return-steps">
            <h3 className="return-steps__title">How to Return an Item</h3>
            <div className="return-steps__grid">
              {returnSteps.map((step) => (
                <div key={step.step} className="return-step">
                  <div className="return-step__number">{step.step}</div>
                  <div className="return-step__content">
                    <h4 className="return-step__title">{step.title}</h4>
                    <p className="return-step__desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policies Grid */}
          <div className="policies-grid">
            <div className="policy-card">
              <h4 className="policy-card__title">
                <CheckCircle size={20} />
                Return Policy Guidelines
              </h4>
              <ul className="policy-card__list">
                {returnPolicies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
            <div className="policy-card policy-card--warning">
              <h4 className="policy-card__title">
                <AlertCircle size={20} />
                Non-Returnable Items
              </h4>
              <ul className="policy-card__list">
                {nonReturnableItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="shipping-faq section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Common Questions</span>
            <h2 className="section-title">Shipping & Returns FAQ</h2>
            <div className="divider divider-center"></div>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h4>When will my order ship?</h4>
              <p>Orders placed before 2 PM EST on business days typically ship the same day. Orders placed after 2 PM or on weekends will ship the next business day.</p>
            </div>
            <div className="faq-card">
              <h4>How do I track my order?</h4>
              <p>You'll receive an email with tracking information once your order ships. You can also view tracking details in your account under "Order History."</p>
            </div>
            <div className="faq-card">
              <h4>Can I change or cancel my order?</h4>
              <p>We process orders quickly, but if you need to make changes, contact us immediately. Once shipped, orders cannot be modified.</p>
            </div>
            <div className="faq-card">
              <h4>What if my package is lost or damaged?</h4>
              <p>Contact us immediately and we'll work with the carrier to locate your package or arrange a replacement or refund.</p>
            </div>
            <div className="faq-card">
              <h4>Do you offer exchanges?</h4>
              <p>Yes! If you'd like a different size or color, simply return the original item and place a new order, or contact us to arrange an exchange.</p>
            </div>
            <div className="faq-card">
              <h4>How long do refunds take?</h4>
              <p>Refunds are processed within 5-7 business days after we receive your return. It may take additional time for the refund to appear on your statement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shipping-cta section">
        <div className="container">
          <div className="shipping-cta__content text-center">
            <h2 className="shipping-cta__title">Still Have Questions?</h2>
            <p className="shipping-cta__desc">
              Our customer service team is here to help with any shipping or return inquiries.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShippingPage;
