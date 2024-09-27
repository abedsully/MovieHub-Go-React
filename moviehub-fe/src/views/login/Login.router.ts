import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: React.lazy(() => import("./Login")),
  },
];

export default routes;
