import React from "react";
import { Outlet } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { RiAdminFill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-end d-flex flex-column align-items-center">
          <div className="my-5">
            {dashboardRoutes.map((route) => (
              <DashboardItem key={route.link} route={route} icon={route.icon} />
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
    icon: RiAdminFill,
  },
  {
    name: "Add Event",
    link: "add-event",
    icon: AiFillFileAdd,
  },
  {
    name: "Manage Event",
    link: "manage-event",
    icon: MdEventNote,
  },
  {
    name: "Add Director",
    link: "add-director",
    icon: BsPersonFillAdd,
  },
  {
    name: "Manage Director",
    link: "manage-director",
    icon: MdOutlineManageAccounts,
  },
];
