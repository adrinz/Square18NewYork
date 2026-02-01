import React from 'react';
import { Star, ShoppingCart, Heart, Package } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    badge,
    inStock,
  } = product;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <article className="product-card">
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
        
        {/* Badges */}
        {badge && (
          <span className="product-card__badge">{badge}</span>
        )}
        
        {discount && (
          <span className="product-card__discount">-{discount}%</span>
        )}

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button className="product-card__action-btn" aria-label="Add to wishlist">
            <Heart size={18} />
          </button>
          <button className="product-card__action-btn" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>
        
        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'star--filled' : 'star--empty'}
              />
            ))}
          </div>
          <span className="product-card__reviews">({reviews})</span>
        </div>

        {/* Price */}
        <div className="product-card__price-container">
          <span className="product-card__price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="product-card__original-price">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!inStock && (
          <span className="product-card__out-of-stock">Out of Stock</span>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
