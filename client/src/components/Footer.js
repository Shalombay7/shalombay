import React from "react";
import { Link } from "react-router-dom";
import "../styles/custom.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Custom Links */}
          <div className="col-md-4 mb-3">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-white text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p className="mb-1">Email: support@shalombay.com</p>
            <p className="mb-1">Phone: +1 (123) 456-7890</p>
            <p className="mb-1">Address: 123 Health St, Wellness City, USA</p>
          </div>
          {/* Premium Health Products Tag */}
          <div className="col-md-4 mb-3 text-center">
            <h5 className="premium-tag">Premium Health Products</h5>
            <p>Discover top-quality supplements for a healthier you!</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; 2025 ShalomBay Health Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
