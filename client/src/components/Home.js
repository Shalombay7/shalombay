import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import FloatingWhatsApp from './FloatingWhatsApp';
import SpecialOffers from './SpecialOffers';
import { addToCart as addToLocalCart, getCart } from './CartUtils';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || '';
  const defaultImage = 'https://placehold.co/400x400?text=No+Image';

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/featured`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setFilteredProducts(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products.');
        setLoading(false);
      });

    axios
      .get(`${API_URL}/api/ads`)
      .then(res => {
        if (Array.isArray(res.data)) setAds(res.data);
      })
      .catch(() => setAds([]));
  }, []);

  /* ===================== CART COUNT ===================== */
  useEffect(() => {
    const updateCount = () => setCartCount(getCart().reduce((acc, item) => acc + item.quantity, 0));
    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  /* ===================== SEARCH ===================== */
  useEffect(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [search, products]);

  /* ===================== ACTIONS ===================== */
  const addToCart = (product) => {
    if (product) {
      addToLocalCart(product);
      toast.success('Added to cart!');
    }
  };

  const orderViaWhatsApp = (product) => {
    const phone = '233542447318';
    const message = `Hello, I would like to order:\n\nProduct: ${product.name}\nPrice: GHS ${product.price.toFixed(
      2
    )}\n\nPlease confirm availability.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const inquireAdViaWhatsApp = (ad) => {
    const phone = '233542447318';
    const message = `Hello, I'm interested in this offer:\n\n${
      ad.title || 'Special Offer'
    }\n${ad.description || ''}`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  /* ===================== UI ===================== */
  return (
    <div className="container mt-4" role="main">
      <Helmet>
        <title>Shalom Bay | Health Supplements in Ghana</title>
        <meta
          name="description"
          content="Buy vitamins, protein, and wellness supplements in Ghana. Trusted health products with fast delivery."
        />
      </Helmet>

      {/* ===================== HERO ===================== */}
      <HeroSection />

      {/* ===================== SPECIAL OFFERS ===================== */}
      <SpecialOffers 
        ads={ads} 
        defaultImage={defaultImage} 
        onInquire={inquireAdViaWhatsApp} 
      />

      {/* ===================== SEARCH ===================== */}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* ===================== PRODUCTS ===================== */}
      <h2 className="fw-bold mb-4" id="featured-products">
        Featured Products
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <div key={product._id} className="col-6 col-md-4 mb-4">
              <ProductCard
                product={product}
                defaultImage={defaultImage}
                onAddToCart={addToCart}
                onWhatsApp={orderViaWhatsApp}
              />
            </div>
          ))}
        </div>
      )}

      {/* ===================== FLOATING WHATSAPP ===================== */}
      <FloatingWhatsApp />
    </div>
  );
}

export default Home;
