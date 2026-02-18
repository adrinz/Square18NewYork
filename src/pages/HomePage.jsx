import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Truck, 
  Shield, 
  RefreshCw,
  Star,
  Quote
} from 'lucide-react';
import { testimonials, stats, features } from '../data/products';
import './HomePage.css';

const iconMap = {
  CheckCircle,
  Truck,
  Shield,
  RefreshCw,
};

const HomePage = () => {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__overlay"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__tagline">Welcome to Square18 New York</span>
            <h1 className="hero__title">
              Discover Quality.<br />
              <span className="hero__title-accent">Experience Excellence.</span>
            </h1>
            <p className="hero__description">
              Your premier destination for curated general merchandise. 
              From everyday essentials to unique finds, we bring you quality 
              products at exceptional value.
            </p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn-secondary btn-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop section">
        <div className="container">
          <div className="value-prop__grid">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={index} className="value-prop__item">
                  <div className="value-prop__icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="value-prop__title">{feature.title}</h3>
                  <p className="value-prop__desc">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* About/Brand Story Banner */}
      <section className="brand-story">
        <div className="container">
          <div className="brand-story__content">
            <div className="brand-story__text">
              <span className="section-subtitle">Our Story</span>
              <h2 className="brand-story__title">
                Built on Trust,<br />Driven by Quality
              </h2>
              <div className="divider"></div>
              <p className="brand-story__desc">
                Founded in 2021, Square18 New York emerged from a simple vision: 
                to create a destination where quality meets value. Based in the 
                heart of New York, we've built relationships with trusted brands 
                and suppliers to bring you a carefully curated selection of 
                general merchandise.
              </p>
              <p className="brand-story__desc">
                Whether you're looking for everyday essentials or that perfect 
                unique find, we're committed to making your shopping experience 
                exceptional.
              </p>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="brand-story__image">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop" 
                alt="Square18 New York Store"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats__item">
                <span className="stats__value">{stat.value}</span>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">What Our Customers Say</span>
            <h2 className="section-title">Customer Reviews</h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <Quote className="testimonial-card__quote-icon" size={32} />
                <div className="testimonial-card__rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star--filled" />
                  ))}
                </div>
                <p className="testimonial-card__text">{testimonial.text}</p>
                <div className="testimonial-card__author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-card__avatar"
                  />
                  <div className="testimonial-card__author-info">
                    <span className="testimonial-card__name">{testimonial.name}</span>
                    <span className="testimonial-card__location">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta__content text-center">
            <h2 className="cta__title">Ready to Start Shopping?</h2>
            <p className="cta__desc">
              Join thousands of satisfied customers and discover why Square18 
              New York is the premier destination for quality merchandise.
            </p>
            <div className="cta__actions">
              <Link to="/products" className="btn btn-secondary btn-lg">
                Browse Products
              </Link>
              <Link to="/wholesale" className="btn btn-outline-light btn-lg">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
