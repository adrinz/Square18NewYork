import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <span className="not-found-page__code">404</span>
        <h1 className="not-found-page__title">Page Not Found</h1>
        <p className="not-found-page__desc">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="not-found-page__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={20} />
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-outline btn-lg">
            <ShoppingBag size={20} />
            Shop Now
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
