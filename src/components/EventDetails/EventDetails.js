import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  useEffect(() => {
    fetch(`http://localhost:5001/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.socialEvent);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  return (
    <div className="container my-5 text-center">
      <div className="row">
        <div className="col-md-6 m-auto">
          <img className="img-fluid" src={event.banner} alt="Event banner" />
          <h1 className="my-3 custom-headline">{event.title}</h1>
          <p><AiFillCalendar className="mb-1 me-2" />{`${day}-${month}-${year}`}</p>
          <p className="custom-para">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
