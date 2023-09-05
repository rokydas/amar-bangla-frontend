import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { RiAdminFill } from "react-icons/ri";
import { AiFillFileAdd, AiFillHome } from "react-icons/ai";
import { MdCardMembership, MdEventNote, MdOutlineManageAccounts } from "react-icons/md";
import { BsFillAwardFill, BsPersonFillAdd } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { SiSololearn } from "react-icons/si";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-end d-flex flex-column align-items-center">
          <div className="my-5">
            {dashboardRoutes.map((route) => (
              <DashboardItem
                key={route.link}
                route={route}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
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
  {
    name: "Manage Home Content",
    link: "manage-home",
    icon: AiFillHome
  },
  {
    name: "Manage About Content",
    link: "manage-about",
    icon: FcAbout
  },
  {
    name: "Manage Membership Content",
    link: "manage-membership",
    icon: MdCardMembership
  },
  {
    name: "Manage Learn Bengali",
    link: "manage-learn",
    icon: SiSololearn
  },
  {
    name: "Manage By Law",
    link: "manage-by-law",
    icon: BsFillAwardFill
  }
];