import React, {useEffect, useState} from 'react';
import Header from "../../components/other/Header/Header.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import {CircularProgress, IconButton} from "@mui/material";
import {Tune} from "@mui/icons-material";

import classes from './Watchlist.module.scss';
import Chip from "../../components/UI/Chip/Chip.jsx";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import Autocomplete from "../../components/UI/Autocomplete/Autocomplete.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";
import {useDispatch, useSelector} from "react-redux";

import { fetchWatchlist } from "../../store/slices/watchlistPageSlice.js";

const Watchlist = () => {
    const { loading, error, movies, need_fetch } = useSelector(state => state.watchlistPage);
    const { user } = useSelector(state => state.userData);

    const dispatch = useDispatch();

    const [isFilterExpanded, setFilterExpanded] = useState(false);
    const [chipData, setChipData] = useState([]);

    const [genres, setGenres] = useState([
        { key: 0, label: 'Action' },
        { key: 1, label: 'Drama' },
        { key: 2, label: 'Comedy' },
        { key: 3, label: 'Animation' },
        { key: 5, label: 'Adventure' },
        { key: 6, label: 'Biography' },
        { key: 7, label: 'Crime' },
        { key: 8, label: 'Documentary' },
        { key: 9, label: 'Family' },
        { key: 10, label: 'Sci-Fi' },
        { key: 11, label: 'Fantasy' },
        { key: 12, label: 'Horror' },
        { key: 13, label: 'Musical' },
        { key: 14, label: 'Mystery' },
        { key: 15, label: 'War' },
        { key: 16, label: 'Sport' },
        { key: 17, label: 'Romance' },
        { key: 18, label: 'Thriller' },
        { key: 19, label: 'Western' },
        { key: 20, label: 'History' },
    ]);

    const onAutocompleteChange = (event, value) => {
        if(value)
        {
            setChipData([...chipData, value]);
            setGenres(genres.filter(el => el.key !== value.key));
            value = "";
        }
    }

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        setGenres([...genres, chipToDelete]);
    };

    useEffect(() => {
        dispatch(fetchWatchlist({user_id: user.id}));
    }, []);

    useEffect(() => {
        dispatch(fetchWatchlist({user_id: user.id}));
    }, [need_fetch]);

    return (
        <div>
            <Header title="Watchlist"/>
            <div className={classes.background}>
                {
                    !loading
                    ?
                    <>
                        <div className={classes.header}>
                            <Autocomplete options={genres} onChange={onAutocompleteChange}/>
                            <ToggleFilterButton isFilterExpanded={isFilterExpanded} setFilterExpanded={setFilterExpanded}/>
                        </div>
                        <div className={classes.chipList}>
                            {
                                chipData.map((data) => {
                                    return (
                                        <Chip label={data.label} onDelete={handleDelete(data)}/>
                                    );
                                })}
                        </div>
                        <div hidden={!isFilterExpanded}>
                            <div className={classes.extendedFilters}>
                                <span>between</span>
                                <div className={classes.year}>
                                    <FilledInput/>
                                </div>
                                <span>and</span>
                                <div className={classes.year}>
                                    <FilledInput/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.content}>
                            <h3>Saved titles</h3>
                            <div>
                                {
                                    movies.map(item => <WatchlistItem item={item}/>)
                                }
                            </div>
                        </div>
                    </>
                    :
                    <CircularProgress color="inherit"/>
                }
            </div>
            <Navbar/>
        </div>
    );
};

export default Watchlist;