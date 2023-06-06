import React from 'react';
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";

import classes from './PostItem.module.scss';
import TextRating from "../../UI/TextRating/TextRating.jsx";
import {Comment, Forum} from "@mui/icons-material";

const PostItem = () => {
    return (
        <div className={classes.postContainer}>
            <div className={classes.postSubject}>
                <img className={classes.poster} src="https://m.media-amazon.com/images/M/MV5BY2NmM2M2MWItNjdlMC00ZWI3LTkwODUtZDNkYWZjYjgzZjY3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX380_CR0,2,380,562_.jpg 380w"/>
                <div className={classes.posterLabels}>
                    <h3>
                        Don't Be a Menace to South Central While Drinking Your Juice in the Hood
                        <span>(1996)</span>
                    </h3>
                </div>
            </div>
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
                    <div className={classes.comments}>
                        <span>56</span>
                        <Forum className={classes.icon}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;