import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
