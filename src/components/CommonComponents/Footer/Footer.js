import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className={`${styles["footer-links"]} container mt-5`}>
        <div className="row">
          <div className="col-md-3">
            <h4>Quick Links</h4>
            <li>
              <Link className="text-white text-decoration-none" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-white text-decoration-none" to="/about">About</Link>
            </li>
            <li>
              <Link className="text-white text-decoration-none" to="/events">Events</Link>
            </li>
            <li>
              <Link className="text-white text-decoration-none" to="/contact">Contact</Link>
            </li>
          </div>
          <div className="col-md-3">
            <h4>Other Pages</h4>
            <li>FAQ</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </div>
          <div className="col-md-3">
            <h4>Contact Info</h4>
            <li>Sunset Road ST.3319, Denpasar, Bali</li>
            <li>+62-361-234-4567</li>
            <li>chemiclab@domain.com</li>
            <li>Mon - Sat : 9:30AM to 7:00PM</li>
          </div>
          <div className="col-md-3">
            <h4>Make an Appointment</h4>
            <li>
              Getting an accurate diagnosis can be one of the most impactful
              experiences that you can have.
            </li>
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
