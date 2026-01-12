import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ads, setAds] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const userId = localStorage.getItem('userId');

  const defaultImage = 'https://placehold.co/200x200?text=No+Image';
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/featured`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.warn('Unexpected response format for featured products:', data);
          setProducts([]);
          setFilteredProducts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
        setError(error.response ? error.response.data.message : 'Network error: Unable to connect to the server.');
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      });

    axios
      .get(`${API_URL}/api/ads`)
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setAds(data);
        } else {
          console.warn('Unexpected response format for ads:', data);
          setAds([]); // Default to empty array if not an array
        }
      })
      .catch(error => {
        console.error('Error fetching ads:', error);
        setAds([]); // Fallback on error
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [search, products]);

  const addToCart = async (productId) => {
    if (!userId) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/cart/${userId}`, {
        productId,
        quantity: 1
      });
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart.');
    }
  };

  const orderViaWhatsApp = (product) => {
    const phoneNumber = '233542447318';
    const message = `Hello, I would like to order:\n\nProduct: ${product.name}\nPrice: GHS ${product.price.toFixed(2)}\n\nPlease confirm availability.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const inquireAdViaWhatsApp = (ad) => {
    const phoneNumber = '233542447318';
    const message = `Hello, I'm interested in the special offer: ${ad.title || 'Special Offer'}\n\n${ad.description || ''}\n\nPlease provide more details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mt-4" role="main">
      <div className="p-5 mb-4 bg-primary text-white rounded-3">
        <h1 className="display-4">Welcome to Shalom Bay</h1>
        <p className="lead">Your one-stop shop for quality products. Reach us on WhatsApp: +233542447318</p>
        <a href="#featured-products" className="btn btn-light btn-lg">
          <i className="bi bi-bag"></i> Shop Now
        </a>
      </div>

      <div className="mb-4">
        <div className="card">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0">Special Offers</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {ads.length > 0 ? (
                ads.map(ad => (
                  <div key={ad._id} className="col-md-6 mb-3">
                    <div 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => inquireAdViaWhatsApp(ad)}
                      className="h-100"
                    >
                      <img
                        src={ad.imageUrl || defaultImage}
                        className="img-fluid rounded"
                        alt={ad.title || 'Special Offer'}
                        onError={(e) => (e.target.src = defaultImage)}
                        loading="lazy"
                      />
                      <p className="mt-2 text-center">{ad.description || 'No description available'}</p>
                      <div className="text-center">
                        <button className="btn btn-sm btn-success"><i className="bi bi-whatsapp"></i> Inquire on WhatsApp</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No special offers available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      <h2 className="my-4" id="featured-products">Featured Products</h2>
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
      ) : !Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row" aria-labelledby="featured-products">
          {filteredProducts.map(product => (
            <div key={product._id} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl || defaultImage}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => (e.target.src = defaultImage)}
                    loading="lazy"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <p className="card-text"><strong>GHS {product.price.toFixed(2)}</strong></p>
                  <p className="card-text">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => addToCart(product._id)}
                    disabled={product.stock === 0}
                  >
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => orderViaWhatsApp(product)}
                    disabled={product.stock === 0}
                    aria-disabled={product.stock === 0}
                  >
                    <i className="bi bi-whatsapp"></i> Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
