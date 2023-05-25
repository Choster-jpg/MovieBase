import React from 'react';

import classes from './Logo.module.scss';
import image from './../assets/logo.png';

const Logo = () => {
    return (
            <div className={classes.border}>
                <img alt="logo image" src={image} className={classes.image}/>
                <h1 className={classes.header}>TMb</h1>
            </div>
    );
};

export default Logo;