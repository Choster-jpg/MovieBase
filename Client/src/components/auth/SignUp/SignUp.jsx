import React, {useEffect, useState} from 'react';

import classes from './SignUp.module.scss';
import {Google, West} from "@mui/icons-material";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import {CircularProgress, Divider, IconButton, Link} from "@mui/material";
import AuthForm from "../AuthForm/AuthForm.jsx";
import { useForm } from 'react-hook-form';

import { register, resetRegistered } from '../../../store/slices/userDataSlice.js';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, loading, registered } = useSelector(state => state.userData);

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
        reset();
        dispatch(register(data));
    }

    useEffect(() => {
        dispatch(resetRegistered());
    }, [])

    useEffect(() => {
        console.log(error);
    }, [error]);

    useEffect(() => {
        if(!loading && registered) navigate('/login/sign_in');
    }, [loading])
    
    return (
        <div className={classes.image}>
            <AuthForm content={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" label="Full Name" name="full_name"
                           control={control} errors={errors}
                           rules={{
                               required: "Full Name is required.",
                               minLength: {
                                   value: 4,
                                   message: "Full Name must be at least 4 symbols"
                               },
                               maxLength: {
                                   value: 25,
                                   message: "Full Name must not be longer than 25 symbols"
                               }
                           }}/>
                    <Input type="text" label="Nickname" name="nickname"
                           control={control} errors={errors}
                           rules={{
                               required: "Nickname is required.",
                               minLength: {
                                   value: 4,
                                   message: "Nickname must be at least 4 symbols"
                               },
                               maxLength: {
                                   value: 25,
                                   message: "Nickname must not be longer than 25 symbols"
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
                    <Button sx={{marginTop: 4}} variant="contained" type="submit">
                        {
                            !loading ? 'Sign Up' : <CircularProgress color='inherit'/>
                        }
                    </Button>
                    {/*
                        <div className={classes.dividerContainer}>
                            <Divider className={classes.divider} textAlign="center">or</Divider>
                        </div>
                        <Button variant="contained" startIcon={<Google/>}>
                        Sign up with google
                        </Button>
                    */}
                    <div className={classes.container}>
                        <span>Have an account?</span>
                        <div className={classes.linkContainer}>
                            <Link className={classes.link} href="/login/sign_in" underline="none">Sign in</Link>
                        </div>
                    </div>
                </form>
            } header={"Create account."} subheader={""} />
        </div>
    );
};

export default SignUp;