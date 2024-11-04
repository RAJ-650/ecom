import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the custom hook

import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import the bundled JS for Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Products from "./pages/Products";

import Product from "./pages/Product";
import Login from "./components/Login";
import Register from "./components/Register";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart"; // Import the Cart component
import Order from "./components/Orders";

import { logoutUser } from "./api";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
import Loading from "./components/Loading";

function App() {
  const { checkAuth, loading, updateLoading } = useUser(); // Access user data

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Simulate a data fetch or any asynchronous operation
    const timer = setTimeout(() => {
      updateLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="bg-purple1 text-white min-vh-1001">
        <Navbar handleLogout={handleLogout} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />{" "}
            {/* Add this line for Cart */}
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
