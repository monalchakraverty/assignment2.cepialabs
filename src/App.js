import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    setLoading(true);
    setError("");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, category, skip, limit]);

  const toggleFavorite = (product) => {
    let updated;
    if (favorites.find((f) => f.id === product.id)) {
      updated = favorites.filter((f) => f.id !== product.id);
    } else {
      updated = [...favorites, product];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (product) => {
    return favorites.some((f) => f.id === product.id);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header className="app-header">
        <h1>Product Explorer</h1>
        <div className="header-actions">
          <button className="btn small" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner" /> Loading products...
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ProductList
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />

      {}
      {!search && !category && (
        <div className="pagination">
          <button
            className="btn small"
            onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
            disabled={skip === 0}
          >
            Previous
          </button>
          <button
            className="btn small"
            onClick={() => setSkip((prev) => prev + limit)}
          >
            Next
          </button>
        </div>
      )}

      {}
      {favorites.length > 0 && (
        <div className="favorites">
          <h2>Favorites</h2>
          <div className="favorite-grid">
            {favorites.map((fav) => (
              <div key={fav.id} className="fav-card">
                <img src={fav.thumbnail} alt={fav.title} />
                <p>{fav.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>Product Explorer made by Monal</p>
      </footer>
    </div>
  );
}

export default App;
