import React from 'react';
import {Button as MuiButton} from "@mui/material";
import classes from './Button.module.scss';

const Button = ({children, variant, color, sx, startIcon, endIcon, type, onClick}) => {
    return (
        <MuiButton sx={sx} variant={variant}
                   color={color} className={classes.button}
                   startIcon={startIcon} endIcon={endIcon}
                   type={type} onClick={onClick}>
            {children}
        </MuiButton>
    );
};

export default Button;