import React from 'react';
import classes from "./BrowseUserItem.module.scss";
import {Avatar, IconButton} from "@mui/material";
import {PersonAdd} from "@mui/icons-material";
import {Link} from "react-router-dom";

const BrowseUserItem = ({user}) => {
    return (
        <div className={classes.browseUserItem}>
            <div className={classes.infoContainer}>
                <Link to={`/user/${user.id}`}>
                    <Avatar className={classes.avatar} src={`http://localhost:5000/${user.image}`}/>
                </Link>
                <div className={classes.textContainer}>
                    <span>{user.full_name}</span>
                    <span>@{user.nickname}</span>
                </div>
            </div>
            <div className={classes.buttonContainer}>

            </div>
        </div>
    );
};

export default BrowseUserItem;