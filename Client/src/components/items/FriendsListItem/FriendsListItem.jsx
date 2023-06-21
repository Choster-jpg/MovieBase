import React from 'react';

import classes from './FriendsListItem.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {PersonRemove} from "@mui/icons-material";

const FriendsListItem = ({item}) => {
    return (
        <Link className={classes.link}>
            <div className={classes.friendsListItem}>
                <Avatar src={`http://localhost:5000/${item.image}`}/>
                <div className={classes.textContainer}>
                    <span>{item.full_name}</span>
                    <span>@{item.nickname}</span>
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