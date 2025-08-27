import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
      setMessage('Password reset link sent to your email.');
      setError('');
      toast.success('Password reset link sent!');
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 'Failed to send reset link.');
      setMessage('');
      toast.error(err.response?.data?.message || 'Failed to send reset link.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
        <p className="mt-3">
          Back to <Link to="/login">Login</Link>.
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;