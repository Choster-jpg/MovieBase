import React, {useState} from 'react';
import {IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Delete, MoreHoriz} from "@mui/icons-material";

import classes from './WatchlistItem.module.scss';
import {Link} from "react-router-dom";

const WatchlistItem = ({item}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    let dateObject = new Date(item.release_date);
    let year = dateObject.getFullYear();

    const text = item.plot.slice(0, 80);
    const cut_text = text.slice(0, text.lastIndexOf(' ')).concat('...');

    return (
        <Link className={classes.link} to={`/movies/${item.imdb_link}`}>
            <div className={classes.listItem}>
                <picture>
                    <source srcSet={item.poster}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Movie poster`}/>
                </picture>
                <div>
                    <h5>{ item.title }</h5>
                    <span>{ year }</span>
                    <span>{ cut_text }</span>
                </div>
                <div className={classes.buttonContainer}>
                    <IconButton className={classes.button} onClick={handleClick}>
                        <MoreHoriz className={classes.icon}/>
                    </IconButton>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                             anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                             }}>
                        <List sx={{backgroundColor: '#e3dfdc'}}>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#272f32"}}>
                                    <Delete/>
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Remove"/>
                            </ListItemButton>
                        </List>
                    </Popover>
                </div>
            </div>
        </Link>
    );
};

export default WatchlistItem;