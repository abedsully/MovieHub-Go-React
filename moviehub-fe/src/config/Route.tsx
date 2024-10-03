import { IDefaultRouter } from "../interfaces/IDefaultRouter";

import routerRegister from "../views/register/Register.router";
import routerLogin from "../views/login/Login.router";
import routerDashboard from "../views/dashboard/Dashboard.router";
import routerMovieDetail from "../views/movie-detail/MovieDetail.router";
import routerSeriesDetail from "../views/series-detail/SeriesDetail.router";
import routerPeopleDetail from "../views/people-detail/PeopleDetail.router";

export const routes: IDefaultRouter[] = [
    ...routerRegister,
    ...routerLogin,
    ...routerDashboard,
    ...routerMovieDetail,
    ...routerSeriesDetail,
    ...routerPeopleDetail
];

export default routes;
