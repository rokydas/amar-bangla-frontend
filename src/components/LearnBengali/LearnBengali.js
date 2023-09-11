import React, { useEffect, useState } from "react";

const LearnBengali = () => {
  const [learn, setLearn] = useState({});
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/learn-bengali/all`)
      .then((res) => res.json())
      .then((data) => setLearn(data.learnBengali));
  }, []);

  return (
    <div className="my-5" style={{ whiteSpace: "pre-line" }}>
      <div className="container">
        <h1 className="custom-headline text-center">{learn.title}</h1>
        <p className="custom-para" style={{ textAlign: "justify" }}>{learn.description}</p>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
              <img className="img-fluid mb-3" src={learn.firstImg} alt="" />
              <p style={{ textAlign: "justify" }}>{learn.firstDescription}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
              <img className="img-fluid mb-3" src={learn.secondImg} alt="" />
              <p style={{ textAlign: "justify" }}>{learn.secondDescription}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
              <img className="img-fluid mb-3" src={learn.thirdImg} alt="" />
              <p style={{ textAlign: "justify" }}>{learn.thirdDescription}</p>
            </div>
          </div>
        </div>
        <h3 className="custom-headline my-5 text-center">
          Learn Bengali from here
        </h3>
        <div className="text-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xEMYXNBROpw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LearnBengali;
