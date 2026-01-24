import React from 'react';

const SpecialOffers = ({ ads, defaultImage, onInquire }) => {
  if (!ads || ads.length === 0) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-3">🔥 Special Offers</h3>
      <div className="row">
        {ads.map(ad => (
          <div key={ad._id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={ad.imageUrl || defaultImage}
                className="card-img-top"
                alt={ad.title || 'Special Offer'}
                onError={(e) => (e.target.src = defaultImage)}
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{ad.title || 'Special Offer'}</h5>
                <p className="card-text">{ad.description}</p>
                <button
                  className="btn btn-success"
                  onClick={() => onInquire(ad)}
                >
                  <i className="bi bi-whatsapp"></i> Inquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;