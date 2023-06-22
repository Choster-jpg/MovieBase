import React, {useEffect, useState} from 'react';
import Header from "../../components/other/Header/Header.jsx";
import {
    Avatar,
    CircularProgress,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover
} from "@mui/material";
import {
    ChangeCircleOutlined,
    Done,
    Edit,
    HomeRounded,
    Logout,
    PersonAdd,
    PersonRemove,
    West
} from "@mui/icons-material";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import FriendsListItem from "../../components/items/FriendsListItem/FriendsListItem.jsx";
import MyReviewItem from "../../components/items/MyReviewItem/MyReviewItem.jsx";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";

import {
    fetchAccountData,
    fetchAnotherAccountData,
    fetchFriends,
    fetchLiked, fetchReviews,
    checkIsUserIsFriend, addFriend, removeFriend
} from "../../store/slices/accountPageSlice.js";

import classes from "./UserAccount.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import LikeListItem from "../../components/items/LikeListItem/LikeListItem.jsx";

const UserAccount = () => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popover_id = open ? 'simple-popper' : undefined;

    const dispatch = useDispatch();
    const { loading, error, otherUserData, friends, liked, reviews, need_fetch,
            loading_friends, loading_liked, loading_reviews, is_another_user_friend } = useSelector(state => state.accountPage);

    const { user } = useSelector(state => state.userData);

    const { id } = useParams();

    useEffect(() => {
        if(user?.id == id) navigate('/account');
        console.log(id);
        dispatch(fetchAnotherAccountData({ user_id: id }));
        dispatch(fetchFriends({ user_id: id }));
        dispatch(fetchLiked({ user_id: id }));
        dispatch(fetchReviews({ user_id: id }));
        if(user) {
            dispatch(checkIsUserIsFriend({searched_user_id: id, searching_user_id: user.id}));
        }
    }, [id]);

    useEffect(() => {
        if(user) {
            dispatch(checkIsUserIsFriend({searched_user_id: id, searching_user_id: user.id}));
        }
    }, [need_fetch])

    const onSubscribeClick = () => {
        dispatch(addFriend({ friend_owner_id: user.id, friend_id: id }));
    }

    const onUnsubscribeClick = () => {
        dispatch(removeFriend({ friend_owner_id: user.id, friend_id: id }));
    }

    return (
        <>
            <div className={classes.background}>
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
                <div className={classes.panel}>
                    {
                        loading
                            ?
                            <CircularProgress color="inherit"/>
                            :
                            <>
                                <div className={classes.avatarContainer}>
                                    <div className={classes.clickable} onClick={handleClick}>
                                        <Avatar className={classes.profileAvatar} src={`http://localhost:5000/${otherUserData.image}`}/>
                                    </div>
                                    {
                                        user === null
                                        ?
                                        <>
                                        </>
                                        :
                                        <Popover id={popover_id} open={open} anchorEl={anchorEl} onClose={handleClose}
                                                 anchorOrigin={{
                                                     vertical: 'bottom',
                                                     horizontal: 'left',
                                                 }}>
                                            <List sx={{backgroundColor: '#e3dfdc'}}>
                                                {
                                                    is_another_user_friend
                                                    ?
                                                    <ListItemButton onClick={onUnsubscribeClick}>
                                                        <ListItemIcon sx={{color: "#272f32"}}>
                                                            <PersonRemove/>
                                                        </ListItemIcon>
                                                        <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Unsubscribe"/>
                                                    </ListItemButton>
                                                    :
                                                    <ListItemButton onClick={onSubscribeClick}>
                                                        <ListItemIcon sx={{color: "#272f32"}}>
                                                            <PersonAdd/>
                                                        </ListItemIcon>
                                                        <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500, marginLeft: "-20px" } }} primary="Subscribe"/>
                                                    </ListItemButton>
                                                }
                                            </List>
                                        </Popover>
                                    }
                                </div>
                                <div className={classes.nameContainer}>
                                    <span>{otherUserData.full_name}</span>
                                    <span>@{otherUserData.nickname}</span>
                                </div>
                                <div className={classes.infoContainer}>
                                    <div className={classes.infoBlock}>
                                        <span>{ otherUserData.friends }</span>
                                        <span>{ otherUserData.friends === 1 ? "Friend" : "Friends"}</span>
                                    </div>
                                    <div className={classes.infoBlock}>
                                        <span>{ otherUserData.reviews}</span>
                                        <span>{ otherUserData.reviews === 1 ? "Review" : "Reviews"}</span>
                                    </div>
                                    <div className={classes.infoBlock}>
                                        <span>{otherUserData.likes}</span>
                                        <span>Liked</span>
                                    </div>
                                </div>
                                <div className={classes.aboutContainer}>
                                    <p>{otherUserData.about}</p>
                                </div>
                                <div className={classes.tabsContainer}>
                                    <CustomTabs tabHeaders={["Subs", "Reviews", "Liked"]} tabPanels={[
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
        </>
    );
};

export default UserAccount;