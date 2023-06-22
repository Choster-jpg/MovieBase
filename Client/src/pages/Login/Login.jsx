import React, {lazy} from 'react';

import classes from './Login.module.scss'
import Welcome from "../../components/auth/Wellcome/Welcome.jsx";
import {useLocation} from "react-router-dom";
import SignUp from "../../components/auth/SignUp/SignUp.jsx";
import SignIn from "../../components/auth/SignIn/SignIn.jsx";

/*const SignIn = lazy(() => import('../../components/auth/SignIn/SignIn.jsx'));
const SignUp = lazy(() => import('../../components/auth/SignUp/SignUp.jsx'));*/

const Login = () => {

    const location = useLocation();
    const paths = location.pathname.split('/');

    switch (paths[paths.length - 1]) {
        case "":
            return (<div className={classes.background}><Welcome/></div>);

        case "sign_up":
            return (<div className={classes.background}><SignUp/></div>);

        case "sign_in":
            return (<div className={classes.background}><SignIn/></div>);
    }
};

export default Login;