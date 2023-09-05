import React from "react";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Director = ({ director }) => {
  return (
    <div className="col-md-4 col-lg-4">
      <div className="shadow m-3 p-3 text-center">
        <div className="d-flex justify-content-center mb-3">
          <img className="image-cropper" src={director.img} alt="" />
        </div>
        <h4>{director.name}</h4>
        <h6>{director.designation}</h6>
        <h6>Profession: {director.profession}</h6>

        <div className="d-flex justify-content-center">
          <a href={`mailto:${director.email}`}>
            <MdEmail size={30} className="mb-1" />
          </a>
          <div style={{ marginEnd: "15px" }}></div>
          {director.facebook && (
            <>
              <a href={director.facebook}>
                <AiFillFacebook size={30} className="mb-1" />
              </a>
              <div style={{ marginEnd: "15px" }}></div>
            </>
          )}
          {director.twitter && (
            <>
              <a href={director.twitter}>
                <AiFillTwitterSquare size={30} className="mb-1" />
              </a>
              <div style={{ marginEnd: "15px" }}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Director;
