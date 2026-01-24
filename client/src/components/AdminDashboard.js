import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';
import LowStockAlert from './LowStockAlert';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/admin/check', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isAdmin) {
          setIsAdmin(true);
          
          // Fetch stats data
          try {
            const [productsRes, reviewsRes, ordersRes] = await Promise.all([
              fetch('/api/products', { credentials: 'include' }),
              fetch('/api/reviews', { credentials: 'include' }),
              fetch('/api/orders', { credentials: 'include' }).catch(() => ({ ok: false }))
            ]);

            const products = await productsRes.json();
            const reviews = await reviewsRes.json();
            const orders = ordersRes.ok ? await ordersRes.json() : [];

            const lowStockList = products.filter(p => p.stock <= 5);

            setStats({
              products: products.length || 0,
              orders: orders.length || 0,
              lowStockCount: lowStockList.length || 0,
              lowStockProducts: lowStockList,
              revenue: orders.reduce((acc, order) => acc + (order.total || 0), 0).toFixed(2)
            });
          } catch (err) {
            console.error("Error loading stats", err);
          }
        } else {
          navigate('/admin/login');
        }
      } catch (error) {
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/admin/login');
  };

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <main className="admin-content">
        {/* Low Stock Alert */}
        {stats && <LowStockAlert products={stats.lowStockProducts} />}

        {/* Stats Section */}
        {stats && (
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card p-3 text-center shadow-sm border-0">
                <h6 className="text-muted">Total Products</h6>
                <h3 className="fw-bold text-primary">{stats.products}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center shadow-sm border-0">
                <h6 className="text-muted">Total Orders</h6>
                <h3 className="fw-bold text-success">{stats.orders}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center shadow-sm border-0">
                <h6 className="text-muted">Low Stock</h6>
                <h3 className="fw-bold text-danger">{stats.lowStockCount}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 text-center shadow-sm border-0">
                <h6 className="text-muted">Revenue</h6>
                <h3 className="fw-bold text-dark">GHS {stats.revenue}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="admin-grid">
          <Link to="/admin/products" className="admin-card">
            <h3>📦 Products</h3>
            <p>Manage products and inventory</p>
          </Link>
          <Link to="/admin/reviews" className="admin-card">
            <h3>⭐ Reviews</h3>
            <p>Manage customer reviews</p>
          </Link>
          <Link to="/admin/analytics" className="admin-card">
            <h3>📊 Analytics</h3>
            <p>View sales and traffic data</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
