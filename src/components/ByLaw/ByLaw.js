import React, { useEffect, useState } from "react";

const ByLaw = () => {
  const [byLaw, setByLaw] = useState({});
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/by-law/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          setByLaw(data.byLaw);
        }
      });
  }, []);

  const onButtonClick = () => {
    fetch("Membership-Form.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Membership-Form.pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="text-center my-5 container">
      <h1>{byLaw.title}</h1>
      <p>
        {byLaw.description}
      </p>
      <button className="custom-btn" onClick={onButtonClick}>
        Download By-Law
      </button>
    </div>
  );
};

export default ByLaw;
