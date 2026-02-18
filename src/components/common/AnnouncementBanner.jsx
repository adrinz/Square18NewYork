import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-banner">
      <div className="announcement-banner__content container">
        <Sparkles size={16} className="announcement-banner__icon" />
        <p className="announcement-banner__text">
          <strong>Welcome!</strong> Our website has just launched. Some features are still being developed. Thank you for your patience!
        </p>
        <button 
          className="announcement-banner__close"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
