import React from 'react';

const LowStockAlert = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="alert alert-warning shadow-sm">
      <strong>⚠ Low Stock Alert</strong>
      <ul className="mb-0 mt-2 ps-3">
        {products.map(p => (
          <li key={p._id}>
            {p.name} – <strong>{p.stock} left</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LowStockAlert;