import React from "react";
import { useNavigate } from "react-router-dom";
import "./Event.module.scss";

const Event = ({ event }) => {
  const navigate = useNavigate();
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
        <img className="img-fluid mb-4" src={event.banner} alt="" />
        <div className="mb-1">
          <i className="fa fa-calendar me-2" aria-hidden="true"></i>
          {`${day}-${month}-${year}`}
        </div>
        <h4>{event.title}</h4>
        <button
          onClick={() => navigate(`/event/${event._id}`)}
          className="custom-btn"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default Event;