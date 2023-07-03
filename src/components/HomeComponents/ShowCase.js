import React from "react";
import pic1 from "../../Assets/images/manitoba1.jpg";
import pic2 from "../../Assets/images/manitoba2.jpg";

const ShowCase = () => {
  return (
    <div className="container">
      <div className="row vertical-gap">
        <div className="col-md-6 d-flex justify-content-center">
          <img src={pic1} alt="" className="w-75" />
        </div>
        <div className="col-md-6">
          <h2 className="custom-headline">Show Case headline 1</h2>
          <p className="custom-para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            qui atque doloremque ratione vero praesentium minima asperiores
            impedit distinctio, cumque necessitatibus corrupti ipsum ex eos
            incidunt, minus corporis expedita quis quam ea laboriosam delectus
            fugiat sed iusto. Accusamus a totam expedita iure autem ad debitis
            asperiores, quod sit, ipsum quos.
          </p>
        </div>
      </div>
      <div className="row vertical-gap">
        <div className="col-md-6">
          <h2 className="custom-headline">Show Case headline 1</h2>
          <p className="custom-para">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            qui atque doloremque ratione vero praesentium minima asperiores
            impedit distinctio, cumque necessitatibus corrupti ipsum ex eos
            incidunt, minus corporis expedita quis quam ea laboriosam delectus
            fugiat sed iusto. Accusamus a totam expedita iure autem ad debitis
            asperiores, quod sit, ipsum quos.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img src={pic2} alt="" className="w-75" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
