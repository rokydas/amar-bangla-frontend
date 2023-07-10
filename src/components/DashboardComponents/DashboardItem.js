import React from "react";
import { Link } from "react-router-dom";

const DashboardItem = ({ route }) => {
  const { name, link, icon: Icon } = route;

  return (
    <Link to={link} className="text-dark text-decoration-none">
      <div className="dashboard-item p-2 m-2">
        <Icon className="mb-1" /> {name}
      </div>
    </Link>
  );
};

export default DashboardItem;
