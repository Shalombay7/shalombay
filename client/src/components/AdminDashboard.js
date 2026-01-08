import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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
