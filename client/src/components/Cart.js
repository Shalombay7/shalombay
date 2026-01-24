import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/custom.css";
import { getCart } from "../utils/cart";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
    const t = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(t);
    
    const handleUpdate = () => {
      const updatedItems = getCart();
      setCartItems(updatedItems);
      setTotal(updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    };
    
    window.addEventListener('cartUpdated', handleUpdate);
    return () => window.removeEventListener('cartUpdated', handleUpdate);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                  <div className="text-muted small">Quantity: {item.quantity}</div>
                </div>
                <span>GHS {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h4>Total: GHS {total.toFixed(2)}</h4>
          <Link to="/checkout" className="btn btn-primary mt-3">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
