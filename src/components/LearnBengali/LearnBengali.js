import React, { useEffect, useState } from "react";

const LearnBengali = () => {

  const [learn, setLearn] = useState({})
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/learn-bengali/all`)
    .then(res => res.json())
    .then(data => setLearn(data.learnBengali))
  }, [])

  return (
    <div className="my-5">
      <div className="container text-center">
        <h1 className="custom-headline">{learn.title}</h1>
        <p className="custom-para">
          {learn.description}
        </p>
        <h3 className="custom-headline my-5">Learn Bengali from here</h3>
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
  );
};

export default LearnBengali;
