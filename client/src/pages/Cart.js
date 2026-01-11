import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please log in to view your cart.");
      setLoading(false);
      return;
    }
    axios.get('/api/cart', { // Relative path
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load cart.");
        setLoading(false);
      });
  }, []);

  const handleWhatsAppCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    
    const itemsList = cart.items.map(item => 
      `- ${item.productId.name} (x${item.quantity}): $${(item.productId.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.total.toFixed(2);
    
    const message = `Hello! I would like to place an order:\n\n${itemsList}\n\n*Total: $${total}*\n\nPlease confirm my order.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/233542447318?text=${encodedMessage}`, "_blank");
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item._id}>
                <td>{item.productId.name}</td>
                <td>{item.quantity}</td>
                <td>${item.productId.price.toFixed(2)}</td>
                <td>${(item.productId.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <button className="btn btn-success btn-lg" onClick={handleWhatsAppCheckout}>
          <i className="bi bi-whatsapp me-2"></i> Checkout via WhatsApp
        </button>
      </div>
    </div>
  );
}

export default Cart;