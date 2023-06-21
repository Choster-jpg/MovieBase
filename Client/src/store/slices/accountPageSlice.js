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
            throw new Error(e.response.data.message);
        }
    }
)

export const fetchFriends = createAsyncThunk(
    "accountPage/fetchFriends",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user/friends`, {
                params: { user_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchLiked = createAsyncThunk(
    "accountPage/fetchLiked",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/likelist`, {
                params: { user_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchReviews = createAsyncThunk(
    "accountPage/fetchReviews",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/user`, {
                params: { user_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    data: {},
    friends: [],
    loading_friends: false,
    loading_liked: false,
    loading_reviews: false,
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


        [fetchLiked.pending]: (state, action) => {
            state.loading_liked = true;
        },
        [fetchLiked.fulfilled]: (state, action) => {
            state.loading_liked = false;
            state.liked = action.payload.Movies;
        },
        [fetchLiked.rejected]: (state, action) => {
            state.loading_liked = false;
            state.error = action.payload.message;
        },


        [fetchFriends.pending]: (state, action) => {
            state.loading_friends = true;
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.loading_friends = false;
            state.friends = action.payload;
        },
        [fetchFriends.rejected]: (state, action) => {
            state.loading_friends = false;
            state.error = action.payload.message;
        },


        [fetchReviews.pending]: (state, action) => {
            state.loading_reviews = true;
        },
        [fetchReviews.fulfilled]: (state, action) => {
            state.loading_reviews = false;
            state.reviews = action.payload;
        },
        [fetchReviews.rejected]: (state, action) => {
            state.loading_reviews = false;
            state.error = action.payload.message;
        },
    }
});

export default accountPageSlice.reducer;