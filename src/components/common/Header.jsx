import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/wholesale', label: 'Wholesale' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img 
            src="/assets/logo.png" 
            alt="Square18 New York" 
            className="header__logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="header__nav-item">
                <Link
                  to={link.path}
                  className={`header__nav-link ${
                    location.pathname === link.path ? 'header__nav-link--active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header__actions">
          <button className="header__action-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="header__action-btn" aria-label="Account">
            <User size={20} />
          </button>
          <button className="header__action-btn header__cart-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="header__cart-count">0</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="header__menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
        <nav className="header__mobile-nav-content">
          <ul className="header__mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="header__mobile-nav-item">
                <Link
                  to={link.path}
                  className={`header__mobile-nav-link ${
                    location.pathname === link.path ? 'header__mobile-nav-link--active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
