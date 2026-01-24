import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddReview = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || '';

  const submitReview = async () => {
    try {
      await axios.post(`${API_URL}/api/reviews`, {
        productId,
        userName: name || 'Anonymous',
        rating,
        comment
      });
      setComment('');
      toast.success('Review submitted!');
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review.');
    }
  };

  return (
    <div className="mt-4 p-3 bg-light rounded">
      <h6>Leave a Review</h6>
      <input className="form-control mb-2" placeholder="Your Name (Optional)" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="form-select mb-2" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
        {[5, 4, 3, 2, 1].map(num => (
          <option key={num} value={num}>{num} Stars</option>
        ))}
      </select>
      <textarea className="form-control mb-2" placeholder="Your experience..." value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className="btn btn-primary btn-sm" onClick={submitReview}>Submit Review</button>
    </div>
  );
};

export default AddReview;