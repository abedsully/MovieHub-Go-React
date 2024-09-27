import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/dashboard",
        exact: true,
        name: "Dashboard",
        component: React.lazy(() => import("./Dashboard")), 
    }
];

export default routes