import React from 'react';
import classes from "./AuthForm.module.scss";
import {IconButton} from "@mui/material";
import {West} from "@mui/icons-material";

const AuthForm = ({content, header, subheader}) => {
    return (
        <div className={classes.background}>
            <div className={classes.panel}>
                <div className={classes.panel__container}>
                    <IconButton sx={{
                        color: '#272f32',
                        marginLeft: -1
                    }}>
                        {<West/>}
                    </IconButton>
                    <h1>{header}</h1>
                    <span>{subheader}</span>
                </div>
            </div>
            <div className={classes.form}>
                <div className={classes.form__container}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;