import React from 'react';
import classes from "./CutReviewItem.module.scss";
import {Avatar} from "@mui/material";
import TextRating from "../../UI/TextRating/TextRating.jsx";
import {Link} from "react-router-dom";
import {Forum} from "@mui/icons-material";

import { removeHtml } from "../../../utils/removeHtml.js";
import {getPublicationDate} from "../../../utils/getPublicationDate.js";

const CutReviewItem = ({item}) => {

    const purified_text = removeHtml(item.html_content).slice(0, 155);
    let text = purified_text;
    if(purified_text.length === 155) {
        text = purified_text.slice(0, purified_text.lastIndexOf(' ')).concat('...');
    }

    const { timeFormatted, dateFormatted } = getPublicationDate(item.createdAt);

    return (
        <div className={classes.postContent}>
            <div className={classes.postHeader}>
                <Avatar src={`http://localhost:5000/${item.User?.image}`}/>
                <div className={classes.postAuthor}>
                    <h5>{item.User?.full_name}</h5>
                    <span>{timeFormatted}, {dateFormatted}</span>
                </div>
            </div>
            <div className={classes.postText}>
                <h4>
                    <TextRating rate={item.overall_rate}/>
                    {item.title}
                </h4>
                <p>
                    {text}
                    <Link className={classes.link} to={`/review/${item.id}`}>Read more</Link>
                </p>
            </div>
        </div>
    );
};

export default CutReviewItem;