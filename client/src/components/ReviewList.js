import React from 'react';

const ReviewList = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">No reviews yet.</p>;
  }

  return (
    <div className="mt-4">
      <h5>Customer Reviews</h5>

      {reviews.map((review, index) => (
        <div key={index} className="border-bottom py-3">
          <strong>{review.user || review.userName || 'Anonymous'}</strong>
          <div className="text-warning">
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
          </div>
          <p className="mb-1">{review.comment}</p>
          <small className="text-muted">
            {new Date(review.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;