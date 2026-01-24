import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Inquiry from Website*\n\nName: ${name}\nMessage: ${message}`;
    window.open(`https://wa.me/233542447318?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p className="text-center text-muted mb-4">
              Have questions? Send us a message directly on WhatsApp!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100 btn-lg">
                <i className="bi bi-whatsapp"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;