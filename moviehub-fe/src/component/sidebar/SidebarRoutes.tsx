import { ISidebarRoutes } from "./ISidebarRoutes";
import { HomeIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

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
    path: "/search",
    icon: <MagnifyingGlassIcon className={iconClasses} />,
    name: "Search",
  },

  // Add Post
  {
    path: "/add-post",
    icon: <PlusCircleIcon className={iconClasses} />,
    name: "Add Post",
  },
];

export default SidebarRoutes;