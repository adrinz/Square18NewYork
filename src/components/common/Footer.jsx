import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  ArrowRight,
  X
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [showComingSoonBanner, setShowComingSoonBanner] = useState(false);
  const [showSocialToast, setShowSocialToast] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (e) => {
    e.preventDefault();
    setShowSocialToast(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setShowComingSoonBanner(true);
  };

  useEffect(() => {
    if (!showComingSoonBanner) return;
    const timer = setTimeout(() => setShowComingSoonBanner(false), 4000);
    return () => clearTimeout(timer);
  }, [showComingSoonBanner]);

  useEffect(() => {
    if (!showSocialToast) return;
    const timer = setTimeout(() => setShowSocialToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showSocialToast]);

  const quickLinks = [
    { path: '/products', label: 'Shop All' },
    { path: '/about', label: 'Our Story' },
    { path: '/wholesale', label: 'Wholesale' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const customerService = [
    { path: '/shipping', label: 'Shipping & Delivery' },
    { path: '/returns', label: 'Returns & Exchanges' },
    { path: '/faq', label: 'FAQ' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
  ];

  return (
    <footer className="footer">
      {/* Social Media Toast */}
      {showSocialToast && (
        <div className="footer__social-toast" role="alert">
          <p className="footer__social-toast-text">
            Social media links are not available at the moment, we are working on the updates.
          </p>
          <button
            type="button"
            className="footer__social-toast-close"
            onClick={() => setShowSocialToast(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-content">
            <div className="footer__newsletter-text">
              <h3 className="footer__newsletter-title">Join Our Newsletter</h3>
              <p className="footer__newsletter-desc">
                Subscribe to receive updates on new arrivals, special offers, and exclusive events.
              </p>
              <p className="footer__newsletter-coming-soon">
                Coming soon — we&apos;ll notify you when you can sign up.
              </p>
            </div>
            <div className="footer__newsletter-form-wrapper">
              <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer__newsletter-input"
                  aria-label="Email address"
                />
                <button type="submit" className="footer__newsletter-btn">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
              {showComingSoonBanner && (
                <div className="footer__coming-soon-banner" role="alert">
                  <p className="footer__coming-soon-banner-text">
                    Coming soon — this feature is not available at the moment.
                  </p>
                  <button
                    type="button"
                    className="footer__coming-soon-banner-close"
                    onClick={() => setShowComingSoonBanner(false)}
                    aria-label="Close banner"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img 
                  src="/assets/logo.png" 
                  alt="Square18 New York" 
                  className="footer__logo-image"
                />
              </Link>
              <p className="footer__brand-desc">
                Your premier destination for quality general merchandise. 
                Curated collections, exceptional value, and trusted service since 2021.
              </p>
              <div className="footer__social">
                {socialLinks.map((social) => (
                  <button
                    key={social.label}
                    type="button"
                    className="footer__social-link"
                    aria-label={social.label}
                    onClick={handleSocialClick}
                  >
                    <social.icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__column">
              <h4 className="footer__column-title">Quick Links</h4>
              <ul className="footer__links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer__column">
              <h4 className="footer__column-title">Customer Service</h4>
              <ul className="footer__links">
                {customerService.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__column">
              <h4 className="footer__column-title">Contact Us</h4>
              <ul className="footer__contact">
                <li className="footer__contact-item">
                  <MapPin size={18} />
                  <span>
                    160 Walt Whitman Rd<br />
                    Huntington Station, NY 11746
                  </span>
                </li>
                <li className="footer__contact-item">
                  <Mail size={18} />
                  <a href="mailto:info@square18newyork.com">info@square18newyork.com</a>
                </li>
                <li className="footer__contact-item">
                  <Phone size={18} />
                  <a href="tel:+16466398287">(646) 639-8287</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} Square18 New York LLC. All rights reserved.
            </p>
            <div className="footer__legal">
              <span className="footer__legal-item">Suffolk County, NY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
