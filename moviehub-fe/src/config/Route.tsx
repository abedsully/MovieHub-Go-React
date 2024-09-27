import { IDefaultRouter } from "../interfaces/IDefaultRouter";

import routerRegister from "../views/register/Register.router";
import routerLogin from "../views/login/Login.router";
import routerDashboard from "../views/dashboard/Dashboard.router";

export const routes: IDefaultRouter[] = [
    ...routerRegister,
    ...routerLogin,
    ...routerDashboard
];

export default routes;
