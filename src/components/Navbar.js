import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the custom hook

const Navbar = () => {
  const { user, logout } = useUser(); // Access user data

  const handleLogoutNav = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-purple">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            {/* <img src="logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> */}
            SR Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link text-white active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/aboutus">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact-us">
                  Contact Us
                </Link>
              </li>
            </ul>
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
            {!user ? (
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white active"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="dropdown">
                <div
                  className="btn text-white dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/images/profile.jpg" // Dummy profile image
                    alt="User"
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                  />
                  {user.name.substring(0, 30)}
                </div>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">   
                <li>
                <Link className="dropdown-item" to="/cart">
                  Cart
                </Link>
              </li>               
                  <li>
                    <a
                      className="dropdown-item"
                      href=""
                      onClick={handleLogoutNav}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
