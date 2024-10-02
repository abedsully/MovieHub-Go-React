import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import {
    ArrowLeftEndOnRectangleIcon,
    KeyIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

interface IProfileProp {
    image: string;
}

const iconClasses2 = `h-5 w-5`;

const ProfilePop = ({ image }: IProfileProp) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative z-50">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-circle cursor-pointer btn-ghost"
                onClick={toggleDropdown}
            >
                <Avatar image={image} />
            </div>
            {isOpen && (
                <ul className="absolute right-0 z-50 menu p-2 shadow-lg bg-white rounded-box w-52 ">
                    <li>
                        <Link to="/dashboard" className="hover:bg-gray-200">
                            <KeyIcon className={iconClasses2} /> Change Password
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/1" className="hover:bg-gray-200">
                            <UserIcon className={iconClasses2} /> My Profile
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:bg-red-500 hover:text-white" to="/dashboard">
                            <ArrowLeftEndOnRectangleIcon className={iconClasses2} /> Logout
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfilePop;
