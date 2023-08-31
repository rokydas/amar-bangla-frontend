import React from "react";

const Membership = () => {
  const onButtonClick = () => {
    fetch("sample-pdf.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };

  return (
    <div className="text-center my-5 container">
      <h1>Membership</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus amet
        inventore numquam! Quas, corrupti.
      </p>
      <h3>Download the Membership Form</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
        cupiditate laudantium fugit iste ratione sunt provident rem non labore.
        Dignissimos quo officia minus? Veritatis culpa ipsam dignissimos totam
        corrupti, placeat voluptates et quam architecto alias, vel nihil ab
        aperiam est officia unde non eum odit, nisi sit laudantium pariatur.
        Possimus?
      </p>
      <button className="custom-btn" onClick={onButtonClick}>Download Form</button>
    </div>
  );
};

export default Membership;
