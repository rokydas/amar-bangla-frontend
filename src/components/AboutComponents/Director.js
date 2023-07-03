import React from "react";
import { Link } from "react-router-dom";

const Director = ({ director }) => {
  return (
    <div className="col-md-4 col-lg-4">
      <div className="shadow m-3 p-3 text-center">
        <div className="d-flex justify-content-center mb-3">
          <img className="image-cropper" src={director.img} alt="" />
        </div>
        <h5>{director.name}</h5>
        <h6>{director.designation}</h6>
        <h6>Email: {director.email}</h6>
        <div className="d-flex justify-content-center">
          <i class="fa-brands fa-facebook"></i>
          <i className="fa fa-calendar me-2" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Director;
