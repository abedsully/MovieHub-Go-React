import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
  {
    path: "/profile/:id",
    exact: true,
    name: "Profile",
    component: React.lazy(() => import("./Profile")),
  },
];

export default routes;
