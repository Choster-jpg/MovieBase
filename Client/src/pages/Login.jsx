import React, {lazy} from 'react';

import classes from './Login.module.scss'
import Logo from "../components/Logo.jsx";
import Button from "../components/UI/Button.jsx";
import {ArrowRightAlt} from "@mui/icons-material";
import {Link} from "@mui/material";

const SingIn = lazy(() => import('../components/SignIn.jsx'));
const SingUp = lazy(() => import('../components/SignUp.jsx'));

const Login = () => {
    return (
        <div className={classes.login}>
            <div className={classes.container}>
                <div className={classes.container__nav}>
                    <Logo/>
                </div>
                <div className={classes.container__tagline}>
                    <span>Start your movie adventure now.</span>
                </div>
                <div className={classes.container__panel}>
                    <span>Get involved with movie art around you.</span>
                    <div className={classes.button}>
                        <Button variant="contained" color="primary">
                            Sign in
                        </Button>
                    </div>
                    <div className={classes.textButton}>
                        <Link className={classes.textButton__link} underline="none" href="#">
                            Or Create Account
                            <ArrowRightAlt className={classes.textButton__icon}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;