import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart, onWhatsApp, defaultImage }) => (
  <div className="card h-100 shadow-sm product-card">
    <Link to={`/product/${product._id}`}>
      <img
        src={product.imageUrl || defaultImage}
        className="card-img-top"
        alt={product.name}
        style={{ height: '220px', objectFit: 'cover' }}
        onError={(e) => (e.target.src = defaultImage)}
      />
    </Link>

    <div className="card-body d-flex flex-column">
      {product.stock <= 5 && product.stock > 0 && (
        <span className="badge bg-warning text-dark mb-2 align-self-start">
          Only {product.stock} left
        </span>
      )}
      <h5>{product.name}</h5>
      <p className="text-muted small">{product.description}</p>

      <p className="fw-bold fs-5 mt-auto">
        GHS {product.price.toFixed(2)}
      </p>

      <button
        className="btn btn-primary w-100 mb-2"
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
      >
        🛒 Add to Cart
      </button>

      <button
        className="btn btn-outline-success w-100"
        onClick={() => onWhatsApp(product)}
        disabled={product.stock === 0}
      >
        Order via WhatsApp
      </button>
    </div>
  </div>
);

export default ProductCard;