import React from 'react';
import Logo from "../../Logo.jsx";
import Button from "../../UI/Button.jsx";
import {Link} from "@mui/material";
import {ArrowRightAlt} from "@mui/icons-material";

import classes from './Welcome.module.scss';

const Welcome = () => {
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
    );
};

export default Welcome;