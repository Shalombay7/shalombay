import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewList from './ReviewList';
import AddReview from './AddReview';
import { addToCart as addToLocalCart } from './CartUtils';
import ProductCard from './ProductCard';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
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

          // Fetch related products (simple client-side filtering)
          axios.get(`${API_URL}/api/products`)
            .then(allRes => {
              const related = allRes.data
                .filter(p => p.category === res.data.category && p._id !== res.data._id)
                .slice(0, 4);
              setRelatedProducts(related);
            });
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const addToCart = () => {
    if (product) {
      addToLocalCart(product);
      toast.success('Added to cart!');
    }
  };

  const addRelatedToCart = (productId) => {
    const prod = relatedProducts.find(p => p._id === productId);
    if (prod) {
      addToLocalCart(prod);
      toast.success('Added to cart!');
    }
  };

  const orderViaWhatsApp = (p) => {
    const phone = '233542447318';
    const message = `Hello, I would like to order:\n\nProduct: ${p.name}\nPrice: GHS ${p.price.toFixed(2)}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
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
            href={`https://wa.me/233542447318?text=${encodeURIComponent(`I want to order ${product.name}`)}`}
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

      {relatedProducts.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Related Products</h3>
          <div className="row">
            {relatedProducts.map(rp => (
              <div key={rp._id} className="col-6 col-md-3 mb-4">
                <ProductCard 
                  product={rp}
                  defaultImage={defaultImage}
                  onAddToCart={addRelatedToCart}
                  onWhatsApp={orderViaWhatsApp}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;