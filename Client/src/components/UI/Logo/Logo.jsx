import React from 'react';

import classes from './Logo.module.scss';
import image from '../../../assets/logo.png';

const Logo = () => {
    return (
            <div className={classes.border}>
                <img alt="logo image" src={image} className={classes.image}/>
                <span className={classes.header}>TMb</span>
            </div>
    );
};

export default Logo;