import React from 'react';
import {Tune} from "@mui/icons-material";
import classes from "./ToggleFilterButton.module.scss";
import {IconButton} from "@mui/material";

const ToggleFilterButton = ({isFilterExpanded, setFilterExpanded}) => {
    return (
        <div className={isFilterExpanded ? classes.filterButtonSelected : classes.filterButton}>
            <IconButton onClick={() => setFilterExpanded(!isFilterExpanded)}>
                <Tune className={classes.icon}/>
            </IconButton>
        </div>
    );
};

export default ToggleFilterButton;