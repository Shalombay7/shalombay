import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <h2 className="fw-bold mb-3">About ShalomBay</h2>
          <p className="lead text-muted">
            Your trusted partner for premium health supplements and wellness products in Ghana.
          </p>
          <p>
            At ShalomBay, we believe that good health is the foundation of a happy life. 
            We are dedicated to providing authentic, high-quality vitamins, proteins, and 
            wellness supplements sourced from trusted manufacturers.
          </p>
          <p>
            Based in Kumasi, we serve customers across the region with fast delivery and 
            exceptional customer service. Our goal is to make premium health products 
            accessible and affordable for everyone.
          </p>
          <Link to="/products" className="btn btn-primary mt-3">Explore Our Products</Link>
        </div>
        <div className="col-md-6 text-center">
          <div style={{ fontSize: '10rem' }}>🏥</div>
        </div>
      </div>
    </div>
  );
}

export default About;