import React, {useState} from 'react';
import {Link, useParams} from "react-router-dom";

import {
    BookmarkAdded,
    BookmarkAddOutlined,
    Favorite,
    FavoriteBorder, KeyboardArrowDown, KeyboardArrowUp, Share, West
} from "@mui/icons-material";

import {Avatar, AvatarGroup, IconButton} from "@mui/material";
import Button from "../../components/UI/Button/Button.jsx";
import CircularRating from "../../components/UI/CircularRating/CircularRating.jsx";
import RottenImageRate from "../../components/UI/RottenImageRate/RottenImageRate.jsx";

import classes from './Movie.module.scss';

import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import CastItem from "../../components/items/CastItem/CastItem.jsx";
import CutReviewItem from "../../components/items/CutReviewItem/CutReviewItem.jsx";

const Movie = () => {

    const { id } = useParams();
    const [rotten, setRotten] = useState("68");

    const [isFavClicked, setFavClicked] = useState(false);
    const [isWatchLaterClicked, setWatchLaterClicked] = useState(false);
    const [isCastListExpanded, setCastListExpanded] = useState(false)

    const [castList, setCastList] = useState([
        {
            image: "https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_QL75_UX140_CR0,12,140,140_.jpg",
            name: "Keanu Reeves",
            role: "John Wick",
            href: "#"
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BOWU4MTI2OTctODQ1ZS00MGM1LWJkM2EtODE3MGNkNmIyZDEwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
            name: "Toby Leonard Moore",
            role: "Ms. Perkins",
            href: "#"
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BMTQ4MjM4OTA2OF5BMl5BanBnXkFtZTcwNDM3NzIzOQ@@._V1_QL75_UX140_CR0,13,140,140_.jpg",
            name: "Keanu Reeves",
            role: "John Wick",
            href: "#"
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BMjg5NDg3OTQtYzMyYS00YjhhLTk2NmEtZTExNGViYTczZTU2XkEyXkFqcGdeQXVyMTU1MTU2MDI@._V1_QL75_UX140_CR0,1,140,140_.jpg",
            name: "Keanu Reeves",
            role: "John Wick",
            href: "#"
        },
        {
            image: "https://m.media-amazon.com/images/M/MV5BNTEyMjMxNDg5NF5BMl5BanBnXkFtZTcwNzczOTY4MQ@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
            name: "Keanu Reeves",
            role: "John Wick",
            href: "#"
        },
    ])

    const addToFav = () => {
        setFavClicked(!isFavClicked);
    }

    const addToWatchLater = () => {
        setWatchLaterClicked(!isWatchLaterClicked);
    }

    return (
        <div className={classes.background}>
            <div className={classes.background__image}>
                <img src="https://m.media-amazon.com/images/M/MV5BNzRlMTZmZGItMTEwYS00NTZhLWFhODUtZTVmNGU1NWMzNzgwXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_QL75_UX380_CR0,4,380,562_.jpg"/>
            </div>

            <div className={classes.panel}>
                <div className={classes.panel__controlButtons}>
                    <IconButton className={classes.iconButton}>
                        <West/>
                    </IconButton>
                    <IconButton className={classes.iconButton}>
                        <Share/>
                    </IconButton>
                </div>
                <div className={classes.panel__poster}>
                    <img src="https://m.media-amazon.com/images/M/MV5BNzRlMTZmZGItMTEwYS00NTZhLWFhODUtZTVmNGU1NWMzNzgwXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_QL75_UX190_CR0,2,190,281_.jpg"/>
                    <IconButton className={classes.iconButton} onClick={addToFav}>
                        {
                            isFavClicked ? <Favorite className={classes.iconButton__iconFilled}/> : <FavoriteBorder className={classes.iconButton__iconOutlined}/>
                        }
                    </IconButton>
                </div>
                <div className={classes.titleContainer}>
                    <h1 className={classes.title}>John Wick: Chapter 3 - Parabellum</h1>
                </div>
                <div className={classes.briefDataContainer}>
                    <ul>
                        <li>2019</li>
                        <li>2h 10m</li>
                    </ul>
                </div>
                <div className={classes.ratesContainer}>
                    <div className={classes.ratesContainer__rotten}>
                        <RottenImageRate rate={rotten} className={classes.icon}/>
                        <div>
                            <span>{rotten}%</span>
                            <span>Tomatometer</span>
                        </div>
                    </div>
                    <div className={classes.ratesContainer__imdb}>
                        <img className={classes.icon} src="https://upload.wikimedia.org/wikipedia/commons/c/cc/IMDb_Logo_Square.svg"/>
                        <div className={classes.ratesContainer__imdb__data}>
                            <div className={classes.digits}>
                                <span>7.4</span>
                                <span>/10</span>
                            </div>
                            <span className={classes.label}>IMDb rating</span>
                        </div>
                    </div>
                    <div className={classes.ratesContainer__rotten}>
                        <img className={classes.icon} src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Kinopoisk_colored_favicon.svg"/>
                        <div>
                            <span>7.8</span>
                            <span>Kinopoisk</span>
                        </div>
                    </div>
                    <div className={classes.ratesContainer__rotten}>
                        <img className={classes.icon} src="https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg"/>
                        <div>
                            <span>73</span>
                            <span>Metacritic</span>
                        </div>
                    </div>
                </div>
                <div className={classes.thirdLine}>
                    <div className={classes.thirdLine__watchLater}>
                        <Button variant="outlined" onClick={addToWatchLater}>
                            {isWatchLaterClicked ? <BookmarkAdded/> : <BookmarkAddOutlined/>}
                        </Button>
                        <span>Watch later</span>
                    </div>
                    <div className={classes.thirdLine__avatarGroup}>
                        <AvatarGroup max={3}>
                            <Avatar alt="R" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                            <Avatar alt="R" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                            <Avatar alt="R" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                            <Avatar alt="R" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                        </AvatarGroup>
                        <span>Like this</span>
                    </div>
                    <div className={classes.thirdLine__audienceScore}>
                        <CircularRating percentage={73} size={60}/>
                        <span>Audience <br/> score</span>
                    </div>
                </div>
                <div className={classes.tabContainer}>
                    <Tabs className={classes.tabs} selectedTabClassName={classes.selectedTab}>
                        <TabList className={classes.tabList}>
                            <Tab className={classes.tab}>About</Tab>
                            <Tab className={classes.tab}>Reviews</Tab>
                            <Tab className={classes.tab}>My Review</Tab>
                        </TabList>
                        <TabPanel className={classes.tabPanelAbout}>
                            <h5>Storyline</h5>
                            <p>
                                John Wick is on the run after killing a member of the international assassins' guild,
                                and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
                            </p>
                            <div className={classes.genresContainer}>
                                <Link className={classes.link} to="#">Action</Link>
                                <Link className={classes.link} to="#">Comedy</Link>
                                <Link className={classes.link} to="#">Drama</Link>
                            </div>
                            <div className={classes.castElements}>
                                <div className={classes.headerContainer}>
                                    <h5>Cast</h5>
                                    <Button type="text" color="secondary" onClick={() => setCastListExpanded(!isCastListExpanded)}>
                                        {
                                            isCastListExpanded ?
                                                <>
                                                    Hide
                                                    <KeyboardArrowUp/>
                                                </>
                                                :
                                                <>
                                                    Expand
                                                    <KeyboardArrowDown/>
                                                </>
                                        }
                                    </Button>
                                </div>
                                <div className={isCastListExpanded ? classes.castContainerExpanded : classes.castContainerNotExpanded}>
                                    {
                                        castList.map(item =>
                                            <CastItem item={item}/>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={classes.details}>
                                <h5>Details</h5>
                                <ul>
                                    <li>
                                        Director
                                        <span>Chad Stahelski, David Leitch</span>
                                    </li>
                                    <li>
                                        Release date
                                        <span>April 10, 2015 (United Kingdom)</span>
                                    </li>
                                    <li>
                                        Countries of origin
                                        <span>United States, United Kingdom, China</span>
                                    </li>
                                    <li>
                                        Runtime
                                        <span>1 hour 41 minutes</span>
                                    </li>
                                    <li>
                                        Budget
                                        <span>$200,000,000 (estimated)</span>
                                    </li>
                                    <li>
                                        Gross worldwide
                                        <span>$1,086,081,850</span>
                                    </li>
                                </ul>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <CutReviewItem/>
                            <CutReviewItem/>
                            <CutReviewItem/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Movie;