import React from 'react';
import {Tune} from "@mui/icons-material";
import classes from "./ToggleFilterButton.module.scss";
import {IconButton} from "@mui/material";

const ToggleFilterButton = ({isFilterExpanded, setFilterExpanded, onClick}) => {
    return (
        <div className={isFilterExpanded ? classes.filterButtonSelected : classes.filterButton}>
            <IconButton onClick={(event) => {
                setFilterExpanded(!isFilterExpanded);
                onClick(event);
            }}>
                <Tune className={classes.icon}/>
            </IconButton>
        </div>
    );
};

export default ToggleFilterButton;