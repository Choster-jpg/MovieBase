import React, {useState} from 'react';

import classes from './Account.module.scss';
import {Avatar, List, ListItemButton, ListItemIcon, ListItemText, Popover} from "@mui/material";
import {Link} from "react-router-dom";
import {ChangeCircle, ChangeCircleOutlined, Delete, Done, Edit} from "@mui/icons-material";
import Button from "../../components/UI/Button/Button.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import FriendsListItem from "../../components/items/FriendsListItem/FriendsListItem.jsx";
import TextRating from "../../components/UI/TextRating/TextRating.jsx";

const Account = () => {
    const [nickname, setNickname] = useState("ChosterChitos");
    const [description, setDescription] = useState("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.")


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

    return (
        <div className={classes.background}>
            <div className={classes.panel}>
                <div className={classes.avatarContainer}>
                    <Link onClick={handleClick}>
                        <Avatar className={classes.profileAvatar} src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                    </Link>
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
                </div>
                <div className={classes.nameContainer}>
                    <span>Mahershala Ali</span>
                    {
                        isEditModeEnabled
                        ?
                            <div className={classes.inputContainer}>
                                <FilledInput value={nickname} placeholder="Write nickname here..."/>
                            </div>
                        :
                            <span>@{nickname}</span>
                    }
                </div>
                <div className={classes.infoContainer}>
                    <div className={classes.infoBlock}>
                        <span>123</span>
                        <span>Friend</span>
                    </div>
                    <div className={classes.infoBlock}>
                        <span>24</span>
                        <span>Reviews</span>
                    </div>
                    <div className={classes.infoBlock}>
                        <span>1</span>
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
                            <p>{description}</p>
                    }
                </div>
                <div className={classes.buttonsContainer}>
                    {
                        isEditModeEnabled
                        ?
                            <Link className={classes.link} onClick={onSaveClick}>
                                <Done className={classes.icon}/>
                                Save
                            </Link>
                        :
                            <Link className={classes.link} onClick={onEditClick}>
                                <Edit className={classes.icon}/>
                                Edit
                            </Link>
                    }
                </div>
                <div className={classes.tabsContainer}>
                    <Tabs className={classes.tabs} selectedTabClassName={classes.selectedTab}>
                        <TabList className={classes.tabList}>
                            <Tab className={classes.tab}>Friends</Tab>
                            <Tab className={classes.tab}>My reviews</Tab>
                            <Tab className={classes.tab}>Liked</Tab>
                        </TabList>
                        <TabPanel>
                            <div className={classes.friendsList}>
                                <FriendsListItem/>
                                <FriendsListItem/>
                                <FriendsListItem/>
                                <FriendsListItem/>
                                <FriendsListItem/>
                                <FriendsListItem/>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={classes.reviewsList}>
                                <div className={classes.myReviewItem}>
                                    <img src="https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                                    <div className={classes.textContent}>
                                        <h5>The Little Mermaid</h5>
                                        <span>2023</span>
                                        <h5>
                                            <TextRating rate={5.4}/>
                                            That's so awful...
                                        </h5>
                                        <p>
                                            It is a long established fact that a reader
                                            will be distracted by the readable content...
                                            <Link className={classes.link}>Read more</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.myReviewItem}>
                                    <img src="https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                                    <div className={classes.textContent}>
                                        <h5>The Little Mermaid</h5>
                                        <span>2023</span>
                                        <h5>
                                            <TextRating rate={5.4}/>
                                            That's so awful...
                                        </h5>
                                        <p>
                                            It is a long established fact that a reader
                                            will be distracted by the readable content...
                                            <Link className={classes.link}>Read more</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.myReviewItem}>
                                    <img src="https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                                    <div className={classes.textContent}>
                                        <h5>The Little Mermaid</h5>
                                        <span>2023</span>
                                        <h5>
                                            <TextRating rate={5.4}/>
                                            That's so awful...
                                        </h5>
                                        <p>
                                            It is a long established fact that a reader
                                            will be distracted by the readable content...
                                            <Link className={classes.link}>Read more</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.myReviewItem}>
                                    <img src="https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg 380w"/>
                                    <div className={classes.textContent}>
                                        <h5>The Little Mermaid</h5>
                                        <span>2023</span>
                                        <h5>
                                            <TextRating rate={5.4}/>
                                            That's so awful...
                                        </h5>
                                        <p>
                                            It is a long established fact that a reader
                                            will be distracted by the readable content...
                                            <Link className={classes.link}>Read more</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={classes.likedList}>
                                <div className={classes.inputContainer}>
                                    <FilledInput placeholder="Type anything here..." isSearch={true}/>
                                </div>
                                <WatchlistItem/>
                                <WatchlistItem/>
                                <WatchlistItem/>
                                <WatchlistItem/>
                                <WatchlistItem/>
                                <WatchlistItem/>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Account;