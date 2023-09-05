import React, { useEffect, useState } from "react";
import nature from "../../Assets/images/nature.jpg";
import Directors from "./Directors";

const About = () => {

  const [aboutContent, setAboutContent] = useState({})
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/about/all`)
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setAboutContent(data.about)
      }
    })
  }, [])

  return (
    <div className="container">
      <div className="row my-5 d-flex align-items-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <img className="w-75" src={aboutContent.img} alt="nature of manitoba" />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="custom-headline">{aboutContent.headline}</h1>
          <p>
            {aboutContent.description}
          </p>
        </div>
      </div>

      <Directors />
    </div>
  );
};

export default About;
