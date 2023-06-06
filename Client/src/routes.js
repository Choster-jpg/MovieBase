import {
    home_route,
    movie_route,
    browse_movies_route, login_route, sign_up_route, sign_in_route, review_route,
} from './consts/routes/publicRoutes.js';

import Home from './pages/Home/Home.jsx';
import Movie from './pages/Movie/Movie.jsx';
import Login from "./pages/Login/Login.jsx";
import Review from "./pages/Review/Review.jsx";


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
    /*{
        path: browse_movies_route,
        pageComponent: BrowseMovies,
    }*/
]

export const auth_routes = [
    {

    }
]