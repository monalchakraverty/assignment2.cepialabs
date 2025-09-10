import React from 'react';

export default function CategoryFilter({ categories = [], value, onChange }) {
  return (
    <div className="category-filter">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
       {categories.map((cat, index) => (
  <option key={index} value={cat.slug || cat}>
    {cat.name || cat}
  </option>
))}
      </select>
    </div>
  );
}