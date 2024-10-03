import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
  {
    path: "/movies/:id",
    exact: true,
    name: "Movie Detail",
    component: React.lazy(() => import("./MovieDetail")),
  },
];

export default routes;
