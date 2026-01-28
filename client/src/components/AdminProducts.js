import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const checkResponse = await fetch(`${API_URL}/api/admin/check`, {
          credentials: 'include',
        });
        const checkData = await checkResponse.json();

        if (!checkData.isAdmin) {
          navigate('/admin/login');
          return;
        }

        const response = await fetch(`${API_URL}/api/products`, {
          credentials: 'include',
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading products...</div>;

  return (
    <div className="admin-page">
      <h2>Products Management</h2>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>GHS {product.price}</td>
                <td>{product.stock}</td>
                <td>⭐ {product.rating}</td>
                <td>
                  <span className={`status ${product.status.toLowerCase().replace(' ', '-')}`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
