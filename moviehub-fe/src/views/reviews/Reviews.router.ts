import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
  {
    path: "/reviews/:id",
    exact: true,
    name: "User Review",
    component: React.lazy(() => import("./Reviews")),
  },
];

export default routes;