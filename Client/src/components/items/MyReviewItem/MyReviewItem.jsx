import React, {useEffect} from 'react';
import classes from "./MyReviewItem.module.scss";
import TextRating from "../../UI/TextRating/TextRating.jsx";
import { Link } from "react-router-dom";

const MyReviewItem = ({item}) => {


    let dateObject = new Date(item.Movie.release_date);
    let year = dateObject.getFullYear();

    function removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
    }

    let plain_text = removeHtmlTags(item.html_content).slice(0, 74);
    if(plain_text.length === 74) plain_text += '...';

    return (
        <div className={classes.myReviewItem}>
            <picture>
                <source srcSet={item.Movie.poster}/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Movie poster`}/>
            </picture>
            <div className={classes.textContent}>
                <h5>{item.Movie.title}</h5>
                <span>{ year }</span>
                <h5>
                    <TextRating rate={item.overall_rate}/>
                    {item.title}
                </h5>
                <p>
                    {plain_text}
                    <Link className={classes.link}>Read more</Link>
                </p>
            </div>
        </div>
    );
};

export default MyReviewItem;