import React, {useEffect} from 'react';
import classes from "./Review.module.scss";
import {Avatar, CircularProgress, IconButton } from "@mui/material";

import {
    HomeRounded,
    Send,
    ThumbDown,
    ThumbDownOutlined,
    ThumbUp,
    ThumbUpOutlined, West
} from "@mui/icons-material";

import Button from "../../components/UI/Button/Button.jsx";
import CommentItem from "../../components/items/CommentItem/CommentItem.jsx";
import Input from "../../components/UI/Input/Input.jsx";
import RateSlider from "../../components/UI/RateSlider/RateSlider.jsx";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";

import { fetchReviewData, fetchCommentReplies, fetchUserReaction,
    fetchReviewComments, fetchReviewReactions,
    resetReplies, setReplyItem, setInputText,
    likeReview, dislikeReview, clearReaction,
    createComment, createReply, resetNeedFetch } from '../../store/slices/reviewPageSlice.js';

import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userData);

    const { error, loading, data, comments, replies, need_fetch,
            user_reaction, input_text, buttons_disabled, reply_item} = useSelector(state => state.reviewPage);

    useEffect(() => {
        dispatch(resetReplies());
        dispatch(fetchReviewData({ review_id: id }));
        dispatch(fetchReviewReactions({ review_id: id }));
        dispatch(fetchReviewComments({ review_id: id }));

        if(user) {
            console.log("user na meste")
            dispatch(fetchUserReaction({user_id: user.id, review_id: id}));
        }
    }, [dispatch]);

    useEffect(() => {
        if(comments.length !== 0) {
            comments.forEach(item => {
                dispatch(fetchCommentReplies({comment_id: item.id}));
            })
        }
    }, [comments])

    const getCommentReplies = (id) => {
        return replies.filter(item => item.CommentId === id);
    }

    const likeClick = () => {
        if(user) {
            if(user_reaction === 'like') {
                dispatch(clearReaction({user_id: user.id, review_id: data.id}));
            }
            else {
                dispatch(likeReview({user_id: user.id, review_id: data.id, reaction_type: "like"}));
            }
        }
    }

    const dislikeClick = () => {
        if(user) {
            if(user_reaction === 'dislike') {
                dispatch(clearReaction({user_id: user.id, review_id: data.id}));
            }
            else {
                dispatch(dislikeReview({user_id: user.id, review_id: data.id, reaction_type: "dislike"}));
            }
        }
    }

    useEffect(() => {
        dispatch(fetchReviewReactions({ review_id: id }));
    }, [user_reaction]);

    const onButtonSendClick = () => {
        if(user) {
            if(!reply_item) {
                dispatch(createComment({user_id: user.id, review_id: data.id, text: input_text}));
            }
            else {
                dispatch(createReply({user_id: user.id, comment_id: reply_item.comment_id, text: input_text}));
            }
        }
    }

    useEffect(() => {
        if(need_fetch) {
            dispatch(fetchReviewComments({ review_id: id }));
            dispatch(resetNeedFetch());
        }
    }, [need_fetch])

    return (
        <>
            {
                user
                ?
                <div className={classes.inputBarContainer}>
                    {
                        reply_item
                        ?
                        <>
                            <span>
                                <mark onClick={() => dispatch(setReplyItem(null))}>
                                    Cancel
                                </mark>
                            </span>
                            <span>Reply to user <b>@{reply_item.nickname}:</b></span>
                        </>
                        :
                        <></>
                    }
                    <div className={classes.postActionInput}>
                        <div>
                            <FilledInput multiline={true} placeholder="Type comment here.." value={input_text}
                                         onChange={(e) => dispatch(setInputText(e.target.value))}/>
                        </div>
                        <IconButton onClick={onButtonSendClick} disabled={buttons_disabled}>
                            <Send className={classes.icon}/>
                        </IconButton>
                    </div>
                </div>
                :
                <></>
            }
            <div className={classes.background}>
                {
                    !loading
                    ?
                    <>
                        <div className={classes.controlButtons}>
                            <IconButton className={classes.iconButton}
                                        onClick={() => navigate(-1)}>
                                <West/>
                            </IconButton>
                            <IconButton className={classes.iconButton}
                                        onClick={() => navigate('/browse')}>
                                <HomeRounded/>
                            </IconButton>
                        </div>
                        <section className={classes.header}>
                            <div className={classes.headerContent}>
                                <Link to={`/movies/${data.Movie?.imdb_link}`}>
                                    <picture>
                                        <source srcSet={data.Movie?.poster}/>
                                        <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt={`Review movie poster`}/>
                                    </picture>
                                </Link>
                                <div className={classes.content}>
                                    <div className={classes.contentHeader}>
                                        <Avatar src={`http://localhost:5000/${data.User?.image}`}/>
                                        <div className={classes.contentAuthor}>
                                            <h5>{data.User?.full_name}</h5>
                                            <span>{`${data.timeFormatted}, ${data.dateFormatted}`}</span>
                                        </div>
                                    </div>
                                    <h3>
                                        { data.Movie?.title }
                                        <span>({new Date(data.Movie?.release_date).getFullYear()})</span>
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
                                <Button onClick={likeClick}
                                        endIcon={
                                        user_reaction !== "like"
                                            ?
                                            <ThumbUpOutlined className={classes.icon}/>
                                            :
                                            <ThumbUp className={classes.icon}/>}
                                        type="text" color="secondary" disabled={buttons_disabled}>
                                    {data.likes}
                                </Button>
                                <Button onClick={dislikeClick}
                                        endIcon={
                                        user_reaction !== "dislike"
                                            ?
                                            <ThumbDownOutlined className={classes.icon}/>
                                            :
                                            <ThumbDown className={classes.icon}/>}
                                        type="text" color="secondary" disabled={buttons_disabled}>
                                    {data.dislikes}
                                </Button>
                            </div>
                        </section>
                        <section className={classes.commentSection}>
                            <h3>Discussion</h3>
                            {
                                comments.map(item => <CommentItem item={item} replies={getCommentReplies(item.id)}/>)
                            }
                        </section>
                    </>
                    :
                    <CircularProgress color="inherit"/>
                }
            </div>
        </>
    );
};

export default Review;