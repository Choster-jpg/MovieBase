import React from 'react';
import {Avatar} from "@mui/material";
import Button from "../../UI/Button/Button.jsx";
import {ThumbDownOutlined, ThumbUpOutlined} from "@mui/icons-material";

import classes from './CommentItem.module.scss';
import ReplyItem from "../ReplyItem/ReplyItem.jsx";
import Input from "../../UI/Input/Input.jsx";

const CommentItem = () => {
    return (
        <div className={classes.commentItem}>
            <div className={classes.contentHeader}>
                <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"/>
                <div className={classes.contentAuthor}>
                    <h5>Megan Fox</h5>
                    <span>12:15, 21 june 2023</span>
                </div>
            </div>
            <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua? Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat?
            </p>
            <div className={classes.commentReactions}>
                <Button type="text" color="secondary">
                    Reply
                </Button>
            </div>
            <div className={classes.replySection}>
                <ReplyItem/>
                <ReplyItem/>
            </div>
        </div>
    );
};

export default CommentItem;