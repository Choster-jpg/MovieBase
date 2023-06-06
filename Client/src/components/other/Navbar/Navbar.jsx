import React, {useState} from 'react';
import {AccountBox, AppsRounded, BrowseGalleryRounded, HomeRounded, MovieFilterRounded} from "@mui/icons-material";

import classes from './Navbar.module.scss';

const Navbar = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    return (
        <div className={classes.navbar}>
            <div className={[classes.navItem, selectedIndex === 1 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => setSelectedIndex(1)}>
                <HomeRounded/>
                <span>Home</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 2 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => setSelectedIndex(2)}>
                <AppsRounded/>
                <span>Fun</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 3 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => setSelectedIndex(3)}>
                <MovieFilterRounded/>
                <span>Browse</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 4 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => setSelectedIndex(4)}>
                <BrowseGalleryRounded/>
                <span>Watchlist</span>
            </div>
            <div className={[classes.navItem, selectedIndex === 5 && classes.navItemSelected].filter(e => !!e).join(' ')}
                 onClick={() => setSelectedIndex(5)}>
                <AccountBox/>
                <span>Profile</span>
            </div>
        </div>
    );
};

export default Navbar;