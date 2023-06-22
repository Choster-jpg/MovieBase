import React from 'react';
import {Avatar} from "@mui/material";
import Button from "../../UI/Button/Button.jsx";

import classes from './CommentItem.module.scss';
import ReplyItem from "../ReplyItem/ReplyItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setReplyItem} from "../../../store/slices/reviewPageSlice.js";

const CommentItem = ({item, replies}) => {
    const dispatch = useDispatch();
    const dateObject = new Date(item.createdAt);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let options = { day: 'numeric', month: 'long', year: 'numeric' };

    const { data, reply_item, buttons_disabled } = useSelector(state => state.reviewPage);

    const timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const dateFormatted = dateObject.toLocaleDateString('en-US', options);

    const onReplyClick = () => {
        dispatch(setReplyItem({comment_id: item.id, nickname: item.User?.nickname}));
    }

    return (
        <div className={classes.commentItem}>
            <div className={classes.contentHeader}>
                <Avatar src={`http://localhost:5000/${item.User?.image}`}/>
                <div className={classes.contentAuthor}>
                    <h5>
                        @{item.User?.nickname}
                        {
                            item.User?.nickname === data.User?.nickname
                            ?
                            <span style={{marginLeft: "5px"}}>(author)</span>
                            :
                            <></>
                        }
                    </h5>
                    <span>{timeFormatted}, {dateFormatted}</span>
                </div>
            </div>
            <p>
                {item.text}
            </p>
            <div className={classes.commentReactions}>
                <Button type="text" color="secondary" onClick={onReplyClick} disabled={buttons_disabled}>
                    Reply
                </Button>
            </div>
            <div className={classes.replySection}>
                {
                    replies.map(item => <ReplyItem item={item}/>)
                }
            </div>
        </div>
    );
};

export default CommentItem;