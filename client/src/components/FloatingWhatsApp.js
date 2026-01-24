import React from 'react';

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/233542447318"
    className="btn btn-success position-fixed bottom-0 end-0 m-3 rounded-circle shadow"
    style={{ width: 60, height: 60, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <i className="bi bi-whatsapp fs-3"></i>
  </a>
);

export default FloatingWhatsApp;