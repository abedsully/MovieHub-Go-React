import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SidebarRoutes from "./SidebarRoutes";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRouteChange = (path: string) => {
    setActivePath(path);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-customDarkColor">
      <button onClick={toggleMenu} className="md:hidden p-4 fixed top-0">
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <div className="text-white rounded-lg p-1">
            <Bars3Icon className="h-5 w-5 mt-1.5" />
          </div>
        )}
      </button>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-10 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden `}
        onClick={toggleMenu}
      ></div>

      <div
        className={`text-white fixed left-0 top-0 w-60 h-full z-10 bg-customDarkColor shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col flex-grow">
          <ul className="menu w-60 px-5 gap-1">
          <Logo />
            <div className="flex flex-col lg:mt-[2rem] gap-4">


              {SidebarRoutes.map((route, k) => (
                <li className="py-1" key={k}>
                  <NavLink
                    end
                    to={route.path}
                    onClick={() => handleRouteChange(route.path)}
                    className={({ isActive }) =>
                      activePath === route.path || isActive
                        ? "font-semibold bg-customOrangeColor text-white"
                        : "font-normal text-white bg-transparent"
                    }
                  >
                    {route.icon} {route.name}
                  </NavLink>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <div className="fixed bottom-[0]">
          <p className="w-full flex justify-center font-semibold text-sm ml-[.6rem]">
            {" "}
            Copyright © {new Date().getFullYear()} Movie
            <span className="text-customOrangeColor">Hub</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
