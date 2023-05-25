import React from 'react';

import classes from './SignIn.module.scss';
import {Divider, IconButton, Link} from "@mui/material";
import {East, Google} from "@mui/icons-material";
import Input from "../../UI/Input.jsx";
import Button from "../../UI/Button.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";

const SignIn = () => {
    return (
        <div className={classes.background}>
            <AuthForm content={
                <>
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
                        <Link className={classes.link} href="Client/src/components/auth/SignIn/SignIn.jsx#" underline="none">Forgot password?</Link>
                    </div>
                </>
            } backIcon={<East/>} header={"Welcome back!"} subheader={"Continue your adventure."}/>
        </div>
    );
};

export default SignIn;