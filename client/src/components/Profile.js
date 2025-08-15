import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.error('Please log in to view your profile.');
      navigate('/login');
      return;
    }
    axios.get(`http://localhost:5009/api/users/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="container mt-4" role="main">
      <h2>Profile</h2>
      {loading ? (
        <div className="text-center" aria-busy="true">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
          <Link to="/" className="btn btn-secondary ms-2">Back to Home</Link>
        </>
      )}
    </div>
  );
}

export default Profile;