import React from "react";
import nature from "../../Assets/images/nature.jpg";
import Directors from "./Directors";

const About = () => {

  return (
    <div className="container">
      <div className="row my-5 d-flex align-items-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <img className="w-75" src={nature} alt="nature of manitoba" />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="custom-headline">Amar Bangla the Bengali Association of Manitoba Inc.</h1>
          <p>
            Amar Bangla the Bengali Association of Manitoba Inc. is a registered
            organization which main goals are to build a strong Bengali
            community, literature, and culture to make a positive impact in
            Canada. By educating its members to value their heritage, Amar
            Bangla helps its members feel more attuned to who they truly are as
            people. We provide everyone with a truly unique cultural experience.
            Finally, we aim to teach the next generation to take pride in their
            heritage and history.
          </p>
        </div>
      </div>

      <Directors />
    </div>
  );
};

export default About;
