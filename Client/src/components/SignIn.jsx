import React from 'react';

import classes from './SignIn.module.scss';
import {Divider, IconButton, Link} from "@mui/material";
import {East, Google} from "@mui/icons-material";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

const SignIn = () => {
    return (
        <div className={classes.background}>
            <div className={classes.panel}>
                <div className={classes.panel__container}>
                    <IconButton sx={{
                        color: '#272f32',
                        marginRight: -1
                    }}>
                        <East/>
                    </IconButton>
                    <h1>Welcome back!</h1>
                    <span>Continue your adventure.</span>
                </div>
            </div>
            <div className={classes.form}>
                <div className={classes.form__container}>
                    <Input label="Email" type="text"/>
                    <Input label="Password" type="password"/>
                    <Button variant="contained" color="primary" sx={{marginTop: 4}}>Sign In</Button>
                    <div className={classes.dividerContainer}>
                        <Divider className={classes.divider} textAlign="center">or</Divider>
                    </div>
                    <Button variant="contained" startIcon={<Google/>}>
                        Sign in with google
                    </Button>
                    <div className={classes.linkContainer}>
                        <Link className={classes.link} href="#" underline="none">Forgot password?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;