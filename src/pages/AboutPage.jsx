import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Users, 
  Target,
  Building,
  FileText,
  Shield
} from 'lucide-react';
import { stats } from '../data/products';
import './AboutPage.css';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We carefully vet every product and partner to ensure our customers receive only the best.',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your satisfaction drives everything we do. From selection to delivery, we prioritize your experience.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We operate with integrity, providing honest information and standing behind our products.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We continuously improve our services and expand our offerings to serve you better.',
    },
  ];

  const businessCredentials = [
    { label: 'Business Name', value: 'Square18 New York LLC' },
    { label: 'Entity Type', value: 'Domestic Limited Liability Company' },
    { label: 'State', value: 'New York' },
    { label: 'County', value: 'Suffolk' },
    { label: 'Established', value: '2021' },
    { label: 'Status', value: 'Active & Good Standing' },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__background">
          <div className="about-hero__overlay"></div>
        </div>
        <div className="container">
          <div className="about-hero__content text-center">
            <span className="section-subtitle">Our Story</span>
            <h1 className="about-hero__title">About Square18 New York</h1>
            <div className="divider divider-center"></div>
            <p className="about-hero__desc">
              Building trust through quality products and exceptional service since 2021
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__content">
              <span className="section-subtitle">Who We Are</span>
              <h2 className="about-story__title">From Vision to Reality</h2>
              <div className="divider"></div>
              <p>
                Square18 New York was born from a simple yet powerful vision: to create 
                a destination where quality meets accessibility. Founded in 2021 in 
                the heart of New York, we set out to revolutionize how people discover 
                and purchase general merchandise.
              </p>
              <p>
                Our journey began with a commitment to curate products that we ourselves 
                would be proud to own. Every item in our collection is carefully selected, 
                ensuring it meets our high standards for quality, value, and functionality.
              </p>
              <p>
                Today, Square18 New York has grown into a trusted retail destination, 
                serving thousands of customers across the nation. We've built relationships 
                with over 150 brand partners and continue to expand our offerings while 
                maintaining the personalized service that sets us apart.
              </p>
            </div>
            <div className="about-story__image">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=700&fit=crop" 
                alt="Square18 New York Team"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="about-values__grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-card__icon">
                  <value.icon size={28} />
                </div>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats section">
        <div className="container">
          <div className="about-stats__grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-stats__item">
                <span className="about-stats__value">{stat.value}</span>
                <span className="about-stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Credentials */}
      <section className="about-credentials section">
        <div className="container">
          <div className="about-credentials__content">
            <div className="about-credentials__header">
              <div className="about-credentials__icon">
                <Building size={32} />
              </div>
              <div>
                <span className="section-subtitle">Trust & Credibility</span>
                <h2 className="section-title">Business Credentials</h2>
              </div>
            </div>
            <p className="about-credentials__intro">
              Square18 New York LLC is a legally registered business in the State of New York. 
              We believe in complete transparency with our customers and partners.
            </p>
            <div className="about-credentials__grid">
              {businessCredentials.map((item, index) => (
                <div key={index} className="credential-item">
                  <span className="credential-item__label">{item.label}</span>
                  <span className="credential-item__value">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="about-credentials__badges">
              <div className="credential-badge">
                <FileText size={20} />
                <span>Articles of Organization Filed</span>
              </div>
              <div className="credential-badge">
                <CheckCircle size={20} />
                <span>Verified Business</span>
              </div>
              <div className="credential-badge">
                <Shield size={20} />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission section">
        <div className="container">
          <div className="about-mission__content text-center">
            <span className="section-subtitle">Our Mission</span>
            <h2 className="about-mission__title">
              To deliver exceptional products and experiences that enhance 
              everyday life, while building lasting relationships with our 
              customers and partners.
            </h2>
            <div className="divider divider-center"></div>
            <p className="about-mission__desc">
              We're more than just an online store — we're a community of passionate 
              people dedicated to bringing you the best products from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section">
        <div className="container">
          <div className="about-cta__content text-center">
            <h2 className="about-cta__title">Ready to Experience the Difference?</h2>
            <p className="about-cta__desc">
              Explore our curated collection or partner with us to grow your brand.
            </p>
            <div className="about-cta__actions">
              <Link to="/products" className="btn btn-secondary btn-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/wholesale" className="btn btn-outline btn-lg">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
