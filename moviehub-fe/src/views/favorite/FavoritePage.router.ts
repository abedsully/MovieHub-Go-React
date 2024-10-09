import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/favorite/:id",
        exact: true,
        name: "Favorite",
        component: React.lazy(() => import("./FavoritePage")), 
    }
];

export default routes