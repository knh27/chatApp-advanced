import React, { Suspense, useState,lazy } from "react";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Notifications as NotificationIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const SearchDialog=lazy(()=>import("./../specific/Search"))
const NotificationDialog=lazy(()=>import("./../specific/Notifications"))
const NewGroup=lazy(()=>import("./../specific/NewGroup"))

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const navigateToGroup = () => navigate("/groups");

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };

  const logOutHandler = () => {};

  return (
    <header className="flex items-center justify-between bg-orange-500 p-4">
      <div className="flex items-center">
        <span className="hidden md:block text-white font-bold text-lg">
          Chat-Application
        </span>
        <button className="block md:hidden text-white" onClick={handleMobile}>
          <MenuIcon />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-white" onClick={openSearchDialog}>
          <SearchIcon />
        </button>

        <button className="text-white" onClick={openNewGroup}>
          <AddIcon />
        </button>

        <button className="text-white" onClick={navigateToGroup}>
          <GroupIcon />
        </button>

        <button className="text-white" onClick={openNotification}>
          <NotificationIcon />
        </button>

        <button className="text-white" onClick={logOutHandler}>
          <LogoutIcon />
        </button>
      </div>

      {
        isSearch && (
            <Suspense fallback={<div>loading</div>}>
                <SearchDialog />
            </Suspense>
        )
      }

      {
        isNotification && (
            <Suspense fallback={<div>loading</div>}>
                <NotificationDialog />
            </Suspense>
        )
      }
      {
        isNewGroup && (
            <Suspense fallback={<div>loading</div>}>
                <NewGroup />
            </Suspense>
        )
      }

    </header>
  );
};

export default Header;
