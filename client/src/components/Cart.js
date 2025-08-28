import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/custom.css";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your cart.");
      return;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setCart(response.data))
      .catch(err => {
        setError("Failed to load cart.");
        toast.error("Failed to load cart.");
      });
  }, []);

  const handleWhatsAppCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const message = `Order Details:\n${cart.items.map(item => `${item.product.name} - Quantity: ${item.quantity} - Price: $${item.product.price.toFixed(2)}`).join("\n")}\nTotal: $${cart.total.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+1234567890?text=${encodedMessage}`, "_blank");
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!cart) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.items.map(item => (
              <li key={item._id} className="list-group-item">
                {item.product.name} - Quantity: {item.quantity} - ${item.product.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ${cart.total.toFixed(2)}</h4>
          <button className="btn btn-primary" onClick={handleWhatsAppCheckout}>
            Discuss Order on WhatsApp
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
