import React from 'react';

import classes from './BrowseItem.module.scss';
import {IconButton, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Delete, MoreHoriz} from "@mui/icons-material";
import {Link} from "react-router-dom";

const BrowseItem = () => {
    return (
        <Link className={classes.link}>
            <div className={classes.listItem}>
                <img src="https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                <div>
                    <h5>Teenage Mutant Ninja Turtles: Mutant Mayhem </h5>
                    <span>2008</span>
                    <span>Christian Bale, Heath Ledger</span>
                </div>
            </div>
        </Link>
    );
};

export default BrowseItem;