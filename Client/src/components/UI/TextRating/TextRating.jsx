import React from 'react';
import {Typography} from "@mui/material";

import classes from './TextRating.module.scss';

const TextRating = ({rate, isDotNeeded = true, className}) => {

    const masterpiece = "#00FF7F";
    const good = "#3BCA6D";
    const medium = "#77945C";
    const bad = "#B25F4A";

    let fillColor = "#ED2938";

    if(rate > 2) fillColor = bad;
    if(rate > 4) fillColor = medium;
    if(rate > 6) fillColor = good;
    if(rate > 8) fillColor = masterpiece;

    return (
        <Typography sx={{color: fillColor}} variant="span" className={isDotNeeded ? classes.text : className}>{rate}</Typography>
    );
};

export default TextRating;