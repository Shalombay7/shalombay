import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Health Shop</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={userId ? '/profile' : '/login'}>
                  {userId ? 'Profile' : 'Login'}
                </Link>
              </li>
              {!userId && (
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Health Shop</h5>
              <p>Your trusted source for high-quality vitamins and supplements.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/cart" className="text-white">Cart</Link></li>
                <li><Link to={userId ? '/profile' : '/login'} className="text-white">
                  {userId ? 'Profile' : 'Login'}
                </Link></li>
                {!userId && <li><Link to="/signup" className="text-white">Sign Up</Link></li>}
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>
                Email: support@healthshop.com<br />
                Phone: (123) 456-7890<br />
                Address: 123 Wellness St, Health City
              </p>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Health Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;