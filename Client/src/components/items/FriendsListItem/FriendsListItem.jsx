import React from 'react';

import classes from './FriendsListItem.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {PersonRemove} from "@mui/icons-material";

const FriendsListItem = ({item}) => {
    return (
        <Link className={classes.link}>
            <div className={classes.friendsListItem}>
                <Link to={`/user/${item.id}`}>
                    <Avatar src={`${import.meta.env.VITE_SERVER_API_URL}/${item.image}`}/>
                </Link>
                <div className={classes.textContainer}>
                    <span>{item.full_name}</span>
                    <span>@{item.nickname}</span>
                </div>
                <div className={classes.buttonContainer}>

                </div>
            </div>
        </Link>
    );
};

export default FriendsListItem;