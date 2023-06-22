import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$authHost, $host} from "../../dataService/index.js";

export const fetchWatchlist = createAsyncThunk(
    "watchlistPage/fetchWatchlist",
    async ({ user_id }, { rejectWithValue}) => {
        try {
            console.log("fetching...")
            const { data } = await $host.get(`api/movie/watchlist`, {
                params: { user_id }
            });
            console.log(data);
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const removeFromWatchlist = createAsyncThunk(
    "watchlistPage/removeFromWatchlist",
    async ({ user_id, movie_id }, { rejectWithValue}) => {
        try {
            const { data } = await $authHost.delete(`api/movie/watchlist`, {
                params: { user_id, movie_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

const watchlistPageSlice = createSlice({
    name: "watchlistPage",
    initialState: {
        error: null,
        loading: false,
        movies: [],
        need_fetch: false,
    },
    reducers: {},
    extraReducers: {
        [fetchWatchlist.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchWatchlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.movies = action.payload.Movies;
            state.need_fetch = false;
        },
        [fetchWatchlist.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [removeFromWatchlist.fulfilled]: (state, action) => {
            state.need_fetch = true;
        },
    }
})

export default watchlistPageSlice.reducer;