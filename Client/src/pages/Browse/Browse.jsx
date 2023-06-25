import React, {useEffect, useRef, useState} from 'react';

import classes from './Browse.module.scss';
import Header from "../../components/other/Header/Header.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Link} from "react-router-dom";
import ForYouItem from "../../components/items/ForYouItem/ForYouItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";
import BrowseItem from "../../components/items/BrowseItem/BrowseItem.jsx";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import {fetchMovies, fetchUsers} from "../../store/slices/browsePageSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, CircularProgress, IconButton} from "@mui/material";
import {PersonAdd} from "@mui/icons-material";
import BrowseUserItem from "../../components/items/BrowseUserItem/BrowseUserItem.jsx";

import { resetBrowseMovies, resetBrowseUsers } from '../../store/slices/browsePageSlice.js';


const Browse = () => {
    const [movieSearchQuery, setMovieSearchQuery] = useState("");
    const [userSearchQuery, setUserSearchQuery] = useState("");

    const onMovieSearchChange = (event) => {
        setMovieSearchQuery(event.target.value);
    }

    const onPeopleSearchChange = (event) => {
        setUserSearchQuery(event.target.value);
    }

    const dispatch = useDispatch();
    const { loading, error, browseMovies, browseUsers } = useSelector(state => state.browsePage);

    const timerIdRef = useRef(null);

    useEffect(() => {
        dispatch(resetBrowseMovies({}));
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
        }
        if(movieSearchQuery)
        {
            timerIdRef.current = setTimeout(async () => {
                dispatch(fetchMovies({query: movieSearchQuery}));
            }, 1000);
        }
    }, [movieSearchQuery]);

    useEffect(() => {
        dispatch(resetBrowseUsers({}));
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
        }
        timerIdRef.current = setTimeout(async () => {
            dispatch(fetchUsers({query: userSearchQuery}));
        }, 1000);
    }, [userSearchQuery]);

    return (
        <div>
            <Header title="Browse"/>
            <div className={classes.background}>
                <div className={classes.tabContainer}>
                    <CustomTabs tabHeaders={["Titles", "People"]} tabPanels={[
                        <>
                            <div className={classes.searchHeader}>
                                <div className={classes.searchBar}>
                                    <FilledInput placeholder="Type anything here..." isSearch={true} value={movieSearchQuery} onChange={onMovieSearchChange}/>
                                </div>
                            </div>
                            <div className={classes.searchContent}>
                                {
                                    movieSearchQuery === "" || loading
                                    ?
                                    <div className={classes.startSearchText}>
                                        {
                                            loading && movieSearchQuery
                                            ?
                                                <CircularProgress color="inherit" />
                                            :
                                                <span>
                                                    Type anything into Input above to search! You can also specify
                                                    <mark> release year</mark> for more accuracy!
                                                </span>
                                        }
                                    </div>
                                    :
                                    <>
                                        {
                                            browseMovies.map((item, index) =>
                                                <BrowseItem index={index} movie={item}/>
                                            )
                                        }
                                    </>
                                }
                            </div>
                        </>,
                        /*<>
                            <section className={classes.contentSection}>
                                <h3>For you</h3>
                                <div className={classes.scrollableList}>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                </div>
                            </section>
                            <section className={classes.contentSection}>
                                <h3>Popular</h3>
                                <div className={classes.scrollableList}>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                    <ForYouItem/>
                                </div>
                            </section>
                        </>,*/
                        <>
                            <div className={classes.searchHeader}>
                                <div className={classes.searchBar}>
                                    <FilledInput placeholder="Type anything here..." isSearch={true} value={userSearchQuery} onChange={onPeopleSearchChange}/>
                                </div>
                            </div>
                            <div className={classes.searchContent}>
                                {
                                    userSearchQuery === "" || loading
                                        ?
                                        <div className={classes.startSearchText}>
                                            {
                                                loading && movieSearchQuery
                                                ?
                                                <CircularProgress color="inherit" />
                                                :
                                                <span>
                                                Type anything into Input above to search! You can specify
                                                <mark> nickname</mark> or <mark> user name</mark>!
                                                </span>
                                            }
                                        </div>
                                        :
                                        <>
                                            {
                                                browseUsers.map((item, index) =>
                                                    <BrowseUserItem user={item}/>
                                                )
                                            }
                                        </>
                                }
                            </div>
                        </>
                    ]}/>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};

export default Browse;