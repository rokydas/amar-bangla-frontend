import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SingleManageDirector = ({ director, needUpdate, setNeedUpdate }) => {
  const authToken = localStorage.getItem("auth-token");

  const handleDirectorDelete = () => {
    fetch(`http://localhost:5001/director/delete/${director._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          setNeedUpdate(!needUpdate);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <tr>
      <img width="70px" src={director.img} alt="directorImage" />
      <td>{director.name}</td>
      <td>{director.email}</td>
      <td>{director.designation}</td>
      <td>
        <Link className="text-dark" to={`update/${director._id}`}>
          <BiSolidEditAlt size={25} />
        </Link>
      </td>
      <td onClick={handleDirectorDelete}>
        <RiDeleteBin6Fill size={25} />
      </td>
    </tr>
  );
};

export default SingleManageDirector;
