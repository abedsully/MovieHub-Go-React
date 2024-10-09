import { ISidebarRoutes } from "./ISidebarRoutes";
import { HomeIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const iconClasses = `h-6 w-6`;

const SidebarRoutes = (userId: string) :ISidebarRoutes[] => [
  // Dashboard
  {
    path: "/dashboard",
    icon: <HomeIcon className={iconClasses} />,
    name: "Dashboard",
  },

  // Search
  {
    path: `/favorite/${userId}`,
    icon: <HeartIcon className={iconClasses} />,
    name: "My Favorites",
  },

  // Add Post
  {
    path: `/reviews/${userId}`,
    icon: <HandThumbUpIcon className={iconClasses} />,
    name: "My Reviews",
  },
];

export default SidebarRoutes;