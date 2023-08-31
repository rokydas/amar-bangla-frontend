import React, { useEffect, useState } from "react";
import SingleAdmin from "./SingleAdmin";

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const authToken = localStorage.getItem("auth-token");

  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/auth/all`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAdmins(data.users));
  }, [authToken]);

  return (
    <div className="container">
      <h1 className="text-center my-3">Manage Admins</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <SingleAdmin key={admin._id} admin={admin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmin;
