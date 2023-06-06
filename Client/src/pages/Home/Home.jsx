import React from 'react';

import classes from './Home.module.scss';
import {
    AccountBox,
    AppsRounded,
    BrowseGalleryRounded, Comment,
    HomeRounded, KeyboardArrowRight,
    MovieFilterRounded, Notifications, ThumbDown, ThumbUp
} from "@mui/icons-material";

import Navbar from "../../components/other/Navbar/Navbar.jsx";
import Logo from "../../components/UI/Logo/Logo.jsx";
import {Avatar, Badge, IconButton} from "@mui/material";
import Header from "../../components/other/Header/Header.jsx";
import Button from "../../components/UI/Button/Button.jsx";
import {Link} from "react-router-dom";
import CircularRating from "../../components/UI/CircularRating/CircularRating.jsx";
import PostItem from "../../components/items/PostItem/PostItem.jsx";

const Home = () => {
    return (
        <>
            <Header title="Home"/>
            <div className={classes.background}>
                <PostItem/>
                <PostItem/>
                <PostItem/>
            </div>
            <Navbar/>
        </>
    );
};

export default Home;