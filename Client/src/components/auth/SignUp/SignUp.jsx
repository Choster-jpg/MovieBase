import React, {useState} from 'react';

import classes from './SignUp.module.scss';
import {Google, West} from "@mui/icons-material";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import {Divider, IconButton, Link} from "@mui/material";
import AuthForm from "../AuthForm/AuthForm.jsx";
import { useForm } from 'react-hook-form';

const SignUp = () => {

    const { handleSubmit, reset, watch, control, formState: {errors} } = useForm({
        mode: 'onBlur',
        defaultValues: {
            nickname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }
    
    return (
        <div className={classes.image}>
            <AuthForm content={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" label="Nickname" name="nickname"
                           control={control} errors={errors}
                           rules={{
                               required: "Nickname is required.",
                               minLength: {
                                   value: 4,
                                   message: "Nickname must be at least 4 symbols"
                               },
                               maxLength: {
                                   value: 40,
                                   message: "Nickname must not be longer than 40 symbols"
                               }
                           }}/>
                    <Input type="text" label="Email" name="email"
                           control={control} errors={errors}
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
                    <Input type="password" label="Confirm Password" name="confirmPassword"
                           control={control} errors={errors}
                           rules={{
                               required: "Confirm password is required.",
                               validate: value => {
                                   if(watch('password') !== value)
                                   {
                                       return 'Passwords do not match';
                                   }
                               }
                           }}/>
                    <Button sx={{marginTop: 4}} variant="contained" type="submit">Sign Up</Button>
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
                </form>
            } header={"Create account."} subheader={""} />
        </div>
    );
};

export default SignUp;