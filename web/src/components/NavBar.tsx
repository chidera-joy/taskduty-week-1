import { MenuIcon, X } from "lucide-react";
import Ellipse from "../assets/Ellipse.svg"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getToken, removeToken } from "../api/api";
import LogoutModal from "./LogoutModal";

export const NavBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
     const [menuOpen, setMenuOpen] = useState(false);
     const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()));

     const [showLogoutModal, setShowLogoutModal] = useState(false);

     const handleLogout = () => {
       removeToken();
       setIsLoggedIn(false);
       setShowLogoutModal(false);
       setMenuOpen(false);
       navigate("/login");
     };
  return (
    <div className="p-5 md:px-20 py-5 font-signika flex justify-between items-center border-b border-b-surface">
      {/* left*/}
      <div
        className="flex space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className=" flex justify-center items-baseline bg-linear-to-bl from-dark-purple via-gray-blue to-violet w-10 h-10 rounded-br-[28.8px] rounded-tr-[28.8px] text-white text-5xl p-1 font-semibold">
          T
        </div>
        <p className="text-dark-purple text-[27.37px] font-semibold ">
          TaskDuty
        </p>
      </div>
      {/* right */}
      <div className="hidden md:flex items-center gap-10">
        {location.pathname !== "/all-tasks" && (
          <button
            onClick={() => navigate("/all-tasks")}
            className="text-dark-purple cursor-pointer hover:text-violet"
          >
            All Tasks
          </button>
        )}

        {location.pathname !== "/new-task" && (
          <button
            onClick={() => navigate("/new-task")}
            className="text-dark-purple cursor-pointer hover:text-violet"
          >
            New Task
          </button>
        )}

        {isLoggedIn ? (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-dark-purple cursor-pointer hover:text-violet"
          >
            Log Out
          </button>
        ) : (
          location.pathname !== "/login" && (
            <button
              onClick={() => navigate("/login")}
              className="text-dark-purple cursor-pointer hover:text-violet"
            >
              Login
            </button>
          )
        )}

        {/* profile picture */}
        <div className="relative">
          <div className="absolute left-6 rounded-full w-2 h-2 bg-violet  hover:scale-105 transition"></div>
          <img src={Ellipse} alt="avatar" className="w-8 h-8 rounded-full " />
        </div>
      </div>
      {/* hamburger */}
      <div className="flex relative md:hidden text-dark-purple">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen ? (
            <MenuIcon className="text-violet" />
          ) : (
            <X className="text-violet" />
          )}
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-4 bg-gray-100 rounded-2xl p-5 w-30 shadow-xl">
            <div className="flex flex-col gap-4 font-signika text-sm items-end">
              {location.pathname !== "/all-tasks" && (
                <button
                  onClick={() => navigate("/all-tasks")}
                  className="text-dark-purple"
                >
                  All Tasks
                </button>
              )}

              {location.pathname !== "/new-task" && (
                <button
                  onClick={() => navigate("/new-task")}
                  className="text-dark-purple"
                >
                  New Task
                </button>
              )}

              {isLoggedIn ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-dark-purple"
                >
                  Log Out
                </button>
              ) : (
                location.pathname !== "/login" && (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                    className="text-dark-purple"
                  >
                    Login
                  </button>
                )
              )}

              <div className="relative hover:scale-105 transition">
                <div className="absolute left-6 rounded-full w-2 h-2 bg-violet"></div>
                <img
                  src={Ellipse}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* logout modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};
