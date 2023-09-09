import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const apiUrl = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    fetch(`${apiUrl}/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.socialEvent);
          console.log(data.socialEvent);
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
          <p>
            <AiFillCalendar className="mb-1 me-2" />
            {`${day}-${month}-${year}`}
          </p>
          <p className="custom-para">{event.description}</p>
        </div>
      </div>
      <div className="row">
        {event?.gallery?.map((img) => (
          <div className="col-md-4">
            <div className="shadow p-3">
              <img src={img} className="img-fluid" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
