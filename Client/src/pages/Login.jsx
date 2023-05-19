import React, {lazy} from 'react';

import classes from './Login.module.scss'
import Logo from "../components/Logo.jsx";
import Button from "../components/UI/Button.jsx";
import {ArrowRightAlt} from "@mui/icons-material";

const SingIn = lazy(() => import('../components/SignIn.jsx'));
const SingUp = lazy(() => import('../components/SignUp.jsx'));

const Login = () => {
    return (
        <div className={classes.login}>
            <div className={classes.login__nav}>
                <Logo/>
            </div>
            <div className={classes.login__tagline}>
                <span>Start your movie adventure now.</span>
            </div>
            <div className={classes.login__panel}>
                <div className={classes.container}>
                    <span>Get involved with people and events around you.</span>
                    <div className={classes.button}>
                        <Button variant="contained" color="secondary">
                            Sign in
                        </Button>
                    </div>
                    <div className={classes.textButton}>
                        <Button variant="text">
                            Or Create Account
                            <ArrowRightAlt className={classes.textButton__icon}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;