import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/cast-detail/:id",
        exact: true,
        name: "Cast Detail",
        component: React.lazy(() => import("./CastDetail")), 
    }
];

export default routes