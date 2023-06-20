import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {
    BookmarkAdded,
    BookmarkAddOutlined,
    Favorite,
    FavoriteBorder, KeyboardArrowDown, KeyboardArrowUp, Share, West
} from "@mui/icons-material";

import {Avatar, AvatarGroup, CircularProgress, IconButton} from "@mui/material";
import Button from "../../components/UI/Button/Button.jsx";
import CircularRating from "../../components/UI/CircularRating/CircularRating.jsx";
import RottenImageRate from "../../components/UI/RottenImageRate/RottenImageRate.jsx";

import classes from './Movie.module.scss';

import CastItem from "../../components/items/CastItem/CastItem.jsx";
import CutReviewItem from "../../components/items/CutReviewItem/CutReviewItem.jsx";
import CustomTabs from "../../components/UI/CustomTabList/CustomTabs.jsx";
import {useDispatch, useSelector} from "react-redux";

import {fetchMovieData,
        getIsInLikeList,
        getIsInWatchList,
        fetchFriendsThatLiked,
        fetchAudienceScore } from "../../store/slices/moviePageSlice.js";
import { setIsInLikeList, setIsInWatchList } from '../../store/slices/moviePageSlice.js';

const Movie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { title, year } = location.state;
    const [isCastListExpanded, setCastListExpanded] = useState(false);
    const dispatch = useDispatch();
    const { loading, loading_slow, error,
            movie, isInLikeList, isInWatchList,
            friendsList, audienceScore } = useSelector(state => state.moviePage);

    const addToFav = () => {
        dispatch(setIsInLikeList({ value: !isInLikeList }));
    }

    const addToWatchLater = () => {
        dispatch(setIsInWatchList({ value: !isInWatchList }));
    }

    useEffect(() => {
        dispatch(fetchMovieData({title, year, imdb_link: id}));
    }, []);

    useEffect(() => {
        if(movie.id)
        {
            dispatch(fetchFriendsThatLiked({user_id: 1}));
            dispatch(fetchAudienceScore({imdb_link: id}));
            dispatch(getIsInWatchList({ movie_id: movie.id, user_id: 1}));
            dispatch(getIsInLikeList({ movie_id: movie.id, user_id: 1}))
        }
    }, [movie])

    const onAddReviewClick = () => {
        navigate('/review/new', { state: { movie: {...movie, title, year, imdb_link: id} }});
    }

    return (
        <div className={classes.background}>
            <div className={classes.background__image}>
                <picture>
                    <source srcSet={movie.poster}/>
                    <source srcSet={`https://localhost:5000/${movie.poster}`}/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                         alt="background image of the page"/>
                </picture>
            </div>

            <div className={classes.panel}>
                {
                    loading
                    ?
                    <CircularProgress color="inherit" />
                    :
                    <>
                        <div className={classes.panel__controlButtons}>
                            <IconButton className={classes.iconButton}
                                        onClick={() => {navigate(-1)}}>
                                <West/>
                            </IconButton>
                            {/*
                                <IconButton className={classes.iconButton}>
                                    <Share/>
                                </IconButton>
                            */}
                        </div>
                        <div className={classes.adaptiveContainer}>
                            <div className={classes.panel__poster}>
                                <picture>
                                    <source srcSet={movie.poster}/>
                                    <source srcSet={`https://localhost:5000/${movie.poster}`}/>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                                         alt="background image of the page"/>
                                </picture>
                                <IconButton className={classes.iconButton} onClick={addToFav}>
                                    {
                                        isInLikeList
                                        ?
                                        <Favorite className={classes.iconButton__iconFilled}/>
                                        :
                                        <FavoriteBorder className={classes.iconButton__iconOutlined}/>
                                    }
                                </IconButton>
                            </div>
                            <div className={classes.adaptiveContentContainer}>
                                <div className={classes.titleContainer}>
                                    <h1 className={classes.title}>{title}</h1>
                                </div>
                                <div className={classes.briefDataContainer}>
                                    <ul>
                                        <li>{year}</li>
                                        <li>{movie.runtime}</li>
                                    </ul>
                                </div>
                                <div className={classes.ratesContainer}>
                                    <div className={classes.rotten}>
                                        <RottenImageRate rate={movie.rotten_rate} className={classes.icon}/>
                                        <div>
                                            <span>{movie.rotten_rate || "--"}</span>
                                            <span>Tomatometer</span>
                                        </div>
                                    </div>
                                    <div className={classes.rotten}>
                                        <img className={classes.icon}
                                             src="https://upload.wikimedia.org/wikipedia/commons/c/cc/IMDb_Logo_Square.svg"
                                             alt="Imdb logo"/>
                                        <div className={classes.data}>
                                            <div className={classes.digits}>
                                                <span>{movie.imdb_rate || "--"}</span>
                                                <span>/10</span>
                                            </div>
                                            <span className={classes.label}>IMDb rating</span>
                                        </div>
                                    </div>
                                    <div className={classes.rotten}>
                                        <img className={classes.icon}
                                             src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Kinopoisk_colored_favicon.svg"
                                             alt="Kinopoisk logo"/>
                                        <div>
                                            <span>{movie.kinopoisk_rate || "--"}</span>
                                            <span>Kinopoisk</span>
                                        </div>
                                    </div>
                                    <div className={classes.rotten}>
                                        <img className={classes.icon}
                                             src="https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg"
                                             alt="Metacritic logo"/>
                                        <div>
                                            <span>{movie.metacritic_rate || "--"}</span>
                                            <span>Metacritic</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.statisticsContainer}>
                                    <div className={classes.watchLater}>
                                        <Button variant="outlined" onClick={addToWatchLater}>
                                            {isInWatchList ? <BookmarkAdded/> : <BookmarkAddOutlined/>}
                                        </Button>
                                        <span>{isInWatchList ? "Saved!" : "Watch later"}</span>
                                    </div>
                                    <div className={classes.avatarGroup}>
                                        <AvatarGroup max={3}>
                                            {
                                                friendsList.length > 0
                                                    ?
                                                friendsList.map(item => <Avatar src={item}/>)
                                                    :
                                                <span className={classes.placeholder}>no one from <br/>your friends yet :(</span>
                                            }
                                        </AvatarGroup>
                                        <span>Like this</span>
                                    </div>
                                    <div className={classes.audienceScore}>
                                        <CircularRating percentage={audienceScore} size={60}/>
                                        <span>Audience <br/> score</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.tabContainer}>
                            <CustomTabs tabHeaders={["About", "Reviews"]} tabPanels={[
                                <div className={classes.tabPanelAbout}>
                                    <h5>Storyline</h5>
                                    <p>
                                        {movie.plot}
                                    </p>
                                    <div className={classes.genresContainer}>
                                        {
                                            movie.genres.map
                                            ?
                                            movie.genres.map(item => <span className={classes.link}>{item}</span>)
                                            :
                                            movie.genres.split(',').map(item => <span className={classes.link}>{item}</span>)
                                        }
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
                                                loading_slow
                                                ?
                                                <CircularProgress color="inherit"/>
                                                :
                                                    movie.cast
                                                    ?
                                                    movie.cast.map(item =>
                                                    <CastItem item={item}/>)
                                                    :
                                                    movie.Celebrities.map(item =>
                                                    <CastItem item={item}/>)
                                            }
                                        </div>
                                    </div>
                                    <div className={classes.details}>
                                        <h5>Details</h5>
                                        <ul>
                                            <li>
                                                Director
                                                <span>{movie.director}</span>
                                            </li>
                                            <li>
                                                Release date
                                                <span>{movie.release_date}</span>
                                            </li>
                                            <li>
                                                Countries
                                                <span>{movie.counties}</span>
                                            </li>
                                            <li>
                                                Runtime
                                                <span>{movie.runtime}</span>
                                            </li>
                                            <li>
                                                Budget
                                                <span>{movie.budget}</span>
                                            </li>
                                            <li>
                                                Gross worldwide
                                                <span>{movie.gross}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>,
                                <div className={classes.tabPanel}>
                                    <div className={classes.reviewsContainer}>
                                        <span className={classes.link}
                                              onClick={onAddReviewClick}>
                                            I want to write my own!
                                        </span>
                                        <CutReviewItem/>
                                        <CutReviewItem/>
                                        <CutReviewItem/>
                                    </div>
                                </div>
                            ]}/>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Movie;