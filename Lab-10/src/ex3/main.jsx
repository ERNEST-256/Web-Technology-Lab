import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function StatusMessage({ type, message }) {
  return <p className={`status-box ${type}`}>{message}</p>;
}

function UserCard({ user }) {
  return (
    <article className="post-card">
      <span className="pill">User #{user.id}</span>
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
    </article>
  );
}

function UserList({ users }) {
  if (users.length === 0) {
    return <StatusMessage type="empty" message="No user data is available." />;
  }

  return (
    <div className="post-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function ApiFetchWebsite() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Unable to fetch data from the server.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (fetchError) {
        setError(fetchError.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 10
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 3</p>
        <h1 className="page-title">API Fetch Website</h1>
        <p className="page-copy">
          This page fetches user data from an external API with{" "}
          <code>useEffect</code> and renders loading, error, and fetched-data
          states using React hooks.
        </p>
      </section>

      <section className="content-card">
        {loading ? <StatusMessage type="loading" message="Loading data..." /> : null}

        {!loading && error ? <StatusMessage type="error" message={error} /> : null}

        {!loading && !error ? <UserList users={posts} /> : null}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiFetchWebsite />
  </React.StrictMode>
);
