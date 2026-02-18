import React from 'react';
import { ExternalLink, Package, Truck } from 'lucide-react';
import { ETSY_SHOP_URL } from '../../data/products';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    originalPrice,
    image,
    freeShipping,
    etsyUrl,
  } = product;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleClick = () => {
    window.open(etsyUrl || ETSY_SHOP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="product-card product-card--clickable" onClick={handleClick}>
      {/* Image Container */}
      <div className="product-card__image-container">
        {image ? (
          <img
            src={image}
            alt={name}
            className="product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="product-card__placeholder">
            <Package size={48} />
            <span>Product Image</span>
          </div>
        )}
        
        {/* Sale Badge */}
        {discount && (
          <span className="product-card__discount">{discount}% off</span>
        )}

        {/* Etsy Link Indicator */}
        <div className="product-card__etsy-badge">
          <ExternalLink size={14} />
          <span>View on Etsy</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>

        {/* Price */}
        <div className="product-card__price-container">
          <span className="product-card__price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="product-card__original-price">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Free Shipping */}
        {freeShipping && (
          <div className="product-card__shipping">
            <Truck size={14} />
            <span>FREE shipping</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
