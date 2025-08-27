import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('Please log in to view your cart.');
      setLoading(false);
      return;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`)
      .then(response => {
        setCart(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setError(error.response ? error.response.data.message : 'Failed to load cart.');
        setLoading(false);
      });
  }, [userId]);

  const removeFromCart = async (productId) => {
    if (!userId) {
      toast.error('Please log in to modify your cart.');
      window.location.href = '/login';
      return;
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/${userId}/${productId}`);
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.productId._id !== productId),
        total: prevCart.items.reduce((sum, item) => {
          if (item.productId._id !== productId) {
            return sum + item.quantity * item.productId.price;
          }
          return sum;
        }, 0)
      }));
      toast.success('Item removed from cart!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item.');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!userId) {
      toast.error('Please log in to modify your cart.');
      window.location.href = '/login';
      return;
    }
    if (quantity < 1) return;
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`, {
        productId,
        quantity
      });
      setCart(prevCart => {
        const updatedItems = prevCart.items.map(item => {
          if (item.productId._id === productId) {
            return { ...item, quantity };
          }
          return item;
        });
        return {
          ...prevCart,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.quantity * item.productId.price, 0)
        };
      });
      toast.success('Cart updated!');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart.');
    }
  };

  const getWhatsAppMessage = () => {
    const items = cart.items.map(item => `${item.quantity}x ${item.productId.name} ($${item.productId.price.toFixed(2)})`).join(', ');
    return `Hello, I'd like to discuss my order: ${items}. Total: $${cart.total.toFixed(2)}`;
  };

  return (
    <div className="container mt-4" role="main">
      <h2 className="mb-4">Your Cart</h2>
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
      ) : cart.items.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <Link to="/">Shop now!</Link>
        </div>
      ) : (
        <div>
          <div className="row">
            {cart.items.map(item => (
              <div key={item.productId._id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.productId.imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                        className="img-fluid rounded-start"
                        alt={item.productId.name}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.productId.name}</h5>
                        <p className="card-text text-muted">{item.productId.description}</p>
                        <p className="card-text"><strong>${item.productId.price.toFixed(2)}</strong></p>
                        <div className="input-group w-50 mb-3">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={e => updateQuantity(item.productId._id, parseInt(e.target.value) || 1)}
                            min="1"
                            max={item.productId.stock}
                            aria-label="Quantity"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                            disabled={item.quantity >= item.productId.stock}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.productId._id)}
                        >
                          <i className="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-end">
            <h4>Total: ${cart.total.toFixed(2)}</h4>
            <a
              href={`https://api.whatsapp.com/send?phone=233542447318&text=${encodeURIComponent(getWhatsAppMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              Discuss Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;