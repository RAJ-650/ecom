import React, { useEffect, useState } from "react";
import { registerUser } from "../api"; // Import the API functions
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useUser } from "../UserContext"; // Import the custom hook

import "./Login.css";


const Register = () => {
  const { user, checkAuth } = useUser(); // Access user data

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Hook for navigation

    // Optional: Reset states when component mounts
    useEffect(() => {
      if (user) {
        navigate("/home");
      }
    }, [navigate, user]);

    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { id: Date.now(), name, email, password }; // Use Date.now() for a unique id

    try {
      const registeredUser = await registerUser(newUser);
      if (registeredUser) {
        console.log("Registered User:", registeredUser);
        setSuccessMessage("Registration successful! You can now log in."); // Set success message
        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="login-container">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}{" "}
        {/* Show success message */}
        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
