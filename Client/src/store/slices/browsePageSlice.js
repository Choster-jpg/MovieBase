import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js"

export const fetchMovies = createAsyncThunk(
    "browsePage/fetchMovies",
    async ({query, limit}, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie`, {
                params: { query, limit }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "browsePage/fetchUsers",
    async ({ query }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user/find`, {
                params: { query }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

const initialState = {
    loading: false,
    error: "",
    browseMovies: [],
    browseUsers: [],
};

const browsePageSlice = createSlice({
    name: "browsePage",
    initialState,
    reducers: {
        resetBrowseMovies: (state, { payload }) => {
            state.browseMovies = [];
        },
        resetBrowseUsers: (state, { payload }) => {
            state.browseUsers = [];
        },
    },
    extraReducers: {
        [fetchMovies.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.loading = false;
            state.browseMovies = action.payload;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.browseUsers = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export const { resetBrowseMovies, resetBrowseUsers } = browsePageSlice.actions;

export default browsePageSlice.reducer;