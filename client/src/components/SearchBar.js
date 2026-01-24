import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    className="form-control form-control-lg mb-4"
    placeholder="Search vitamins, protein, supplements..."
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;