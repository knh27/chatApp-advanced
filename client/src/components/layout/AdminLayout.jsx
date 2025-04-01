import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { adminTabs } from "../../constants/adminTabs";
import { Link } from "react-router-dom";

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const logOutHandler = () => {};
  return (
    <div>
      <h3 className="text-2xl font-semibold text-center">Admin</h3>
      <div className="flex flex-col gap-8">
        {adminTabs.map((tab, index) => (
          <Link
            className={`flex flex-row items-center gap-4 ${
              location.pathname === tab.path
                ? "bg-gray-400 text-white"
                : "hover:bg-gray-300"
            }`}
            key={index}
            to={tab.path}
          >
            <div className="">{<tab.icon />}</div>
            <p>{tab.name}</p>
          </Link>
        ))}
        <div>
          <Link
            className={`flex flex-row items-center gap-4`}
            onClick={logOutHandler}
          >
            <div className="">{<ExitToAppIcon />}</div>
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
const isAdmin=true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  if(!isAdmin) return <Navigate to={"/admin"} />

  const handleMobile = () => setIsMobile((prev) => !prev);
  const handleClose = () => setIsMobile(false);
  return (
    <div className="grid min-h-screen gap-4 p-4 sm:grid-cols-1 md:grid-cols-[30%_70%]">
      <div className="block md:hidden fixed right-4 top-4">
        <button onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div className="hidden md:block bg-green-400 h-full">{<Sidebar />}</div>

      <div className="bg-gray-400 h-full">{children}</div>

      {isMobile && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 md:hidden"
          onClick={handleClose}
        >
          <div className="fixed top-0 left-0 h-full w-3/5 bg-amber-400 shadow-lg p-4">
            <div className="mt-8">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
