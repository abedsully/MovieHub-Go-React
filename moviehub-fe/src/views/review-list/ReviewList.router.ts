import React from "react";
import { IDefaultRouter } from "../../interfaces/IDefaultRouter";

const routes: IDefaultRouter[] = [
  {
    path: "/review-list/:id",
    exact: true,
    name: "Movie Detail",
    component: React.lazy(() => import("./ReviewList")),
  },
];

export default routes;
