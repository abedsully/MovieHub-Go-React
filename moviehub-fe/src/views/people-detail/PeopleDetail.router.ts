import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
    {
        path: "/person/:id",
        exact: true,
        name: "People Detail",
        component: React.lazy(() => import("./PeopleDetail")), 
    }
];

export default routes