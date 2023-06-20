import React from 'react';

import classes from "./CastItem.module.scss";
import {Link} from "react-router-dom";

const CastItem = ({item}) => {
    return (
        <div>
            <Link to={item.href} className={classes.link}>
                <div className={classes.container}>
                    <picture>
                        <source srcSet={item.image}/>
                        <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"/>
                    </picture>
                    <span>{item.name}</span>
                    <span>
                        {
                            item.role_name ? item.role_name : item.MovieCast.role_name
                        }
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default CastItem;