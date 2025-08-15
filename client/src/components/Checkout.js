import React from 'react';
import { Link } from 'react-router-dom';

function Checkout() {
  return (
    <div className="container mt-4" role="main">
      <h2>Checkout</h2>
      <p>Checkout functionality is not implemented yet. Please contact support for payment options.</p>
      <Link to="/cart" className="btn btn-primary">Back to Cart</Link>
    </div>
  );
}

export default Checkout;