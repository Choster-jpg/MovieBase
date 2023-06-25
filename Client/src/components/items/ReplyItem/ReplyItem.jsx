import React from 'react';
import {Avatar} from "@mui/material";
import Button from "../../UI/Button/Button.jsx";
import {ThumbDownOutlined, ThumbUpOutlined} from "@mui/icons-material";

import classes from './ReplyItem.module.scss';
import {useDispatch, useSelector} from "react-redux";

import { setReplyItem } from '../../../store/slices/reviewPageSlice.js';
import {getPublicationDate} from "../../../utils/getPublicationDate.js";

const ReplyItem = ({item}) => {
    const dispatch = useDispatch();
    const { data, reply_item, buttons_disabled } = useSelector(state => state.reviewPage);

    const { timeFormatted, dateFormatted }  = getPublicationDate(new Date(item.createdAt));

    const onReplyClick = () => {
        dispatch(setReplyItem({comment_id: item.CommentId, nickname: item.User?.nickname}));
    }

    return (
        <div className={classes.replyItem}>
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
            <div className={classes.reactions}>
                <Button type="text" color="secondary" onClick={onReplyClick} disabled={buttons_disabled}>
                    Reply
                </Button>
            </div>
        </div>
    );
};

export default ReplyItem;
