import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SidebarRoutes from "./SidebarRoutes";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState(""); // State for tracking active route
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location

    // Set active path based on current location
    useEffect(() => {
        setActivePath(location.pathname); // Update active path on location change
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleRouteChange = (path: string) => {
        setActivePath(path); // Set active path on route change
        setIsOpen(false); // Close the sidebar
        navigate(path); // Navigate to the new path
    };

    return (
        <div className="flex flex-col min-h-screen bg-customDarkColor">
            <button onClick={toggleMenu} className="md:hidden p-4 fixed top-0">
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <div className="bg-white rounded-lg p-1">
                        <Bars3Icon className="h-5 w-5 mt-5" />
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
                    <ul className="menu w-60 px-5  gap-1">
                        <Logo />

                        {SidebarRoutes.map((route, k) => (
                            <li className="py-1" key={k}>
                                <NavLink
                                    end
                                    to={route.path}
                                    onClick={() => handleRouteChange(route.path)} // Use the new handler
                                    className={({ isActive }) =>
                                        activePath === route.path || isActive
                                            ? "font-semibold bg-red-500 text-white"
                                            : "font-normal text-white bg-transparent"
                                    }
                                >
                                    {route.icon} {route.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="fixed bottom-[0]">
                    <p>MovieHub</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
