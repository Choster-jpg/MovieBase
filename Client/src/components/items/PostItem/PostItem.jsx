import React from 'react';
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";

import classes from './PostItem.module.scss';
import TextRating from "../../UI/TextRating/TextRating.jsx";
import {Comment, Forum} from "@mui/icons-material";

const PostItem = ({item}) => {

    const dateObject = new Date(item.createdAt);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let dateFormatted = dateObject.toLocaleDateString('en-US', options);

    function removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
    }

    let plain_text = removeHtmlTags(item.html_content).slice(0, 175);

    if(plain_text.length === 175) {
        plain_text += '...';
    }

    return (
        <div className={classes.postContainer}>
            <div className={classes.postSubject}>
                <div className={classes.posterLabels}>
                    <div className={classes.postHeader}>
                        <Avatar className={classes.avatar} src={`http://localhost:5000/${item.User.image}`}/>
                        <div className={classes.postAuthor}>
                            <h5>{item.User.full_name}</h5>
                            <span>{`${timeFormatted}, ${dateFormatted}`}</span>
                        </div>
                    </div>
                    <h3>
                        {item.Movie.title}
                        <span>({new Date(item.Movie.release_date).getFullYear()})</span>
                    </h3>
                </div>
                <Link>
                    <img className={classes.poster} src={item.Movie.poster}/>
                </Link>
            </div>
            <div className={classes.postContent}>
                <div className={classes.postText}>
                    <h4>
                        <TextRating rate={item.overall_rate}/>
                        {item.title}
                    </h4>
                    <p>
                        {plain_text}
                        <Link className={classes.link}>Read more</Link>
                    </p>
                    <div className={classes.comments}>
                        <span>56</span>
                        <Forum className={classes.icon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;