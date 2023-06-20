import {createSlice} from "@reduxjs/toolkit";

const navbarState = createSlice({
    name: 'navbarState',
    initialState: {
        selectedIndex: 3
    },
    reducers: {
        setSelectedIndex: (state, { payload }) => {
            state.selectedIndex = payload.value;
        },
    }
});

export const { setSelectedIndex } = navbarState.actions;

export default navbarState.reducer;