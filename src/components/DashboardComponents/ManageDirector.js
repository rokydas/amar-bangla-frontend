import React, { useEffect, useState } from "react";
import SingleManageDirector from "./SingleManageDirector";

const ManageDirector = () => {
  const [directors, setDirectors] = useState([]);
  const authToken = localStorage.getItem("auth-token");
  const [needUpdate, setNeedUpdate] = useState(false);

  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/director/all`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDirectors(data.directors);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, [needUpdate]);

  return (
    <div className="container">
      <h1 className="text-center my-3">Manage Directors</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>email</th>
            <th>Designation</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((director) => (
            <SingleManageDirector
              key={director.email}
              director={director}
              needUpdate={needUpdate}
              setNeedUpdate={setNeedUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDirector;
