import React, {useState} from 'react';

import classes from './Browse.module.scss';
import Header from "../../components/other/Header/Header.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Link} from "react-router-dom";
import ForYouItem from "../../components/items/ForYouItem/ForYouItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";
import BrowseItem from "../../components/items/BrowseItem/BrowseItem.jsx";

const Browse = () => {
    const [isFilterExpanded, setFilterExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const onSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div>
            <Header title="Browse"/>
            <div className={classes.background}>
                <div className={classes.tabContainer}>
                    <Tabs className={classes.tabs} selectedTabClassName={classes.selectedTab}>
                        <TabList className={classes.tabList}>
                            <Tab className={classes.tab}>Browse</Tab>
                            <Tab className={classes.tab}>For you</Tab>
                            <Tab className={classes.tab}>People</Tab>
                        </TabList>
                        <TabPanel>
                            <div className={classes.searchHeader}>
                                <div className={classes.searchBar}>
                                    <FilledInput placeholder="Type anything here..." isSearch={true} value={searchQuery} onChange={onSearchChange}/>
                                    <ToggleFilterButton isFilterExpanded={isFilterExpanded} setFilterExpanded={setFilterExpanded}/>
                                </div>
                                <div hidden={!isFilterExpanded}>
                                    <div className={classes.expandedFilter}>
                                        <FilledInput />
                                        <span>Year</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.searchContent}>
                                {
                                    searchQuery === ""
                                        ?
                                        <div className={classes.startSearchText}>
                                            <span>
                                                Type anything into Input above to search! Use <mark>year filter</mark> for more accuracy!
                                            </span>
                                        </div>
                                        :
                                        <>
                                            <BrowseItem/>
                                            <BrowseItem/>
                                            <BrowseItem/>
                                            <BrowseItem/>
                                        </>
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
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
                        </TabPanel>
                        <TabPanel>
                            Sex 3
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};

export default Browse;