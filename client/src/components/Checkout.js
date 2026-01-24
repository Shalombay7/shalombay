import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCart, clearCart } from '../utils/cart';

function Checkout() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    const items = getCart();
    setCartItems(items.map(item => ({
      name: item.name,
      qty: item.quantity,
      price: item.price,
      productId: item.productId
    })));
  }, []);

  const placeOrder = async () => {
    const itemsList = cartItems.length > 0 
      ? cartItems.map(i => `• ${i.name} x${i.qty}`).join('\n') 
      : '• (No items found in cart)';

    const message = `🛒 *Order Received – ShalomBay*\n\nHi ${name},\n\nThank you for your order 🙏\nWe have received the details below:\n\n${itemsList}\n\n📍 Delivery Address: ${address}\n📞 Phone: ${phone}\n\nPlease reply *CONFIRM* to proceed.`;
    
    // Try to save order to DB (Guest Order)
    try {
      await axios.post(`${API_URL}/api/orders`, {
        customerName: name,
        phone,
        address,
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
      });
    } catch (err) {
      console.error("Could not save order to DB, proceeding to WhatsApp", err);
    }

    window.open(
      `https://wa.me/233542447318?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    clearCart();
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input className="form-control" placeholder="054xxxxxxx" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <textarea className="form-control" rows="3" placeholder="Kumasi, KNUST Campus..." value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <button className="btn btn-success btn-lg w-100" onClick={placeOrder}>
          <i className="bi bi-whatsapp"></i> Place Order via WhatsApp
        </button>
      </div>
    </div>
  );
}

export default Checkout;