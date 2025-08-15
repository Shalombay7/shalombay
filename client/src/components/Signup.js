import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5009/api/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('userId', response.data.userId);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.response ? error.response.data.message : 'Registration failed.');
      toast.error(error.response ? error.response.data.message : 'Registration failed.');
    }
  };

  return (
    <div className="container mt-4" role="main">
      <h2>Sign Up</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            aria-describedby="nameHelp"
          />
          <div id="nameHelp" className="form-text">Enter your full name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;