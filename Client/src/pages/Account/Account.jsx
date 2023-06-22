import React, {useEffect, useState} from 'react';

import classes from './Account.module.scss';
import {Avatar, CircularProgress, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Link, useLocation, useParams} from "react-router-dom";
import {ChangeCircle, ChangeCircleOutlined, Delete, Done, Edit, Logout} from "@mui/icons-material";
import Button from "../../components/UI/Button/Button.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import FriendsListItem from "../../components/items/FriendsListItem/FriendsListItem.jsx";
import TextRating from "../../components/UI/TextRating/TextRating.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import Header from "../../components/other/Header/Header.jsx";

import { fetchAccountData, fetchFriends, fetchLiked,
         fetchReviews, updateUserData, updateUserImage } from "../../store/slices/accountPageSlice.js";

import { logout } from "../../store/slices/userDataSlice.js";

import {useDispatch, useSelector} from "react-redux";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import MyReviewItem from "../../components/items/MyReviewItem/MyReviewItem.jsx";
import LikeListItem from "../../components/items/LikeListItem/LikeListItem.jsx";

const Account = () => {
    const [file, setFile] = useState(null);

    const location = useLocation();
    const [nickname, setNickname] = useState("ChosterChitos");
    const [description, setDescription] = useState("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.")


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);
    const { loading, error, data, friends,
            liked, reviews, loading_friends,
            loading_reviews, loading_liked, need_fetch } = useSelector(state => state.accountPage);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popover_id = open ? 'simple-popper' : undefined;

    const [isEditModeEnabled, setEditModeEnabled] = useState(false);

    const onSaveClick = () => {
        dispatch(updateUserData({ user_id: user.id, nickname, about: description }))
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
        setDescription(data.about);
        setNickname(user.nickname);
    }, []);

    useEffect(() => {
        dispatch(fetchAccountData({ user_id: user.id }));
    }, [need_fetch]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const form_data = new FormData();
        form_data.append('user_id', user.id);
        form_data.append('image', file);

        dispatch(updateUserImage(form_data));
    }

    const handleLogout = () => {
        dispatch(logout({}));
    }

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
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleFileInputChange}
                                    style={{ display: "none" }}
                                />
                                <div className={classes.clickable} onClick={handleClick}>
                                    <Avatar className={classes.profileAvatar} src={`http://localhost:5000/${data.image}`}/>
                                </div>
                                <Popover id={popover_id} open={open} anchorEl={anchorEl} onClose={handleClose}
                                         anchorOrigin={{
                                             vertical: 'bottom',
                                             horizontal: 'left',
                                         }}>
                                    <List sx={{backgroundColor: '#e3dfdc'}}>
                                        <ListItemButton onClick={() => document.getElementById("fileInput").click()}>
                                            <ListItemIcon sx={{color: "#272f32"}}>
                                                <ChangeCircleOutlined/>
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Change"/>
                                        </ListItemButton>
                                        <ListItemButton onClick={handleLogout}>
                                            <ListItemIcon sx={{color: "#272f32"}}>
                                                <Logout/>
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Logout"/>
                                        </ListItemButton>
                                    </List>
                                </Popover>
                            </div>
                            <div className={classes.nameContainer}>
                                <span>{data.full_name}</span>
                                {
                                    isEditModeEnabled
                                        ?
                                        <div className={classes.inputContainer}>
                                            <FilledInput value={nickname} placeholder="Write nickname here..."
                                                         onChange={(e) => setNickname(e.target.value)}/>
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
                                            <FilledInput value={description} multiline={true} placeholder="Write your description here..."
                                                         onChange={(e) => setDescription(e.target.value)}/>
                                        </div>
                                        :
                                        <p>{data.about}</p>
                                }
                            </div>
                            {
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
                                <CustomTabs tabHeaders={["Subs", "My reviews", "Liked"]} tabPanels={[
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
                                        {/*<div className={classes.inputContainer}>
                                            <FilledInput placeholder="Type anything here..." isSearch={true}/>
                                        </div>*/}
                                        {
                                            loading_liked
                                            ?
                                            <CircularProgress color="inherit"/>
                                            :
                                            liked.map(item => <LikeListItem item={item}/>)
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