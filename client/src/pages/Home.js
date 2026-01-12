import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const userId = localStorage.getItem('userId') || '688a34e590fb103010b5f89d';
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    // Use absolute path if API_URL is defined
    axios.get(`${API_URL}/api/products/featured`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.response?.data?.message || error.message || 'Network error');
        setLoading(false);
      });

    axios.get(`${API_URL}/api/ads`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setAds(response.data);
        } else {
          setAds([]);
        }
      })
      .catch(error => console.error('Error fetching ads:', error));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [category, search, products]);

  const addToCart = async (productId) => {
    if (!userId) {
      toast.error('Please log in to add items to your cart.');
      window.location.href = '/login';
      return;
    }
    try {
      const product = products.find(p => p._id === productId);
      if (product.stock === 0) {
        toast.error('This product is out of stock.');
        return;
      }
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

  return (
    <div className="container mt-4">
      <div className="p-5 mb-4 bg-primary text-white rounded-3">
        <h1 className="display-4">Welcome to Health Shop</h1>
        <p className="lead">Your one-stop shop for vitamins and supplements.</p>
        <Link to="/cart" className="btn btn-light btn-lg">
          <i className="bi bi-cart"></i> Shop Now
        </Link>
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
                      onClick={() => {
                        const msg = encodeURIComponent(`Hello, I'm interested in the special offer: ${ad.title || 'Special Offer'}\n\n${ad.description || ''}`);
                        window.open(`https://wa.me/233542447318?text=${msg}`, '_blank');
                      }}
                    >
                      <img
                        src={ad.imageUrl}
                        className="img-fluid rounded"
                        alt={ad.title}
                      />
                      <p className="mt-2 text-center">{ad.description}</p>
                      <div className="text-center"><button className="btn btn-sm btn-success"><i className="bi bi-whatsapp"></i> Inquire on WhatsApp</button></div>
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
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Protein">Protein</option>
            <option value="Supplements">Supplements</option>
          </select>
        </div>
      </div>

      <h2 className="my-4">Featured Products</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product._id} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <p className="card-text"><strong>${product.price.toFixed(2)}</strong></p>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product._id)}
                      disabled={product.stock === 0}
                    >
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        const msg = encodeURIComponent(`Hi, I want to buy ${product.name} for $${product.price}`);
                        window.open(`https://wa.me/233542447318?text=${msg}`, '_blank');
                      }}
                    >
                      <i className="bi bi-whatsapp"></i> Buy Now
                    </button>
                  </div>
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