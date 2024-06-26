import React, { useEffect, useState } from "react";
import Director from "./Director";

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/director/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          setDirectors(data.directors);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  return (
    <div className="mb-5">
      <h1 className="custom-headline text-center">Our Directors</h1>

      <div className="row">
        {directors.map((director) => (
          <Director director={director} />
        ))}
      </div>
    </div>
  );
};

export default Directors;
