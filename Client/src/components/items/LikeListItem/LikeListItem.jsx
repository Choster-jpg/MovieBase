import React, {useState} from 'react';
import classes from "../WatchlistItem/WatchlistItem.module.scss";
import {Link} from "react-router-dom";

const LikeListItem = ({item}) => {
    let dateObject = new Date(item.release_date);
    let year = dateObject.getFullYear();

    const text = item.plot.slice(0, 80);
    const cut_text = text.slice(0, text.lastIndexOf(' ')).concat('...');

    return (
        <div className={classes.listItem}>
            <Link className={classes.link} to={`/movies/${item.imdb_link}`}>
                <picture>
                    <source srcSet={item.poster}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Movie poster`}/>
                </picture>
            </Link>
            <div>
                <h5>{ item.title }</h5>
                <span>{ year }</span>
                <span>{ cut_text }</span>
            </div>
        </div>
    );
};

export default LikeListItem;