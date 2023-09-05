import React from "react";

const ShowCase = ({homeContent}) => {
  return (
    <div className="container">
      <div className="row vertical-gap">
        <div className="col-md-6 d-flex justify-content-center">
          <img src={homeContent.leftImg} alt="" className="w-75" />
        </div>
        <div className="col-md-6">
          <h2 className="custom-headline">{homeContent.rightHeadline}</h2>
          <p className="custom-para">
            {homeContent.rightDescription}
          </p>
        </div>
      </div>
      <div className="row vertical-gap">
        <div className="col-md-6">
          <h2 className="custom-headline">{homeContent.leftHeadline}</h2>
          <p className="custom-para">
            {homeContent.leftDescription}
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img src={homeContent.rightImg} alt="" className="w-75" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
