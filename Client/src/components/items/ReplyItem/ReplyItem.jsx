import React from 'react';
import {Avatar} from "@mui/material";
import Button from "../../UI/Button/Button.jsx";
import {ThumbDownOutlined, ThumbUpOutlined} from "@mui/icons-material";

import classes from './ReplyItem.module.scss';

const ReplyItem = () => {
    return (
        <div className={classes.replyItem}>
            <div className={classes.contentHeader}>
                <Avatar className={classes.avatar} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"/>
                <div className={classes.contentAuthor}>
                    <h5>Megan Fox</h5>
                    <span>12:15, 21 june 2023</span>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet, con sec tetur adipiscing elit?
            </p>
            <div className={classes.reactions}>
                <Button endIcon={<ThumbUpOutlined className={classes.icon}/>} type="text" color="secondary">
                    1,4K
                </Button>
                <Button endIcon={<ThumbDownOutlined className={classes.icon}/>} type="text" color="secondary">
                    1,1k
                </Button>
                <Button type="text" color="secondary">
                    Reply
                </Button>
            </div>
        </div>
    );
};

export default ReplyItem;
