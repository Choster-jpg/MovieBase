import React from 'react';
import {Chip as MuiChip} from "@mui/material";

import classes from './Chip.module.scss';

const Chip = ({label, onDelete}) => {
    return (
        <MuiChip label={label} onDelete={() => onDelete()} className={classes.chip}/>
    );
};

export default Chip;