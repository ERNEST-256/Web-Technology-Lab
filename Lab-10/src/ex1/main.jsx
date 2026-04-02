import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const initialForm = {
  name: "",
  email: "",
  password: ""
};

function FormValidationWebsite() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values) {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setFormData(initialForm);
    setErrors({});
  }

  return (
    <main className="page-shell">
      <a className="back-link" href="/">
        Back to Lab 10
      </a>

      <section className="hero-card">
        <p className="tag">Exercise 1</p>
        <h1 className="page-title">Form Validation Website</h1>
        <p className="page-copy">
          This page uses controlled inputs, validation logic, and dynamic error
          messages before allowing form submission.
        </p>
      </section>

      <section className="content-card">
        <form className="form-card" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name ? <span className="error-text">{errors.name}</span> : null}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email ? <span className="error-text">{errors.email}</span> : null}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password ? (
              <span className="error-text">{errors.password}</span>
            ) : null}
          </label>

          <button type="submit">Submit Form</button>

          {submitted ? (
            <p className="success-banner">Form submitted successfully.</p>
          ) : null}
        </form>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormValidationWebsite />
  </React.StrictMode>
);
