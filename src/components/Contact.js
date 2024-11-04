import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!"); // Replace with actual submission logic
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="page-title-section text-center mb-4">
        <h1 className="page-title animate__animated animate__fadeInDown">
          Contact Us
        </h1>
        <p className="page-subtitle animate__animated animate__fadeIn animate__delay-1s">
          Reach us for any query.
        </p>
        <nav aria-label="breadcrumb" className="breadcrumb-container">
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>
      </div>

      <div className="row mt-5">
        <div className="col-md-12 animate__animated animate__fadeInLeft animate__delay-4s">
          <form
            onSubmit={handleSubmit}
            className="animate__animated animate__fadeIn animate__delay-1s"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
