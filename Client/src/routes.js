import {
    home_route,
    movie_route,
    login_route, sign_up_route, sign_in_route, review_route, browse_route,
} from './consts/routes/publicRoutes.js';

import {
    watchlist_route,
    account_route,
    new_review_route,
} from './consts/routes/authRoutes.js';

import Home from './pages/Home/Home.jsx';
import Movie from './pages/Movie/Movie.jsx';
import Login from "./pages/Login/Login.jsx";
import Review from "./pages/Review/Review.jsx";
import Watchlist from "./pages/Watchlist/Watchlist.jsx";
import Browse from "./pages/Browse/Browse.jsx";
import Account from "./pages/Account/Account.jsx";
import MyReview from "./pages/MyReview/MyReview.jsx";


export const public_routes = [
    {
        path: home_route,
        pageComponent: Home,
    },
    {
        path: movie_route,
        pageComponent: Movie,
    },
    {
        path: login_route,
        pageComponent: Login,
    },
    {
        path: sign_up_route,
        pageComponent: Login,
    },
    {
        path: sign_in_route,
        pageComponent: Login,
    },
    {
        path: review_route,
        pageComponent: Review,
    },
    {
        path: browse_route,
        pageComponent: Browse,
    },
]

export const auth_routes = [
    {
        path: watchlist_route,
        pageComponent: Watchlist,
    },
    {
        path: new_review_route,
        pageComponent: MyReview,
    },
    {
        path: account_route,
        pageComponent: Account,
    },
]