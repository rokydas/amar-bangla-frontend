import React from "react";

const Intro = ( {homeContent} ) => {
  return (
    <div className="vertical-gap">
      <div className="container text-center">
        <h1 className="custom-headline">
          {homeContent.topHeadline}
        </h1>
        <p style={{textAlign: "justify"}}>
          <pre>{homeContent.topDescription}</pre>
        </p>
      </div>
    </div>
  );
};

export default Intro;
