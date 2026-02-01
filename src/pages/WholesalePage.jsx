import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  HeartHandshake, 
  TrendingUp, 
  Globe,
  Package,
  Users,
  BarChart3,
  Mail,
  Building,
  Phone
} from 'lucide-react';
import './WholesalePage.css';

const WholesalePage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    annualRevenue: '',
    productsInterested: '',
    message: '',
  });

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Growing Platform',
      description: 'Access our rapidly expanding customer base and increase your brand visibility.',
    },
    {
      icon: Globe,
      title: 'National Reach',
      description: 'We ship across the United States, giving your products nationwide exposure.',
    },
    {
      icon: BarChart3,
      title: 'Data Insights',
      description: 'Receive regular performance reports and customer behavior analytics.',
    },
    {
      icon: HeartHandshake,
      title: 'Partnership Support',
      description: 'Dedicated account management and marketing support for all partners.',
    },
  ];

  const partnerRequirements = [
    'Quality products with proper certifications',
    'Competitive wholesale pricing',
    'Reliable inventory and fulfillment capabilities',
    'Valid business registration and documentation',
    'Commitment to customer satisfaction',
    'Professional product images and descriptions',
  ];

  const audienceInfo = [
    { label: 'Primary Age Group', value: '25-45 years' },
    { label: 'Location', value: 'United States (Nationwide)' },
    { label: 'Interests', value: 'Home, Fashion, Electronics, Lifestyle' },
    { label: 'Average Order Value', value: '$75-150' },
    { label: 'Customer Demographics', value: 'Urban Professionals, Families' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will review your application and contact you shortly.');
  };

  return (
    <main className="wholesale-page">
      {/* Hero Section */}
      <section className="wholesale-hero">
        <div className="wholesale-hero__background">
          <div className="wholesale-hero__overlay"></div>
        </div>
        <div className="container">
          <div className="wholesale-hero__content text-center">
            <span className="section-subtitle">Brand Partnerships</span>
            <h1 className="wholesale-hero__title">Partner With Square18 New York</h1>
            <div className="divider divider-center"></div>
            <p className="wholesale-hero__desc">
              Expand your reach and grow your business by joining our curated marketplace. 
              We're actively seeking quality brands and suppliers to partner with.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="wholesale-benefits section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Why Partner With Us</span>
            <h2 className="section-title">Benefits of Partnership</h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="wholesale-benefits__grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-card__icon">
                  <benefit.icon size={28} />
                </div>
                <h3 className="benefit-card__title">{benefit.title}</h3>
                <p className="benefit-card__desc">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Info */}
      <section className="wholesale-audience section">
        <div className="container">
          <div className="wholesale-audience__grid">
            <div className="wholesale-audience__content">
              <span className="section-subtitle">Know Our Customers</span>
              <h2 className="section-title">Target Audience Information</h2>
              <div className="divider"></div>
              <p>
                Understanding our customer base helps you evaluate the potential fit for 
                your products. Here's a snapshot of who shops at Square18 New York:
              </p>
              <div className="wholesale-audience__stats">
                {audienceInfo.map((item, index) => (
                  <div key={index} className="audience-stat">
                    <span className="audience-stat__label">{item.label}</span>
                    <span className="audience-stat__value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wholesale-audience__metrics">
              <h3 className="wholesale-audience__metrics-title">Platform Metrics</h3>
              <div className="metric-card">
                <Users size={24} />
                <div className="metric-card__content">
                  <span className="metric-card__value">10,000+</span>
                  <span className="metric-card__label">Active Customers</span>
                </div>
              </div>
              <div className="metric-card">
                <Package size={24} />
                <div className="metric-card__content">
                  <span className="metric-card__value">250+</span>
                  <span className="metric-card__label">Products Listed</span>
                </div>
              </div>
              <div className="metric-card">
                <TrendingUp size={24} />
                <div className="metric-card__content">
                  <span className="metric-card__value">150+</span>
                  <span className="metric-card__label">Brand Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="wholesale-requirements section">
        <div className="container">
          <div className="wholesale-requirements__content">
            <div className="wholesale-requirements__text">
              <span className="section-subtitle">What We Look For</span>
              <h2 className="section-title">Partner Requirements</h2>
              <div className="divider"></div>
              <p>
                We maintain high standards to ensure the best experience for our customers. 
                Here's what we look for in potential partners:
              </p>
              <ul className="wholesale-requirements__list">
                {partnerRequirements.map((req, index) => (
                  <li key={index} className="wholesale-requirements__item">
                    <CheckCircle size={20} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="wholesale-requirements__image">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=500&fit=crop" 
                alt="Business Partnership"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="wholesale-form section">
        <div className="container">
          <div className="wholesale-form__wrapper">
            <div className="wholesale-form__header text-center">
              <span className="section-subtitle">Get Started</span>
              <h2 className="section-title">Partnership Application</h2>
              <div className="divider divider-center"></div>
              <p>
                Interested in becoming a partner? Fill out the form below and our 
                partnership team will review your application within 3-5 business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="wholesale-form__form">
              <div className="wholesale-form__grid">
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactName" className="form-label">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    className="form-input"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website" className="form-label">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="form-input"
                    placeholder="https://"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessType" className="form-label">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    className="form-select"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="distributor">Distributor</option>
                    <option value="brand">Brand Owner</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="annualRevenue" className="form-label">
                    Estimated Annual Revenue
                  </label>
                  <select
                    id="annualRevenue"
                    name="annualRevenue"
                    className="form-select"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="under-100k">Under $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="1m-5m">$1,000,000 - $5,000,000</option>
                    <option value="over-5m">Over $5,000,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="productsInterested" className="form-label">
                    Product Categories
                  </label>
                  <select
                    id="productsInterested"
                    name="productsInterested"
                    className="form-select"
                    value={formData.productsInterested}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="electronics">Electronics</option>
                    <option value="home-garden">Home & Garden</option>
                    <option value="fashion">Fashion & Accessories</option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="toys-games">Toys & Games</option>
                    <option value="multiple">Multiple Categories</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Tell Us About Your Products *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="5"
                  placeholder="Please describe your products, target market, and why you'd like to partner with Square18 New York..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="wholesale-form__submit">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit Application
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="wholesale-contact section">
        <div className="container">
          <div className="wholesale-contact__grid">
            <div className="wholesale-contact__item">
              <div className="wholesale-contact__icon">
                <Mail size={24} />
              </div>
              <h3 className="wholesale-contact__title">Email Us</h3>
              <p className="wholesale-contact__text">
                For partnership inquiries:<br />
                <a href="mailto:partners@square18ny.com">partners@square18ny.com</a>
              </p>
            </div>
            <div className="wholesale-contact__item">
              <div className="wholesale-contact__icon">
                <Phone size={24} />
              </div>
              <h3 className="wholesale-contact__title">Call Us</h3>
              <p className="wholesale-contact__text">
                Mon-Fri, 9am-5pm EST:<br />
                <a href="tel:+16466398287">(646) 639-8287</a>
              </p>
            </div>
            <div className="wholesale-contact__item">
              <div className="wholesale-contact__icon">
                <Building size={24} />
              </div>
              <h3 className="wholesale-contact__title">Visit Us</h3>
              <p className="wholesale-contact__text">
                44 Schwab Rd<br />
                Melville, NY 11747
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WholesalePage;
