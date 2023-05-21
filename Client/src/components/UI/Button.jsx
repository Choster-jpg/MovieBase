import React from 'react';
import {Button as MuiButton} from "@mui/material";
import classes from './Button.module.scss';

const Button = ({children, variant, color, sx, startIcon}) => {
    return (
        <MuiButton sx={sx} variant={variant} color={color} className={classes.button} startIcon={startIcon}>
            {children}
        </MuiButton>
    );
};

export default Button;