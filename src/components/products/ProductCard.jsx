import React from 'react';
import { ExternalLink, Truck, Tag, Lamp, Home, Palette, ShoppingBag } from 'lucide-react';
import './ProductCard.css';

const MARKETPLACE_CONFIG = {
  etsy: {
    label: 'View on Etsy',
    shopLabel: 'ETSY',
    className: 'product-card__marketplace-badge--etsy',
    accentColor: '#F56400',
    gradientFrom: '#F56400',
    gradientTo: '#E8520D',
  },
  ebay: {
    label: 'View on eBay',
    shopLabel: 'EBAY',
    className: 'product-card__marketplace-badge--ebay',
    accentColor: '#0064D2',
    gradientFrom: '#0064D2',
    gradientTo: '#0050A8',
  },
};

const getCategoryIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('lamp') || lower.includes('light') || lower.includes('night')) return Lamp;
  if (lower.includes('vase') || lower.includes('sculpture') || lower.includes('statue') || lower.includes('art') || lower.includes('decor') || lower.includes('clock') || lower.includes('bunny')) return Palette;
  if (lower.includes('shelf') || lower.includes('stand') || lower.includes('plant') || lower.includes('floor')) return Home;
  if (lower.includes('case') || lower.includes('phone') || lower.includes('wallet') || lower.includes('cover')) return ShoppingBag;
  return Home;
};

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    originalPrice,
    image,
    freeShipping,
    marketplace = 'etsy',
    listingUrl,
    bulkDiscount,
  } = product;

  const config = MARKETPLACE_CONFIG[marketplace] || MARKETPLACE_CONFIG.etsy;
  const CategoryIcon = getCategoryIcon(name);

  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleClick = () => {
    if (listingUrl) {
      window.open(listingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className={`product-card product-card--clickable product-card--${marketplace}`} onClick={handleClick}>
      <div className="product-card__image-container">
        {image ? (
          <img
            src={image}
            alt={name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className={`product-card__placeholder product-card__placeholder--${marketplace}`}>
            <div className="product-card__placeholder-icon">
              <CategoryIcon size={24} strokeWidth={1.5} />
            </div>
            <span className="product-card__placeholder-shop">{config.shopLabel}</span>
          </div>
        )}

        {discount && (
          <span className="product-card__discount">{discount}% off</span>
        )}

        <div className={`product-card__marketplace-badge ${config.className}`}>
          <ExternalLink size={12} />
          <span>{config.label}</span>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__price-row">
          <div className="product-card__price-container">
            <span className="product-card__price">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="product-card__original-price">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {bulkDiscount && (
          <div className="product-card__bulk-discount">
            <Tag size={11} />
            <span>{bulkDiscount}</span>
          </div>
        )}

        {freeShipping && (
          <div className="product-card__shipping">
            <Truck size={12} />
            <span>FREE shipping</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
