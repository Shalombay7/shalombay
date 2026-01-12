import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const defaultImage = 'https://placehold.co/400x400?text=No+Image';
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    axios.get(`${API_URL}/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        if (!error.response) {
          setError('Network error: Unable to connect to the server.');
        } else if (error.response.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product.');
        }
        setLoading(false);
      });

    axios.get(`${API_URL}/api/reviews/product/${id}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/cart/${userId}`, {
        productId: id,
        quantity: quantity
      });
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart.');
    }
  };

  const orderViaWhatsApp = () => {
    const phoneNumber = '233542447318';
    const message = `Hello, I would like to order:\n\nProduct: ${product.name}\nPrice: GHS ${product.price.toFixed(2)}\nQuantity: ${quantity}\n\nPlease confirm availability.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to submit a review.');
      window.location.href = '/login';
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/reviews`, {
        productId: id,
        userId,
        rating,
        comment
      });
      setReviews([...reviews, response.data]);
      setRating(1);
      setComment('');
      toast.success('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review.');
    }
  };

  return (
    <div className="container mt-4" role="main">
      {loading ? (
        <div className="text-center" aria-busy="true">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="row" aria-labelledby="product-title">
            <div className="col-md-6">
              <img
                src={product.imageUrl || defaultImage}
                className="img-fluid rounded"
                alt={product.name}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                onError={(e) => (e.target.src = defaultImage)}
              />
            </div>
            <div className="col-md-6">
              <h2 id="product-title">{product.name}</h2>
              <p className="text-muted">{product.description}</p>
              <p><strong>Price: GHS {product.price.toFixed(2)}</strong></p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control w-25"
                  id="quantity"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product?.stock || 1}
                  disabled={product?.stock === 0}
                  aria-describedby="quantity-help"
                />
                <small id="quantity-help" className="form-text text-muted">
                  Select the quantity to add to cart.
                </small>
              </div>
              <button
                className="btn btn-primary me-2"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                <i className="bi bi-cart-plus"></i> Add to Cart
              </button>
              <button
                className="btn btn-success"
                onClick={orderViaWhatsApp}
                disabled={product.stock === 0}
                aria-disabled={product.stock === 0}
              >
                <i className="bi bi-whatsapp"></i> Order via WhatsApp
              </button>
              <Link to="/" className="btn btn-secondary ms-2">Back to Home</Link>
            </div>
          </div>
          <div className="mt-4">
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className="list-group mb-4">
                {reviews.map(review => (
                  <li key={review._id} className="list-group-item">
                    <p><strong>{review.userId?.name || 'Anonymous'}</strong>: {review.rating}/5</p>
                    <p>{review.comment}</p>
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                  </li>
                ))}
              </ul>
            )}
            <h4>Add a Review</h4>
            <form onSubmit={submitReview}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                  className="form-select"
                  id="rating"
                  value={rating}
                  onChange={e => setRating(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  id="comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;