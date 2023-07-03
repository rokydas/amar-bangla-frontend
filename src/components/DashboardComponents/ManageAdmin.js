import React, { useEffect, useState } from "react";
import SingleAdmin from "./SingleAdmin";

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    fetch("http://localhost:5001/auth/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAdmins(data.users));
  }, []);

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
            <SingleAdmin key={admin.email} admin={admin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmin;
