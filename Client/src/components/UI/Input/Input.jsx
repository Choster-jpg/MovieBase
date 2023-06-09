import React, {useState} from 'react';
import {FormControl, FormHelperText, IconButton, Input as MuiInput, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { Controller } from 'react-hook-form';

import classes from './Input.module.scss';

const Input = ({label, type, name, control, rules, errors = {}, isValidationRequired = true, isMultiline = false}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl className={classes.formElement} variant="standart" error={isValidationRequired ? !!errors[name] : false}>
            <InputLabel className={classes.label} htmlFor="adornment-password">{label}</InputLabel>
            {
                isValidationRequired
                ?
                    <Controller
                        rules={rules} control={control} name={name}
                        render={({ field }) => (
                            <MuiInput
                                {...field}
                                name={name}
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
                                aria-describedby="component-error-text"
                            />)
                        }/>
                    :
                    <MuiInput
                        multiline={isMultiline}
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
                        aria-describedby="component-error-text"
                    />

            }
            <FormHelperText>{errors[name] ? errors[name].message : ''}</FormHelperText>
        </FormControl>
    );
}

export default Input;