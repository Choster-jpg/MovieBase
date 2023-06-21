import React, {useEffect} from 'react';
import classes from "./Review.module.scss";
import {Avatar, IconButton} from "@mui/material";

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
import RateSlider from "../../components/UI/RateSlider/RateSlider.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";

import { fetchReviewData } from '../../store/slices/reviewPageSlice.js';

const Review = () => {
    const dispatch = useDispatch();
    const { error, loading, data } = useSelector(state => state.reviewPage);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchReviewData({review_id: id}));
    }, []);

    const dateObject = new Date(data.createdAt);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let dateFormatted = dateObject.toLocaleDateString('en-US', options);

    return (
        <>
            {
                data
                ?
                <>
                    <div className={classes.postActionInput}>
                        <div>
                            <Input type="text" isValidationRequired={false} label="Your comment..." isMultiline={true}/>
                        </div>
                        <IconButton>
                            <Send className={classes.icon}/>
                        </IconButton>
                    </div>
                    <div className={classes.background}>
                        <section className={classes.header}>
                            <div className={classes.headerContent}>
                                <picture>
                                    <source srcSet={data.Movie.poster}/>
                                    <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Review movie poster`}/>
                                </picture>
                                <div className={classes.content}>
                                    <div className={classes.contentHeader}>
                                        <Avatar src={`http://localhost:5000/${data.User.image}`}/>
                                        <div className={classes.contentAuthor}>
                                            <h5>{data.User.full_name}</h5>
                                            <span>{`${timeFormatted}, ${dateFormatted}`}</span>
                                        </div>
                                    </div>
                                    <h3>
                                        { data.Movie.title }
                                        <span>({new Date(data.Movie.release_date).getFullYear()})</span>
                                    </h3>
                                    <h4>
                                        { data.title }
                                    </h4>
                                </div>
                            </div>
                        </section>
                        <section className={classes.rates}>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Story</span>
                                    <span>{data.story_rate}.0</span>
                                </div>
                                <RateSlider value={data.story_rate} disabled={true}/>
                            </div>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Visual</span>
                                    <span>{data.visual_rate}.0</span>
                                </div>
                                <RateSlider value={data.visual_rate} disabled={true}/>
                            </div>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Acting</span>
                                    <span>{data.acting_rate}.0</span>
                                </div>
                                <RateSlider value={data.acting_rate} disabled={true}/>
                            </div>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Originality</span>
                                    <span>{data.originality_rate}.0</span>
                                </div>
                                <RateSlider value={data.originality_rate} disabled={true}/>
                            </div>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Emot. impact</span>
                                    <span>{data.emotional_impact_rate}.0</span>
                                </div>
                                <RateSlider value={data.emotional_impact_rate} disabled={true}/>
                            </div>
                            <div className={classes.sliderContainer}>
                                <div className={classes.textContainer}>
                                    <span>Mean. depth</span>
                                    <span>{data.meaning_depth_rate}.0</span>
                                </div>
                                <RateSlider value={data.meaning_depth_rate} disabled={true}/>
                            </div>
                        </section>
                        <div className={classes.overallContainer}>
                            <span>Overall: </span>
                            <span>{data.overall_rate}</span>
                        </div>
                        <section className={classes.contentSection}>
                            <div className={classes.contentText}>
                                <div dangerouslySetInnerHTML={{ __html: data.html_content }}>

                                </div>
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
                :
                <span>Review not found</span>
            }
        </>
    );
};

export default Review;