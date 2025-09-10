import React from "react";

function ProductItem({ product, isFavorite, toggleFavorite }) {
  return (
    <div className="product-card">
      <div className="product-thumb">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <h3 className="product-title">{product.title}</h3>
      <div className="product-meta">
        <span className="price">${product.price}</span>
        <span className="rating">⭐ {product.rating}</span>
      </div>
      <button
        className={`fav-btn ${isFavorite(product) ? "active" : ""}`}
        onClick={() => toggleFavorite(product)}
      >
        ❤️
      </button>
    </div>
  );
}

export default ProductItem;
