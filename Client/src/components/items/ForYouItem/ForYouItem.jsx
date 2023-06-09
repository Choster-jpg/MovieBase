import React from 'react';
import classes from "./ForYouItem.module.scss";
import {Link} from "react-router-dom";

const ForYouItem = () => {
    return (
        <Link className={classes.link}>
            <div className={classes.forYouItem}>
                <img src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UY562_CR0,0,380,562_.jpg 380w"/>
                <span>Inglourious Basterds</span>
                <span>2005</span>
            </div>
        </Link>
    );
};

export default ForYouItem;