import {
    home_route,
    movie_route,
    browse_movies_route,
    sign_in_route,
    sign_up_route,
} from './consts/routes/publicRoutes.js';

import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import BrowseMovies from "./pages/BrowseMovies.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

export const public_routes = [
    {
        path: home_route,
        pageComponent: Home,
    },
    /*{
        path: movie_route,
        pageComponent: Movie,
    },*/
    {
        path: sign_up_route,
        pageComponent: SignUp,
    },
    {
        path: sign_in_route,
        pageComponent: SignIn,
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