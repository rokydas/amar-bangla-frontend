import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import logo from "../../../Assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className={`${styles["footer-links"]} container mt-5`}>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center">
            <img src={logo} width="200px" alt="" />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <div>
              <h4>Quick Links</h4>
              <li>
                <Link className="text-white text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/events">
                  Events
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/membership"
                >
                  Membership
                </Link>
              </li>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <div>
              <h4>Other Pages</h4>
              <li>FAQ</li>
              <li>Blog</li>
              <li>Privacy Policy</li>
              <li>Terms & Condition</li>
            </div>
          </div>
        </div>
        <p className="text-center mt-5">
          Copyright © {new Date().getFullYear()} Amar Bangla
        </p>
      </div>
    </footer>
  );
};

export default Footer;
