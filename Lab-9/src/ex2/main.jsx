import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const students = [
  {
    id: 1,
    name: "Ananya Rao",
    department: "Computer Science",
    marks: 92
  },
  {
    id: 2,
    name: "Rahul Mehta",
    department: "Information Technology",
    marks: 88
  },
  {
    id: 3,
    name: "Sneha Iyer",
    department: "Electronics",
    marks: 95
  }
];

function StudentCard({ name, department, marks }) {
  return (
    <article className="student-card">
      <h2>{name}</h2>
      <p>
        <span>Department</span>
        {department}
      </p>
      <p>
        <span>Marks</span>
        {marks}
      </p>
    </article>
  );
}

function StudentCardsWebsite() {
  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 9
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 2</p>
        <h1 className="page-title">Student Cards Website</h1>
        <p className="page-copy">
          This page reuses the same React component to display multiple student
          cards using props.
        </p>
      </section>

      <section className="content-card">
        <div className="card-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              department={student.department}
              marks={student.marks}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentCardsWebsite />
  </React.StrictMode>
);
