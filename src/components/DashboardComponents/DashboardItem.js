import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardItem = ({ route, selectedItem, setSelectedItem }) => {
  const { name, link, icon: Icon } = route;
  const navigate = useNavigate();

  console.log(link, selectedItem)

  const goToRoute = () => {
    navigate(link);
    setSelectedItem(link);
  };
  return (
    <div onClick={goToRoute} className="text-dark text-decoration-none">
      <div
        className={`${
          link === selectedItem ? "dashboard-item-selected" : "dashboard-item"
        } p-2 m-2`}
      >
        <Icon className="mb-1" /> {name}
      </div>
    </div>
  );
};

export default DashboardItem;

