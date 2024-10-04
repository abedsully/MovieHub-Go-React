import { ISidebarRoutes } from "./ISidebarRoutes";
import { HomeIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const iconClasses = `h-6 w-6`;

const SidebarRoutes: ISidebarRoutes[] = [
  // Dashboard
  {
    path: "/dashboard",
    icon: <HomeIcon className={iconClasses} />,
    name: "Dashboard",
  },

  // Search
  {
    path: "/my-favorite/:id",
    icon: <HeartIcon className={iconClasses} />,
    name: "My Favorites",
  },

  // Add Post
  {
    path: "/my-reviews/:id",
    icon: <HandThumbUpIcon className={iconClasses} />,
    name: "My Reviews",
  },
];

export default SidebarRoutes;