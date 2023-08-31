import React, { useState } from "react";
import emailjs from "emailjs-com";

import { useNavigate } from "react-router-dom";
emailjs.init("user_oz15Tk6nWHeMHzXbS2WJo");

const ContactUs = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("rokydasgmail", "template_2eqgegn", userInfo).then(
      (response) => {
        navigate("/");
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message is sent successfully");
      },
      (err) => {
        console.log("FAILED...", err);
        alert("Something went wrong. Please try again later");
      }
    );
  };

  const handleBlur = (e) => {
    const newUserInfo = { ...userInfo };
    newUserInfo[e.target.name] = e.target.value;
    setUserInfo(newUserInfo);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center py-5">Contact With Us</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <h5>Your Name</h5>
            <input
              onBlur={handleBlur}
              name="from_name"
              type="text"
              className="form-control"
              placeholder="Full Name"
              required
            />
            <h5 className="mt-3">Your Email address</h5>
            <input
              onBlur={handleBlur}
              type="email"
              name="from_email"
              className="form-control"
              placeholder="Email"
              required
            />
            <h5 className="mt-3">Your Message</h5>
            <textarea
              onBlur={handleBlur}
              rows="5"
              name="message"
              type="text"
              className="form-control"
              placeholder="Message"
              required
            />
            <button type="submit" className="custom-btn my-3">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
