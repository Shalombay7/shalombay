import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const checkResponse = await fetch('/api/admin/check', {
          credentials: 'include',
        });
        const checkData = await checkResponse.json();

        if (!checkData.isAdmin) {
          navigate('/admin/login');
          return;
        }

        const response = await fetch('/api/reviews', {
          credentials: 'include',
        });
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading reviews...</div>;

  return (
    <div className="admin-page">
      <h2>Reviews Management</h2>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <strong>{review.userName}</strong>
                <span className="review-rating">⭐ {review.rating}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
