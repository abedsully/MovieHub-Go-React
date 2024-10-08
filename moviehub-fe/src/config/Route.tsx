import { IDefaultRouter } from "../interfaces/IDefaultRouter";

import routerRegister from "../views/register/Register.router";
import routerLogin from "../views/login/Login.router";
import routerDashboard from "../views/dashboard/Dashboard.router";
import routerMovieDetail from "../views/movie-detail/MovieDetail.router";
import routerSeriesDetail from "../views/series-detail/SeriesDetail.router";
import routerPeopleDetail from "../views/people-detail/PeopleDetail.router";
import routerCastDetail from "../views/cast-detail/CastDetail.router";
import routerReviewList from "../views/review-list/ReviewList.router";
import routerReviewUser from "../views/reviews/Reviews.router";
import routerProfile from "../views/profile/Profile.router"

export const routes: IDefaultRouter[] = [
    ...routerRegister,
    ...routerLogin,
    ...routerDashboard,
    ...routerMovieDetail,
    ...routerSeriesDetail,
    ...routerPeopleDetail,
    ...routerCastDetail,
    ...routerReviewList,
    ...routerReviewUser,
    ...routerProfile
];

export default routes;
