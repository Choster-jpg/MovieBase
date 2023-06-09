import React from 'react';

import classes from './FriendsListItem.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {PersonRemove} from "@mui/icons-material";

const FriendsListItem = () => {
    return (
        <Link className={classes.link}>
            <div className={classes.friendsListItem}>
                <Avatar src="https://images.unsplash.com/photo-1606459431839-90b942dc3754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                <div className={classes.textContainer}>
                    <span>Kyle Walker</span>
                    <span>@SexInstructor</span>
                </div>
                <div className={classes.buttonContainer}>
                    <IconButton>
                        <PersonRemove/>
                    </IconButton>
                </div>
            </div>
        </Link>
    );
};

export default FriendsListItem;