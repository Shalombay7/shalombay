import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewList from './ReviewList';
import AddReview from './AddReview';
import { addToCart as addToLocalCart } from '../utils/cart';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || '';
  const defaultImage = 'https://placehold.co/400x400?text=No+Image';

  const fetchProductData = () => {
    axios.get(`${API_URL}/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        // If reviews are embedded in product, use them. Otherwise fetch separately.
        if (res.data.reviews) {
          setReviews(res.data.reviews);
        } else {
          // Fallback fetch for reviews if not populated
          axios.get(`${API_URL}/api/reviews/product/${id}`)
            .then(revRes => setReviews(revRes.data))
            .catch(() => setReviews([]));
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const addToCart = async () => {
    if (product) {
      addToLocalCart(product);
      toast.success('Added to cart!');
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.imageUrl || defaultImage}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            onError={(e) => (e.target.src = defaultImage)}
          />
        </div>

        <div className="col-md-6">
          <h1 className="fw-bold">{product.name}</h1>
          <p className="text-muted">{product.description}</p>

          <p className="fs-3 fw-bold">
            GHS {product.price.toFixed(2)}
          </p>

          <button 
            className="btn btn-primary w-100 mb-2"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>

          <a
            href={`https://wa.me/233542447318?text=I want to order ${product.name}`}
            className="btn btn-success w-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order via WhatsApp
          </a>

          <hr className="my-4" />
          <ReviewList reviews={reviews} />
          <AddReview productId={id} onReviewAdded={fetchProductData} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;