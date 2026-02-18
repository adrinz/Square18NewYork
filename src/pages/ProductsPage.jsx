import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, X, ExternalLink, ShoppingBag, Store, Truck, Shield, CreditCard } from 'lucide-react';
import { ProductCard } from '../components/products';
import { products, categories, ETSY_SHOP_URL } from '../data/products';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="products-page">
      {/* Page Header */}
      <section className="products-page__header">
        <div className="container">
          <h1 className="products-page__title">Shop All Products</h1>
          <p className="products-page__subtitle">
            Discover our curated collection of quality merchandise — Click any product to shop on Etsy
          </p>
        </div>
      </section>


      <div className="container">
        <div className="products-page__layout">
          {/* Sidebar Filters */}
          <aside className={`products-page__sidebar ${showFilters ? 'products-page__sidebar--open' : ''}`}>
            <div className="products-page__sidebar-header">
              <h3 className="products-page__sidebar-title">Filters</h3>
              <button
                className="products-page__sidebar-close"
                onClick={() => setShowFilters(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4 className="filter-section__title">Categories</h4>
              <ul className="filter-section__list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`filter-section__btn ${
                        activeCategory === category.slug ? 'filter-section__btn--active' : ''
                      }`}
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {category.name}
                      <span className="filter-section__count">
                        {category.slug === 'all'
                          ? products.length
                          : products.filter(p => p.category === category.slug).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4 className="filter-section__title">Price Range</h4>
              <div className="filter-section__price">
                <div className="filter-section__price-inputs">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="form-input"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="form-input"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              className="btn btn-outline"
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
                setPriceRange([0, 500]);
                setSortBy('featured');
              }}
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="products-page__main">
            {/* Toolbar */}
            <div className="products-page__toolbar">
              {/* Search */}
              <div className="products-page__search">
                <Search size={18} className="products-page__search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="products-page__search-input"
                />
              </div>

              <div className="products-page__toolbar-right">
                {/* Filter Toggle (Mobile) */}
                <button
                  className="products-page__filter-toggle"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                </button>

                {/* Sort */}
                <div className="products-page__sort">
                  <label htmlFor="sort" className="products-page__sort-label">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="products-page__sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="products-page__view-mode">
                  <button
                    className={`products-page__view-btn ${viewMode === 'grid' ? 'products-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={`products-page__view-btn ${viewMode === 'list' ? 'products-page__view-btn--active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="products-page__results-info">
              <p>
                Showing <strong>{filteredProducts.length}</strong> of{' '}
                <strong>{products.length}</strong> products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`products-page__grid products-page__grid--${viewMode}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="products-page__etsy-redirect">
                <div className="etsy-redirect__icon">
                  <Store size={64} />
                </div>
                <h2 className="etsy-redirect__title">Shop Our Products on Etsy</h2>
                <p className="etsy-redirect__description">
                  Browse our complete collection of quality products on our official Etsy store. 
                  Enjoy secure checkout, buyer protection, and fast shipping.
                </p>
                
                <a
                  href={ETSY_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="etsy-redirect__btn"
                >
                  <ShoppingBag size={20} />
                  Visit Our Etsy Shop
                  <ExternalLink size={16} />
                </a>

                <div className="etsy-redirect__features">
                  <div className="etsy-redirect__feature">
                    <Truck size={24} />
                    <span>Free Shipping Available</span>
                  </div>
                  <div className="etsy-redirect__feature">
                    <Shield size={24} />
                    <span>Buyer Protection</span>
                  </div>
                  <div className="etsy-redirect__feature">
                    <CreditCard size={24} />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
