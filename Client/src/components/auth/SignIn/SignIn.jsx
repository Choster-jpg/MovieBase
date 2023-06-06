import React from 'react';

import classes from './SignIn.module.scss';
import {Divider, IconButton, Link} from "@mui/material";
import {East, Google} from "@mui/icons-material";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";
import {useForm} from "react-hook-form";

const SignIn = () => {

    const { handleSubmit, reset, control, formState: {errors} } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

    return (
        <div className={classes.background}>
            <AuthForm content={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Email" type="text" name="email" control={control} errors={errors}
                           rules={{
                               required: "Email is required.",
                               pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: 'Email is not valid'
                               }
                           }}/>
                    <Input type="password" label="Password" name="password"
                           control={control} errors={errors}
                           rules={{
                               required: "Password is required."
                           }}/>
                    <Button variant="contained" color="primary" sx={{marginTop: 4}} type="submit">Sign In</Button>
                    <div className={classes.dividerContainer}>
                        <Divider className={classes.divider} textAlign="center">or</Divider>
                    </div>
                    <Button variant="contained" startIcon={<Google/>}>
                        Sign in with google
                    </Button>
                    <div className={classes.linkContainer}>
                        <Link className={classes.link} href="#" underline="none">Forgot password?</Link>
                    </div>
                </form>
            } backIcon={<East/>} header={"Welcome back!"} subheader={"Continue your adventure."}/>
        </div>
    );
};

export default SignIn;