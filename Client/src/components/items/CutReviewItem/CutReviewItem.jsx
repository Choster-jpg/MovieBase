import React from 'react';
import classes from "./CutReviewItem.module.scss";
import {Avatar} from "@mui/material";
import TextRating from "../../UI/TextRating/TextRating.jsx";
import {Link} from "react-router-dom";
import {Forum} from "@mui/icons-material";

const CutReviewItem = () => {
    return (
        <div className={classes.postContent}>
            <div className={classes.postHeader}>
                <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                <div className={classes.postAuthor}>
                    <h5>Mahershala Ali</h5>
                    <span>10 minutes ago, 18 may 2018</span>
                </div>
            </div>
            <div className={classes.postText}>
                <h4>
                    <TextRating rate={8.8}/>
                    The best movie ever
                </h4>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has...
                    <Link className={classes.link}>Read more</Link>
                </p>
            </div>
        </div>
    );
};

export default CutReviewItem;