import React from 'react';
import {Popper, TextField} from "@mui/material";
import {Autocomplete as MuiAutocomplete} from "@mui/material";

import classes from "./Autocomplete.module.scss";

const Autocomplete = ({options, onChange, value}) => {

    const PopperMy = React.useCallback((props) => {
        const anchorEl = document.getElementById('myAutocomplete');
        return <Popper {...props} anchorEl={anchorEl} style={{ width: anchorEl.clientWidth}} placement='bottom' />;
    }, []);

    return (
        <MuiAutocomplete id="myAutocomplete" renderInput={(params) =>
            <TextField {...params} label="Genre" variant="filled" className={classes.customInput} />}
        options={options} disablePortal className={classes.customAutocomplete}
        PopperComponent={PopperMy} onChange={onChange}/>
    );
};

export default Autocomplete;