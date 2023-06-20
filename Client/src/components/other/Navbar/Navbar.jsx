import React, {useEffect, useState} from 'react';
import {AccountBox, AppsRounded, BrowseGalleryRounded, HomeRounded, MovieFilterRounded} from "@mui/icons-material";

import classes from './Navbar.module.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setSelectedIndex } from "../../../store/slices/navbarStateSlice.js";

const Navbar = () => {
    const { selectedIndex } = useSelector(state => state.navbarState);
    const { user } = useSelector(state => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        switch (selectedIndex) {
            case 1:
                navigate('/home');
                break;
            case 3:
                navigate('/browse');
                break;
            case 4:
                navigate('/watchlist');
                break;
            case 5:
                navigate('/account');
                break;
        }
    }, [selectedIndex]);

    return (
        <div className={classes.navbar}>
            <div className={[classes.navItem, selectedIndex === 1 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => dispatch(setSelectedIndex({value: 1}))}>
                <HomeRounded/>
                <span>Home</span>
            </div>
            {/*<div className={[classes.navItem, selectedIndex === 2 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => dispatch(setSelectedIndex({value: 2}))}>
                <AppsRounded/>
                <span>Fun</span>
            </div>*/}
            <div className={[classes.navItem, selectedIndex === 3 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => dispatch(setSelectedIndex({value: 3}))}>
                <MovieFilterRounded/>
                <span>Browse</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 4 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => dispatch(setSelectedIndex({value: 4}))} hidden={true}>
                <BrowseGalleryRounded/>
                <span>Watchlist</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 5 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => dispatch(setSelectedIndex({value: 5}))} hidden={true}>
                <AccountBox/>
                <span>Profile</span>
            </div>
        </div>
    );
};

export default Navbar;