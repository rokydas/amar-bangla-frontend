import React from "react";
import { Outlet } from "react-router-dom";
import DashboardItem from "./DashboardItem";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-end d-flex flex-column align-items-center">
          <div className="my-5">
            {dashboardRoutes.map((route) => (
              <DashboardItem key={route.link} route={route} />
            ))}
          </div>
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const dashboardRoutes = [
  {
    name: "Manage Admin",
    link: "manage-admin",
  },
  {
    name: "Add Event",
    link: "add-event",
  },
  {
    name: "Manage Event",
    link: "manage-event",
  },
  {
    name: "Add Director",
    link: "add-director",
  },
  {
    name: "Manage Director",
    link: "manage-director",
  },
];
