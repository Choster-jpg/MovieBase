import React from 'react';

import classes from './BrowseItem.module.scss';
import {IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Delete, MoreHoriz} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BrowseItem = ({index, movie}) => {

    const navigate = useNavigate();
    const onItemClick = () => {
        navigate(`/movies/${movie.imdb_page}`, { state: { title: movie.title, year: movie.year }})
    }

    return (
        <div className={classes.listItem} onClick={onItemClick}>
            <picture>
                <source srcSet={movie.image}/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Browsed movie poster ${index}`}/>
            </picture>
            <div>
                <h5>{movie.title}</h5>
                <span>{movie.year}</span>
                <span>{movie.casting}</span>
            </div>
        </div>
    );
};

export default BrowseItem;