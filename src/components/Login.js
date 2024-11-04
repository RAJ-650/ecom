import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the custom hook
import { loginUser } from "../api"; // Import the API functions
import "./Login.css";
const Login = () => {
  const { user, checkAuth } = useUser(); // Access user data

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [error, setError] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  // Optional: Reset states when component mounts
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      checkAuth();
      // Check if the user object is valid
      if (user && user.email) {
        console.log("Logged in User:", user);
        setUsername(user.email); // Assuming the user object has a `name` property
        setError(""); // Clear any previous error message
        // setSuccessMessage('Login successful!'); // Set success message
        navigate("/home");
      } else {
        // If user is null or doesn't have a name, treat it as invalid login
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error(err.message);
      setError("Invalid email or password."); // Set error message for invalid login
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="login-container">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}{" "}
        {/* Show error message */}
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}{" "}
        {/* Show success message */}
        {username && (
          <div className="alert alert-success mt-3">
            Welcome, {username}! {/* Display username on successful login */}
          </div>
        )}
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
