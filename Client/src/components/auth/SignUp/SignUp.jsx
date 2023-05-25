import React, {useState} from 'react';

import classes from './SignUp.module.scss';
import {Google, West} from "@mui/icons-material";
import Input from "../../UI/Input.jsx";
import Button from "../../UI/Button.jsx";
import {Divider, IconButton, Link} from "@mui/material";
import {red} from "@mui/material/colors";
import AuthForm from "../AuthForm/AuthForm.jsx";

const SignUp = () => {
    return (
        <div className={classes.image}>
            <AuthForm content={
                <>
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
                            <Link className={classes.link} href="Client/src/components/auth/SignUp/SignUp.jsx#" underline="none">Sign in</Link>
                        </div>
                    </div>
                </>
            } header={"Create account."} subheader={""} />
        </div>
    );
};

export default SignUp;