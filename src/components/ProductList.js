import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products, isFavorite, toggleFavorite }) {
  if (!products.length) {
    return <div className="no-results">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default ProductList;
