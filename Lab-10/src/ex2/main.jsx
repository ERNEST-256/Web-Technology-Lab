import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function ListManagerWebsite() {
  const [items, setItems] = useState([
    { id: 1, name: "Notebook" },
    { id: 2, name: "Pen Set" },
    { id: 3, name: "Laptop Stand" }
  ]);
  const [newItem, setNewItem] = useState("");

  function handleAddItem(event) {
    event.preventDefault();

    if (!newItem.trim()) {
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: newItem.trim()
      }
    ]);
    setNewItem("");
  }

  function handleRemoveItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 10
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 2</p>
        <h1 className="page-title">Dynamic List Website</h1>
        <p className="page-copy">
          This page uses array state, list rendering, and unique keys to add and
          remove items dynamically.
        </p>
      </section>

      <section className="content-card">
        <form className="item-form" onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            placeholder="Enter a new item"
          />
          <button type="submit">Add Item</button>
        </form>

        {items.length === 0 ? (
          <p className="empty-state">No items available. Add a new item to begin.</p>
        ) : (
          <ul className="item-list">
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <button type="button" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListManagerWebsite />
  </React.StrictMode>
);
