import React from 'react';

const HeroSection = () => (
  <div className="p-4 p-md-5 mb-5 bg-primary text-white rounded-3 text-center">
    <h1 className="display-6 fw-bold">
      Premium Health Supplements You Can Trust
    </h1>

    <p className="lead mt-3">
      Vitamins, protein, and wellness products — delivered fast in Ghana.
    </p>

    <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
      <a href="#featured-products" className="btn btn-light btn-lg">
        Shop Products
      </a>

      <a
        href="https://wa.me/233542447318"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success btn-lg"
      >
        Order on WhatsApp
      </a>
    </div>

    <div className="mt-3 small">
      ✔ Authentic • ✔ Affordable • ✔ Trusted in Kumasi
    </div>
  </div>
);

export default HeroSection;