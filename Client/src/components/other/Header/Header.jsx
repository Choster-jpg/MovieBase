import React from 'react';
import Logo from "../../UI/Logo/Logo.jsx";
import {KeyboardArrowRight, Notifications} from "@mui/icons-material";
import {Badge, IconButton} from "@mui/material";

import classes from './Header.module.scss';

const Header = ({title}) => {
    return (
        <div className={classes.header}>
            <div>
                <Logo/>
                <KeyboardArrowRight/>
                <h1>{title}</h1>
            </div>
            <IconButton className={classes.iconButton}>
                <Badge color="primary" variant="dot" className={classes.badge}>
                    <Notifications/>
                </Badge>
            </IconButton>
        </div>
    );
};

export default Header;