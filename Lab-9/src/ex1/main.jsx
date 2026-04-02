import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function StudentProfile() {
  const name = "Karthik Srinivasan";
  const department = "B.Sc. Computer Science";
  const year = "III Year";
  const section = "Section A";

  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 9
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 1</p>
        <h1 className="page-title">Student Profile Website</h1>
        <p className="page-copy">
          This page displays a student profile using JSX, variables, and a
          functional React component.
        </p>
      </section>

      <section className="content-card">
        <div className="profile-card">
          <h2>{name}</h2>
          <p>
            <span>Department</span>
            {department}
          </p>
          <p>
            <span>Year</span>
            {year}
          </p>
          <p>
            <span>Section</span>
            {section}
          </p>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentProfile />
  </React.StrictMode>
);
