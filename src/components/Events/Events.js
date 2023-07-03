import React, { useEffect, useState } from "react";
import Event from "../CommonComponents/Event/Event";

const Events = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/event/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEventsData(data.socialEvents);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">Events</h1>
      <div className="row">
        {eventsData.map((event) => (
          <Event event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
