import React from 'react';

import classes from './CircularRating.module.scss';

const CircularRating = ({percentage}) => {

    const size = 60;

    const strokeWidth = 5;
    const radius = size / 2 - strokeWidth / 2;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;
    const angle = 90 - percentage * 1.8;

    const unfilled = "#171c1e";

    const masterpiece = "#00FF7F";
    const good = "#3BCA6D";
    const medium = "#77945C";
    const bad = "#B25F4A";

    let fillColor = "#ED2938";

    if(percentage >= 20) fillColor = bad;
    if(percentage >= 40) fillColor = medium;
    if(percentage >= 60) fillColor = good;
    if(percentage >= 80) fillColor = masterpiece;

    return (
        <div>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2}
                        strokeWidth={strokeWidth / 2} r={radius}
                        fill="none" stroke={unfilled}/>
                <circle cx={size / 2} cy={size / 2}
                        strokeWidth={strokeWidth} r={radius}
                        fill="none" stroke={fillColor}
                        style={{
                            strokeDasharray: dashArray,
                            strokeDashoffset: dashOffset,
                        }}
                        transform={`rotate(${angle} ${size / 2} ${size / 2})`}/>
                <text x="50%" y="50%" textAnchor="middle" dy="0.4em" className={classes.text}>
                    {percentage}%
                </text>
            </svg>
        </div>
    );
};

export default CircularRating;