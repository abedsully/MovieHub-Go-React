import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import {
    ArrowLeftEndOnRectangleIcon,
    KeyIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ApiMovieHub } from "../../constant/Api";
import { useUser } from "../../context/UserContext";

interface IProfileProp {
    image: string;
}

const iconClasses2 = `h-5 w-5`;

const ProfilePop = ({ image }: IProfileProp) => {
    const user = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogoutClick = async () => {
        try {
            const response = await axios.post(ApiMovieHub.logout, {}, { withCredentials: true });

            if (response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log("Error logging out");
        }
    };

    return (
        <div className="relative z-50">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-circle cursor-pointer btn-ghost"
                onClick={toggleDropdown}
            >
                <Avatar image={`${ApiMovieHub.profileImage}${user?.profile_picture}`} />
            </div>
            {isOpen && (
                <ul className="absolute right-0 z-50 menu p-2 shadow-lg bg-white rounded-box w-52">
                    <li>
                        <Link to="/dashboard" className="hover:bg-gray-200">
                            <KeyIcon className={iconClasses2} /> Change Password
                        </Link>
                    </li>
                    <li>
                        <Link to={`/profile/${user?.id}`} className="hover:bg-gray-200">
                            <UserIcon className={iconClasses2} /> My Profile
                        </Link>
                    </li>
                    <li>
                        <div className="hover:bg-red-500 hover:text-white cursor-pointer" onClick={handleLogoutClick}>
                            <ArrowLeftEndOnRectangleIcon className={iconClasses2} /> Logout
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfilePop;
