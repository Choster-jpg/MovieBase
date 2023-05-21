import React, {useState} from 'react';
import {FormControl, IconButton, Input as MuiInput, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import classes from './Input.module.scss';
import {green} from "@mui/material/colors";


const Input = ({label, type}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl className={classes.formElement} variant="standard">
            <InputLabel className={classes.label} htmlFor="adornment-password">{label}</InputLabel>
            <MuiInput
                className={classes.input}
                id="adornment-password"
                type={(showPassword || type === 'text') ? 'text' : 'password'}
                endAdornment={
                    type === 'password' ?
                    <InputAdornment position="end">
                        <IconButton
                            className={classes.icon}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment> : <></>
                }
            />
        </FormControl>
    );
};

export default Input;