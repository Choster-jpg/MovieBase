import React, {useState} from 'react';
import Header from "../../components/other/Header/Header.jsx";
import Navbar from "../../components/other/Navbar/Navbar.jsx";
import {IconButton} from "@mui/material";
import {Tune} from "@mui/icons-material";

import classes from './Watchlist.module.scss';
import Chip from "../../components/UI/Chip/Chip.jsx";
import WatchlistItem from "../../components/items/WatchlistItem/WatchlistItem.jsx";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import Autocomplete from "../../components/UI/Autocomplete/Autocomplete.jsx";
import ToggleFilterButton from "../../components/UI/ToggleFilterButton/ToggleFilterButton.jsx";

const Watchlist = () => {
    const [isFilterExpanded, setFilterExpanded] = useState(false);
    const [chipData, setChipData] = useState([]);

    const [genres, setGenres] = useState([
        { key: 0, label: 'Action' },
        { key: 1, label: 'Drama' },
        { key: 2, label: 'Comedy' },
        { key: 3, label: 'Animation' },
        { key: 4, label: 'Mystery' },
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

    return (
        <div>
            <Header title="Watchlist"/>
            <div className={classes.background}>
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
                        <WatchlistItem/>
                        <WatchlistItem/>
                        <WatchlistItem/>
                        <WatchlistItem/>
                        <WatchlistItem/>
                        <WatchlistItem/>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};

export default Watchlist;