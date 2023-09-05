import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SingleManageEvent = ({ socialEvent, needUpdate, setNeedUpdate }) => {
  const authToken = localStorage.getItem("auth-token");
  const apiUrl = process.env.REACT_APP_API_ROOT;

  const date = new Date(socialEvent.date);
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();

  const handleEventDelete = () => {
    fetch(`${apiUrl}/event/delete/${socialEvent._id}`, {
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
      <td>
        <img width="70px" src={socialEvent.banner} alt="SocialEventImage" />
      </td>
      <td>{socialEvent.title}</td>
      <td>{`${day}-${month}-${year}`}</td>
      <td>{socialEvent.description}</td>
      <td>
        <Link className="text-dark" to={`update/${socialEvent._id}`}>
          <BiSolidEditAlt size={25} />
        </Link>
      </td>
      <td onClick={handleEventDelete}>
        <RiDeleteBin6Fill size={25} />
      </td>
    </tr>
  );
};

export default SingleManageEvent;
