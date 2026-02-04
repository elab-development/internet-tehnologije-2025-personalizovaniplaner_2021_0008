import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const discountPercent = product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

    const detailsLink = product.cat === 'Planners' ? `/personal-planner/${product.id}` : `/product/${product.id}`;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={detailsLink} className="product-link">
          <img src={product.image} alt={product.title} />
        </Link>
        {product.offerPrice && (
          <Badge className="discount-badge-card" bg="danger">
            -{discountPercent}%
          </Badge>
        )}
      </div>

      <div className="product-card-info">
        <div className="product-card-category">
          <span className="category-tag">{product.cat}</span>
        </div>

        <Link to={detailsLink} className="product-link-title">
          <h5 className="product-card-title">{product.title}</h5>
        </Link>

        <div className="product-card-price">
          {product.offerPrice ? (
            <>
              <span className="price-original">
                <i className="bi bi-currency-euro"></i>{product.price.toFixed(2)}
              </span>
              <span className="price-current">
                <i className="bi bi-currency-euro"></i>{product.offerPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="price-current">
              <i className="bi bi-currency-euro"></i>{product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="product-card-actions">
          <Link to={detailsLink} className="btn-view-details">
            View Details
          </Link>
          <Button 
            variant="dark" 
            size="sm"
            className="btn-add-cart"
            onClick={() => onAddToCart(product)}
          >
            <i className="bi bi-cart-plus"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
