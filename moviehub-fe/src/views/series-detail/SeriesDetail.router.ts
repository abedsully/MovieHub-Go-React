import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/tv/:id",
        exact: true,
        name: "Series Detail",
        component: React.lazy(() => import("./SeriesDetail")), 
    }
];

export default routes