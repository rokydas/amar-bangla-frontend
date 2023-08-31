import React, { useContext } from "react";
import logo from "../../../Assets/images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  const handleLogOut = () => {
    setLoggedInUser({});
    localStorage.removeItem("auth-token");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="75" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/events">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/membership">
                Membership
              </Link>
            </li>
            <li>
              <Link className="nav-link active" to="/learn-bengali">
                Learn Bengali
              </Link>
            </li>
            <li>
              <Link className="nav-link active" to="/contact-us">
                Contact Us
              </Link>
            </li>

            {loggedInUser.isAdmin && (
              <>
                <li>
                  <Link className="nav-link active" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            {loggedInUser.name && (
              <>
                <li className="me-3 ms-2">{loggedInUser.name}</li>
                <li>
                  <button className="custom-btn" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
