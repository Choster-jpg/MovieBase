import React, {useState} from 'react';
import {IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Delete, MoreHoriz} from "@mui/icons-material";

import classes from './WatchlistItem.module.scss';
import {Link} from "react-router-dom";

const WatchlistItem = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <Link className={classes.link}>
            <div className={classes.listItem}>
                <img src="https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                <div>
                    <h5>Teenage Mutant Ninja Turtles: Mutant Mayhem</h5>
                    <span>2008</span>
                    <span>Christian Bale, Heath Ledger</span>
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