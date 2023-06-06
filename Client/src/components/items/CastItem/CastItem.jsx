import React from 'react';

import classes from "./CastItem.module.scss";
import {Link} from "react-router-dom";

const CastItem = ({item}) => {
    return (
        <div>
            <Link to={item.href} className={classes.link}>
                <div className={classes.container}>
                    <img className={classes.image} src={item.image}/>
                    <span>{item.name}</span>
                    <span>{item.role}</span>
                </div>
            </Link>
        </div>
    );
};

export default CastItem;