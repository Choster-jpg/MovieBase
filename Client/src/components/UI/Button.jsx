import React from 'react';
import {Button as MuiButton} from "@mui/material";
import classes from './Button.module.scss';

const Button = ({children, variant, color}) => {
    return (
        <MuiButton variant={variant} color={color} className={classes.button}>
            {children}
        </MuiButton>
    );
};

export default Button;