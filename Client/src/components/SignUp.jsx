import React, {useState} from 'react';

import classes from './SignUp.module.scss';
import {Google, West} from "@mui/icons-material";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import {Divider, IconButton, Link} from "@mui/material";
import {red} from "@mui/material/colors";

const SignUp = () => {
    return (
        <div className={classes.image}>
            <div className={classes.background}>
                <div className={classes.panel}>
                    <div className={classes.panel__container}>
                        <IconButton sx={{
                            color: '#272f32',
                            marginLeft: -1,
                            marginTop: -2
                        }}>
                            <West/>
                        </IconButton>
                        <h1>Create Account.</h1>
                    </div>
                </div>
                <div className={classes.form}>
                    <div className={classes.form__container}>
                        <Input type="text" label="Full Name"/>
                        <Input type="text" label="Nickname"/>
                        <Input type="text" label="Email"/>
                        <Input type="password" label="Password"/>
                        <Input type="password" label="Confirm Password"/>
                        <Button sx={{marginTop: 4}} variant="contained">Sign Up</Button>
                        <div className={classes.dividerContainer}>
                            <Divider className={classes.divider} textAlign="center">or</Divider>
                        </div>
                        <Button variant="contained" startIcon={<Google/>}>
                            Sign up with google
                        </Button>
                        <div className={classes.container}>
                            <span>Have an account?</span>
                            <div className={classes.linkContainer}>
                                <Link className={classes.link} href="#" underline="none">Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;