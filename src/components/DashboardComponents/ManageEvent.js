import React, { useEffect, useState } from "react";
import SingleManageEvent from "./SingleManageEvent.js";

const ManageEvent = () => {
  const [socialEvents, setSocialEvents] = useState([]);
  const authToken = localStorage.getItem("auth-token");
  const [needUpdate, setNeedUpdate] = useState(false);

  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/event/all`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSocialEvents(data.socialEvents);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, [needUpdate, authToken]);

  return (
    <div className="container">
      <h1 className="text-center my-3">Manage Events</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Banner</th>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {socialEvents.map((socialEvent) => (
            <SingleManageEvent
              key={socialEvent._id}
              socialEvent={socialEvent}
              needUpdate={needUpdate}
              setNeedUpdate={setNeedUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvent;