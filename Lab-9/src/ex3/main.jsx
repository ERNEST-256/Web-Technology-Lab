import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function CounterWebsite() {
  const [count, setCount] = useState(0);

  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 9
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 3</p>
        <h1 className="page-title">Counter Website</h1>
        <p className="page-copy">
          This page updates the counter value dynamically using the React
          <code> useState </code>
          hook and button click events.
        </p>
      </section>

      <section className="content-card counter-panel">
        <div className="counter-box">
          <p className="counter-label">Current Value</p>
          <h2>{count}</h2>
          <div className="counter-actions">
            <button type="button" onClick={() => setCount(count - 1)}>
              Decrease
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() => setCount(count + 1)}
            >
              Increase
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CounterWebsite />
  </React.StrictMode>
);
