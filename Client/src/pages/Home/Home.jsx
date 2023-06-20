import React, {useEffect, useState} from 'react';

import classes from './Home.module.scss';
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import Header from "../../components/other/Header/Header.jsx";
import PostItem from "../../components/items/PostItem/PostItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";
import {
    CircularProgress,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Popover
} from "@mui/material";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import { fetchFeed, fetchFriends,
         setPageFriends, setPageFeed } from '../../store/slices/homePageSlice.js';

const Home = () => {
    const sortOptions = ["Newest", "Most popular"];
    const [sortOption, setSortOption] = useState(sortOptions[0]);
    const [openedTab, setOpenedTab] = useState("Popular");

    const { user } = useSelector(state => state.userData);
    const { loading, error, feedPosts, friendsPosts,
            pageFeed, pageFriends, limit, hasMoreFeed, hasMoreFriends } = useSelector(state => state.homePage);
    const dispatch = useDispatch();

    /*useEffect(() => {
        console.log(sortOption);
    }, [sortOption]);*/

    const [isFilterExpanded, setFilterExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setFilterExpanded(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onFilterChangeClick = (e) => {
        setSortOption(e.target.innerText);
    };

    useEffect(() => {
        console.log('tab changed');
        if(openedTab === "Popular") {
            dispatch(fetchFeed({ filter: sortOption, limit, page: pageFeed}));
            dispatch(setPageFeed({ value: 2 }));
        }
        else {
            dispatch(fetchFriends({ filter: sortOption, limit, page: pageFriends, user_id: user.id}));
            dispatch(setPageFriends({ value: 2 }));
        }
    }, [openedTab]);

    const fetchMoreFeed = () => {
        console.log("Fetched more feed");
        dispatch(fetchFeed({ filter: sortOption, limit, page: pageFeed}));
        dispatch(setPageFeed({ value: pageFeed + 1 }));
    }

    const fetchMoreFriends = () => {
        dispatch(fetchFriends({ filter: sortOption, limit, page: pageFriends, user_id: user.id}));
        dispatch(setPageFriends({ value: pageFriends + 1 }));
    }

    return (
        <>
            <Header title="Home"/>
            <div className={classes.background}>
                <div className={classes.searchPanel}>
                    <div className={classes.inputContainer}>
                        <FilledInput placeholder="Type anything here.."/>
                    </div>
                    <ToggleFilterButton isFilterExpanded={isFilterExpanded} setFilterExpanded={setFilterExpanded}
                                        onClick={handleClick}/>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <List sx={{backgroundColor: '#e3dfdc'}} subheader={
                            <ListSubheader component="div" sx={{backgroundColor: '#e3dfdc'}}>
                                Sort by:
                            </ListSubheader>
                        }>
                            {
                                sortOptions.map(item =>
                                    <ListItemButton onClick={onFilterChangeClick} sx={{background: item === sortOption ? '#f1efed' : '#e3dfdc'}}>
                                        <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500} }}
                                                      primary={item}/>
                                    </ListItemButton>
                                )
                            }
                        </List>
                    </Popover>
                </div>
                <CustomTabs setOpenedTab={setOpenedTab} tabHeaders={ user === null ? ["Popular"] : ["Popular", "Friends"]} tabPanels={[
                    <div className={classes.postsContainer}>
                        <InfiniteScroll next={fetchMoreFeed}
                                        hasMore={hasMoreFeed}
                                        loader={
                                            <div className={classes.loaderContainer}>
                                                <CircularProgress color="inherit"/>
                                            </div>
                                        }
                                        dataLength={feedPosts.length}>
                            {
                                feedPosts.map(item => <PostItem item={item}/>)
                            }
                        </InfiniteScroll>
                    </div>,
                    <div className={classes.postsContainer}>
                        <InfiniteScroll next={fetchMoreFriends}
                                        hasMore={hasMoreFriends}
                                        loader={
                                            <div className={classes.loaderContainer}>
                                                <CircularProgress color="inherit"/>
                                            </div>
                                        }
                                        dataLength={friendsPosts.length}>
                            {
                                friendsPosts.map(item => <PostItem item={item}/>)
                            }
                        </InfiniteScroll>
                    </div>
                ]}/>
            </div>
            <Navbar/>
        </>
    );
};

export default Home;