import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$authHost, $host} from "../../dataService/index.js"
import {fetchMovies} from "./browsePageSlice.js";

export const fetchAccountData = createAsyncThunk(
    "accountPage/fetchAccountData",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user`, {
                params: { user_id }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
)

export const fetchFriends = createAsyncThunk(
    "accountPage/fetchFriends",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user`, {
                params: { user_id }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const fetchLiked = createAsyncThunk(

);

export const fetchReviews = createAsyncThunk(

);

const initialState = {
    loading: false,
    error: null,
    data: {},
    friends: [],
    liked: [],
    reviews: [],
}

const accountPageSlice = createSlice({
    name: "accountPage",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAccountData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAccountData.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload[0];
        },
        [fetchAccountData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export default accountPageSlice.reducer;