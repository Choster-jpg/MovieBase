import React from 'react';
import Logo from "../../UI/Logo/Logo.jsx";
import Button from "../../UI/Button/Button.jsx";
import {Divider, Link} from "@mui/material";
import {ArrowRightAlt} from "@mui/icons-material";

import classes from './Welcome.module.scss';
import {useNavigate} from "react-router-dom";

import { setSelectedIndex } from "../../../store/slices/navbarStateSlice.js";
import {useDispatch} from "react-redux";

const Welcome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignInClick = () => {
        navigate('/sign_in');
    }

    const handleWithoutLoginClick = () => {
        dispatch(setSelectedIndex({value: 3}));
        navigate('/browse');
    }

    return (
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
                    <Button variant="contained" color="primary" onClick={handleSignInClick}>
                        Sign in
                    </Button>
                    <div className={classes.dividerContainer}>
                        <Divider className={classes.divider} textAlign="center">or</Divider>
                    </div>
                    <Button variant="contained" onClick={handleWithoutLoginClick}>
                        Continue without login
                    </Button>
                </div>
                <div className={classes.textButton}>
                    <Link className={classes.textButton__link} underline="none" href="/sign_up" >
                        Or Create Account
                        <ArrowRightAlt className={classes.textButton__icon}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;