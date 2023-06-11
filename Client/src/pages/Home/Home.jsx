import React, {useState} from 'react';

import classes from './Home.module.scss';
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import Header from "../../components/other/Header/Header.jsx";
import PostItem from "../../components/items/PostItem/PostItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";
import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Popover} from "@mui/material";
import {Delete} from "@mui/icons-material";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";

const Home = () => {
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
                            <ListItemButton>
                                <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500} }}
                                              primary="Newest"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText primaryTypographyProps={{ sx: { color: "#272f32", fontFamily: "Montserrat", fontWeight: 500 } }}
                                              primary="Most popular"/>
                            </ListItemButton>
                        </List>
                    </Popover>
                </div>
                <CustomTabs tabHeaders={["Popular", "Subscriptions"]} tabPanels={[
                    <div className={classes.postsContainer}>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                        <PostItem/>
                    </div>,
                    <div className={classes.postsContainer}>
                        sex 2
                    </div>
                ]}/>

            </div>
            <Navbar/>
        </>
    );
};

export default Home;