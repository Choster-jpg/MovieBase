import {
    home_route,
    movie_route,
    browse_movies_route, login_route, sign_up_route, sign_in_route,
} from './consts/routes/publicRoutes.js';

import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';
import BrowseMovies from "./pages/BrowseMovies.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./components/auth/SignUp/SignUp.jsx";
import SignIn from "./components/auth/SignIn/SignIn.jsx";
import AuthForm from "./components/auth/AuthForm/AuthForm.jsx";


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
    }
    /*{
        path: browse_movies_route,
        pageComponent: BrowseMovies,
    }*/
]

export const auth_routes = [
    {

    }
]