import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalReviews: 0,
    soldOutCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const checkResponse = await fetch('/api/admin/check', {
          credentials: 'include',
        });
        const checkData = await checkResponse.json();

        if (!checkData.isAdmin) {
          navigate('/admin/login');
          return;
        }

        // Fetch products
        const productsRes = await fetch('/api/products', { credentials: 'include' });
        const products = await productsRes.json();

        // Fetch orders
        const ordersRes = await fetch('/api/orders', { credentials: 'include' });
        const orders = await ordersRes.json();

        // Fetch reviews
        const reviewsRes = await fetch('/api/reviews', { credentials: 'include' });
        const reviews = await reviewsRes.json();

        const soldOutCount = products.filter(p => p.status === 'Sold Out').length;

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalReviews: reviews.length,
          soldOutCount,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading analytics...</div>;

  return (
    <div className="admin-page">
      <h2>Analytics Dashboard</h2>
      <div className="analytics-grid">
        <div className="stat-card">
          <h3>📦 Total Products</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>📋 Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Total Reviews</h3>
          <p className="stat-value">{stats.totalReviews}</p>
        </div>
        <div className="stat-card">
          <h3>⚠️ Sold Out</h3>
          <p className="stat-value">{stats.soldOutCount}</p>
        </div>
      </div>
    </div>
  );
}
