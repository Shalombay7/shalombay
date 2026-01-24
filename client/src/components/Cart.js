import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/custom.css";
import { getCart, loadCart } from "./CartUtils";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [phoneToLoad, setPhoneToLoad] = useState('');

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

  const handleLoadCart = async () => {
    const success = await loadCart(phoneToLoad);
    if (success) {
      toast.success("Cart restored successfully!");
      setPhoneToLoad('');
    } else {
      toast.info("No saved cart found for this number.");
    }
  };

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

      <div className="mt-5 p-4 bg-light rounded">
        <h5>Switching devices?</h5>
        <p className="text-muted small">Enter your phone number to restore a saved cart.</p>
        <div className="d-flex gap-2" style={{ maxWidth: '400px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter phone number"
            value={phoneToLoad}
            onChange={(e) => setPhoneToLoad(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={handleLoadCart}>
            Load
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
