import React from 'react';
import {Slider} from "@mui/material";

const RateSlider = ({value, setValue}) => {
    const masterpiece = "#00FF7F";
    const good = "#3BCA6D";
    const medium = "#77945C";
    const bad = "#B25F4A";

    let fillColor = "#ED2938";

    if(value > 2) fillColor = bad;
    if(value > 4) fillColor = medium;
    if(value > 6) fillColor = good;
    if(value > 8) fillColor = masterpiece;

    return (
        <Slider value={value} onChange={(e) => setValue(e.target.value)} marks
            step={1} max={10} min={1} sx={{
            width: "200px",
            '& .MuiSlider-thumb': {
                boxShadow: '0px 0px 0px rgb(0, 0, 0)',
                borderRadius: "0px",
                width: '5px',
                background: '#e3dfdc'
            },
            '& .MuiSlider-track': {
                color: fillColor,
            },
            '& .MuiSlider-rail': {
                color: fillColor,
            },
            "& .MuiSlider-mark": {
                background: 'white',
            },
        }}/>
    );
};

export default RateSlider;