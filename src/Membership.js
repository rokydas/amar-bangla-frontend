import React, { useEffect, useState } from "react";

const Membership = () => {
  const [membership, setMembership] = useState({});
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/membership/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMembership(data.membership);
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
      <h1>{membership.title}</h1>
      <p>
        {membership.description}
      </p>
      <button className="custom-btn" onClick={onButtonClick}>
        Download Membership Form
      </button>
    </div>
  );
};

export default Membership;
