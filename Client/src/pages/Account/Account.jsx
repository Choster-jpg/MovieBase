import React, {useEffect, useState} from 'react';

import classes from './Account.module.scss';
import {Avatar, CircularProgress, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {ChangeCircle, ChangeCircleOutlined, Delete, Done, Edit} from "@mui/icons-material";
import Button from "../../components/UI/Button/Button.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import FriendsListItem from "../../components/items/FriendsListItem/FriendsListItem.jsx";
import TextRating from "../../components/UI/TextRating/TextRating.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import Header from "../../components/other/Header/Header.jsx";

import { fetchAccountData, fetchFriends, fetchLiked, fetchReviews } from "../../store/slices/accountPageSlice.js";
import {useDispatch, useSelector} from "react-redux";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import MyReviewItem from "../../components/items/MyReviewItem/MyReviewItem.jsx";

const Account = () => {
    const location = useLocation();
    const [nickname, setNickname] = useState("ChosterChitos");
    const [description, setDescription] = useState("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.")

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);
    const { loading, error, data, friends,
            liked, reviews, loading_friends,
            loading_reviews, loading_liked } = useSelector(state => state.accountPage);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [isEditModeEnabled, setEditModeEnabled] = useState(false);

    const onSaveClick = () => {
        setEditModeEnabled(!isEditModeEnabled);
    }

    const onEditClick = () => {
        setEditModeEnabled(!isEditModeEnabled);
    }

    useEffect(() => {
        dispatch(fetchAccountData({ user_id: user.id }));
        dispatch(fetchFriends({ user_id: user.id }));
        dispatch(fetchLiked({ user_id: user.id }));
        dispatch(fetchReviews({ user_id: user.id }));
        console.log(location.pathname);
    }, [])

    return (
        <>
            <Header title="Account"/>
            <div className={classes.background}>
                <div className={classes.panel}>
                    {
                        loading
                        ?
                        <CircularProgress color="inherit"/>
                        :
                        <>
                            <div className={classes.avatarContainer}>
                                <div className={classes.clickable} onClick={handleClick}>
                                    <Avatar className={classes.profileAvatar} src={`http://localhost:5000/${data.image}`}/>
                                </div>
                                {
                                    location.pathname === '/account'
                                    &&
                                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                                             anchorOrigin={{
                                                 vertical: 'bottom',
                                                 horizontal: 'left',
                                             }}>
                                        <List sx={{backgroundColor: '#e3dfdc'}}>
                                            <ListItemButton>
                                                <ListItemIcon sx={{color: "#272f32"}}>
                                                    <ChangeCircleOutlined/>
                                                </ListItemIcon>
                                                <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Change"/>
                                            </ListItemButton>
                                        </List>
                                    </Popover>
                                }
                            </div>
                            <div className={classes.nameContainer}>
                                <span>{data.full_name}</span>
                                {
                                    isEditModeEnabled
                                        ?
                                        <div className={classes.inputContainer}>
                                            <FilledInput value={data.nickname} placeholder="Write nickname here..."/>
                                        </div>
                                        :
                                        <span>@{data.nickname}</span>
                                }
                            </div>
                            <div className={classes.infoContainer}>
                                <div className={classes.infoBlock}>
                                    <span>{ data.friends }</span>
                                    <span>{ data.friends === 1 ? "Friend" : "Friends"}</span>
                                </div>
                                <div className={classes.infoBlock}>
                                    <span>{data.reviews}</span>
                                    <span>{ data.reviews === 1 ? "Review" : "Reviews"}</span>
                                </div>
                                <div className={classes.infoBlock}>
                                    <span>{data.likes}</span>
                                    <span>Liked</span>
                                </div>
                            </div>
                            <div className={classes.aboutContainer}>
                                {
                                    isEditModeEnabled
                                        ?
                                        <div className={classes.inputContainer}>
                                            <FilledInput value={description} multiline={true} placeholder="Write your description here..."/>
                                        </div>
                                        :
                                        <p>{data.about}</p>
                                }
                            </div>
                            {
                                location.pathname === '/account'
                                &&
                                <div className={classes.buttonsContainer}>
                                    {
                                        isEditModeEnabled
                                            ?
                                            <span className={classes.link} onClick={onSaveClick}>
                                        <Done className={classes.icon}/>
                                        Save
                                    </span>
                                            :
                                            <span className={classes.link} onClick={onEditClick}>
                                        <Edit className={classes.icon}/>
                                        Edit
                                    </span>
                                    }
                                </div>
                            }
                            <div className={classes.tabsContainer}>
                                <CustomTabs tabHeaders={["Friends", "My reviews", "Liked"]} tabPanels={[
                                    <div className={classes.friendsList}>
                                        {
                                            loading_friends
                                            ?
                                            <CircularProgress color="inherit"/>
                                            :
                                            friends.map(item => <FriendsListItem item={item}/>)
                                        }
                                    </div>,
                                    <div>
                                        {
                                            loading_reviews
                                            ?
                                            <CircularProgress color="inherit"/>
                                            :
                                            reviews.map(item => <MyReviewItem item={item}/>)
                                        }
                                    </div>,
                                    <div className={classes.likedList}>
                                        <div className={classes.inputContainer}>
                                            <FilledInput placeholder="Type anything here..." isSearch={true}/>
                                        </div>
                                        {
                                            loading_liked
                                            ?
                                            <CircularProgress color="inherit"/>
                                            :
                                            liked.map(item => <WatchlistItem item={item}/>)
                                        }
                                    </div>
                                ]}/>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Navbar/>
        </>
    );
};

export default Account;