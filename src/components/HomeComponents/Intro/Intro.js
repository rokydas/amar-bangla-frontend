import React from "react";
import nature from "../../../Assets/images/nature.jpg";

const Intro = ( {homeContent} ) => {
  return (
    <div className="vertical-gap">
      <div className="container text-center">
        <h1 className="custom-headline">
          {homeContent.topHeadline}
        </h1>
        <p>
          {homeContent.topDescription}
        </p>
      </div>
    </div>
  );
};

export default Intro;
