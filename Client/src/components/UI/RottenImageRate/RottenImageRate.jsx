import React from 'react';
import classes from "../../../pages/Movie/Movie.module.scss";

const RottenImageRate = ({rate, className}) => {

    let rottenImageRating;

    if(rate < 60)
    {
        rottenImageRating = <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Rotten_Tomatoes_rotten.svg" className={className}/>;
    }
    else if(rate < 80)
    {
        rottenImageRating = <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg" className={className}/>
    }
    else if(rate <= 100)
    {
        rottenImageRating = <img src="//upload.wikimedia.org/wikipedia/uk/thumb/b/b2/Certified_Fresh_2018.svg/264px-Certified_Fresh_2018.svg.png?20180313164958" className={className}/>
    }
    else
    {
        rottenImageRating = <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg" className={className}/>
    }

    return (
        <>
            {rottenImageRating}
        </>
    );
};

export default RottenImageRate;