import React from "react";
import { Link } from "react-router-dom";

const DashboardItem = ({ route }) => {
  const { name, link } = route;

  return (
    <Link to={link} className="text-dark text-decoration-none">
      <p className="dashboard-item p-2">
        <i className="fa fa-calendar me-2" aria-hidden="true" /> {name}
      </p>
    </Link>
  );
};

export default DashboardItem;
