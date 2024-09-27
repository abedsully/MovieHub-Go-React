import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/register",
        exact: true,
        name: "Register",
        component: React.lazy(() => import("./Register")), 
    }
];

export default routes