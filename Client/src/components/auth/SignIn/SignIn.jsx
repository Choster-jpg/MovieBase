import React, {useEffect} from 'react';

import classes from './SignIn.module.scss';
import {CircularProgress, Divider, IconButton, Link} from "@mui/material";
import {East, Google} from "@mui/icons-material";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";
import {useForm} from "react-hook-form";

import { login, resetError } from '../../../store/slices/userDataSlice.js';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector(state => state.userData);

    const { handleSubmit, reset, control, formState: {errors} } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        reset();
        dispatch(login(data));
    }

    useEffect(() => {
        if(user) navigate('/browse');
    }, [user]);

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                dispatch(resetError());
            }, 5000);
        }
    }, [error]);

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
                    <span>
                        {
                            error ? <span style={{color: "red", fontFamily: "inherit", fontWeight: "600", marginTop: "20px"}}>Error: {error}</span> : <></>
                        }
                    </span>
                    <Button variant="contained" color="primary" sx={{marginTop: 4}} type="submit">
                        {
                            !loading ? "Sign In" : <CircularProgress color='inherit'/>
                        }
                    </Button>
                    {/*<div className={classes.dividerContainer}>
                        <Divider className={classes.divider} textAlign="center">or</Divider>
                    </div>
                    <Button variant="contained" startIcon={<Google/>}>
                        Sign in with google
                    </Button>*/}
                    <div className={classes.linkContainer}>
                        <Link className={classes.link} href="/sign_up" underline="none">Don't have an account?</Link>
                    </div>
                </form>
            } backIcon={<East/>} header={"Welcome back!"} subheader={"Continue your adventure."}/>
            <ToastContainer position="bottom-right"/>
        </div>
    );
};

export default SignIn;