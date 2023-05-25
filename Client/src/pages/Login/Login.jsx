import React, {lazy} from 'react';

import classes from './Login.module.scss'
import Welcome from "../../components/auth/Wellcome/Welcome.jsx";
import {useLocation} from "react-router-dom";

const SingIn = lazy(() => import('../../components/auth/SignIn/SignIn.jsx'));
const SingUp = lazy(() => import('../../components/auth/SignUp/SignUp.jsx'));

const Login = () => {

    const location = useLocation();
    const paths = location.pathname.split('/');
    console.log(paths[paths.length - 1]);

    switch (paths[paths.length - 1]) {
        case "index":
            return (<div className={classes.background}><Welcome/></div>);

        case "sign_up":
            return (<div className={classes.background}><SingUp/></div>);

        case "sign_in":
            return (<div className={classes.background}><SingIn/></div>);
    }
};

export default Login;