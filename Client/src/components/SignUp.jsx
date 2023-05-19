import React from 'react';

import classes from './SignUp.module.scss';
import {West} from "@mui/icons-material";

const SignUp = () => {
    return (
        <div className={classes.background}>
            <div className={classes.background__panel}>
                <div className={classes.background__panel__container}>
                    <West/>
                    <h1 className={classes.header}>Create Account.</h1>
                </div>
            </div>
        </div>
    );
};

export default SignUp;