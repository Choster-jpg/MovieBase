import React from 'react';
import {Avatar} from "@mui/material";
import Button from "../../UI/Button/Button.jsx";

import classes from './CommentItem.module.scss';
import ReplyItem from "../ReplyItem/ReplyItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setReplyItem} from "../../../store/slices/reviewPageSlice.js";
import {getPublicationDate} from "../../../utils/getPublicationDate.js";

const CommentItem = ({item, replies}) => {

    const { data, reply_item, buttons_disabled } = useSelector(state => state.reviewPage);
    const dispatch = useDispatch();

    const { timeFormatted, dateFormatted } = getPublicationDate(item.createdAt);

    const onReplyClick = () => {
        dispatch(setReplyItem({comment_id: item.id, nickname: item.User?.nickname}));
    }

    return (
        <div className={classes.commentItem}>
            <div className={classes.contentHeader}>
                <Avatar src={`${import.meta.env.VITE_SERVER_API_URL}/${item.User?.image}`}/>
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