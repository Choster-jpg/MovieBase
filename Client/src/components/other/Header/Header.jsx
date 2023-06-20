import React, {useEffect} from 'react';
import Logo from "../../UI/Logo/Logo.jsx";
import {KeyboardArrowRight, Notifications} from "@mui/icons-material";
import {Badge, IconButton} from "@mui/material";

import classes from './Header.module.scss';
import { useScrollDirection } from "../../../hooks/useScrollDirection.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Header = ({title}) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.userData);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleSignInClick = () => {
        navigate('/login/sign_in');
    }

    const scrollDirection = useScrollDirection();

    return (
        <div className={`${classes.header} ${scrollDirection === "down" ? classes.down : classes.up}`}>
            <div>
                <Logo/>
                <div className={classes.clickableArea} onClick={handleClick}>
                    <KeyboardArrowRight/>
                    <h1>{title}</h1>
                </div>
            </div>
            {
                user === null
                ?
                <span className={classes.link} onClick={handleSignInClick}>Sign In</span>
                :
                <IconButton className={classes.iconButton}>
                    <Badge color="primary" variant="dot" className={classes.badge}>
                        <Notifications/>
                    </Badge>
                </IconButton>
            }

        </div>
    );
};

export default Header;