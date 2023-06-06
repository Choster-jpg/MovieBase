import React from 'react';

import classes from "./Review.module.scss";
import CircularRating from "../../components/UI/CircularRating/CircularRating.jsx";
import {Avatar, IconButton} from "@mui/material";
import TextRating from "../../components/UI/TextRating/TextRating.jsx";
import {Link} from "react-router-dom";
import {
    AutoStories,
    Forum,
    Movie,
    Photo, Send,
    ThumbDown,
    ThumbDownOutlined,
    ThumbUp,
    ThumbUpOutlined
} from "@mui/icons-material";
import Button from "../../components/UI/Button/Button.jsx";
import CommentItem from "../../components/items/CommentItem/CommentItem.jsx";
import Input from "../../components/UI/Input/Input.jsx";

const Review = () => {
    return (
        <>
            <div className={classes.postActionInput}>
                <div>
                    <Input type="text" isValidationRequired={false} label="Text" isMultiline={true}/>
                </div>
                <IconButton>
                    <Send className={classes.icon}/>
                </IconButton>
            </div>
            <div className={classes.background}>
                <section className={classes.header}>
                    <div className={classes.headerContent}>
                        <img className={classes.poster} src="https://m.media-amazon.com/images/M/MV5BY2NmM2M2MWItNjdlMC00ZWI3LTkwODUtZDNkYWZjYjgzZjY3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX380_CR0,2,380,562_.jpg 380w"/>
                    </div>
                    <div className={classes.headerRating}>
                        <div className={classes.rateItem}>
                            <AutoStories/>
                            <span>Story</span>
                            <span>4.3 / 10</span>
                        </div>
                        <div className={classes.rateItem}>
                            <Photo/>
                            <span>Visual</span>
                            <span>8.3 / 10</span>
                        </div>
                        <div className={classes.rateItem}>
                            <Movie/>
                            <span>Overall</span>
                            <span>4.3 / 10</span>
                        </div>
                    </div>
                </section>
                <section className={classes.posterLabels}>
                    <h3>
                        Don't Be a Menace to South Central While Drinking Your Juice in the Hood
                        <span>(1996)</span>
                    </h3>
                </section>
                <section className={classes.contentSection}>
                    <div className={classes.contentHeader}>
                        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                        <div className={classes.contentAuthor}>
                            <h5>Mahershala Ali</h5>
                            <span>18 may 2018</span>
                        </div>
                    </div>
                    <div className={classes.contentText}>
                        <h4>
                            The best movie ever
                        </h4>
                        <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when looking
                            at its layout. The point of using Lorem Ipsum is that it
                            has a more-or-less normal distribution of letters, as opposed
                            to using 'Content here, content here', making it look like
                            readable English. Many desktop publishing packages and web
                            page editors now use Lorem Ipsum as their default model text,
                            and a search for 'lorem ipsum' will uncover many web sites still
                            in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour
                            and the like).
                        </p>
                    </div>
                    <div className={classes.contentReactions}>
                        <Button endIcon={<ThumbUpOutlined className={classes.icon}/>} type="text" color="secondary">
                            11,4K
                        </Button>
                        <Button endIcon={<ThumbDownOutlined className={classes.icon}/>} type="text" color="secondary">
                            240
                        </Button>
                    </div>
                </section>
                <section className={classes.commentSection}>
                    <h3>Discussion</h3>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                </section>
            </div>
        </>
    );
};

export default Review;