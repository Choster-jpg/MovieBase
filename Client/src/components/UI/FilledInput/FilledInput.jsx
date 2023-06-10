import React from 'react';
import {FormControl, InputLabel, FilledInput as MuiFilledInput, InputAdornment, IconButton} from "@mui/material";

import classes from './FilledInput.module.scss';
import {Search, Visibility, VisibilityOff} from "@mui/icons-material";

const FilledInput = ({placeholder, onClick, onChange, value, multiline = false, endAdornment}) => {
    return (
        <FormControl variant="filled" className={classes.formElement}>
            <MuiFilledInput
                multiline={multiline}
                value={value}
                onChange={onChange}
                className={classes.input}
                id="filled-adornment-password"
                type="text"
                placeholder={placeholder}
                endAdornment={
                    <InputAdornment position={"end"}>
                        {endAdornment}
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default FilledInput;