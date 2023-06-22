import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host, $authHost} from "../../dataService/index.js";

export const fetchMovieData = createAsyncThunk(
    "moviePage/fetchDataFast",
    async ({ title, year, imdb_link }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/info`, {
                params: { title, year, imdb_link }
            });

            console.log(data);

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const getIsInLikeList = createAsyncThunk(
    "moviePage/fetchIsInLikeList",
    async ({ movie_id, user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/likelist/check`, {
                params: { movie_id, user_id }
            });

            return data;
        }
        catch (e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const getIsInWatchList = createAsyncThunk(
    "moviePage/fetchIsInWatchList",
    async ({ movie_id, user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/watchlist/check`, {
                params: { movie_id, user_id }
            });

            return data;
        }
        catch (e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const fetchFriendsThatLiked = createAsyncThunk(
    "moviePage/fetchFriendsThatLiked",
    async({ user_id, movie_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user/friends/like`, {
                params: { user_id, movie_id }
            });

            return data;
        }
        catch (e) {
            rejectWithValue(e.response.data);
        }
    }
)

export const fetchAudienceScore = createAsyncThunk(
    "moviePage/fetchAudienceScore",
    async({ movie_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/info/score`, {
                params: { movie_id }
            });

            return data;
        }
        catch (e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const fetchMovieReviews = createAsyncThunk(
    "moviePage/fetchMovieReviews",
    async({ movie_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/movie`, {
                params: { movie_id }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const addToWatchList = createAsyncThunk(
    "moviePage/addToWatchList",
    async({ user_id, movie }, {rejectWithValue}) => {
        try {
            const { data } = await $authHost.post(`api/movie/watchlist`, { user_id, movie });
            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const removeFromWatchList = createAsyncThunk(
    "moviePage/removeFromWatchList",
    async({ user_id, movie_id }, {rejectWithValue}) => {
        try {
            const { data } = await $authHost.delete(`api/movie/watchlist`, {
                params: { user_id, movie_id }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const addToLikeList = createAsyncThunk(
    "moviePage/addToLikeList",
    async({ user_id, movie }, {rejectWithValue}) => {
        try {
            const { data } = await $authHost.post(`api/movie/likelist`, { user_id, movie });
            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);

export const removeFromLikeList = createAsyncThunk(
    "moviePage/removeFromLikeList",
    async({ user_id, movie_id }, {rejectWithValue}) => {
        try {
            const { data } = await $authHost.delete(`api/movie/likelist`, {
                params: { user_id, movie_id }
            });

            return data;
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
);


const initialState = {
    loading: true,
    loading_reviews: true,
    error: "",
    movie: {},
    isInLikeList: false,
    isInWatchList: false,
    friendsList: [],
    audienceScore: 0,
    reviews: [],
    buttons_disabled: false,
};

const moviePageSlice = createSlice({
    name: "moviePage",
    initialState,
    reducers: {
        resetPage: (state) => {
            state.friendsList = [];
            state.isInWatchList = false;
            state.isInLikeList = false;
        }
    },
    extraReducers: {
        [fetchMovieData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchMovieData.fulfilled]: (state, action) => {
            state.loading = false;
            state.movie = action.payload;
        },
        [fetchMovieData.rejected]: (state, action) => {
            state.loading = false;
            state.error += action.payload.message;
        },


        [getIsInLikeList.fulfilled]: (state, action) => {
            state.isInLikeList = action.payload !== false;
        },
        [getIsInLikeList.rejected]: (state, action) => {
            state.error += action.payload.message;
        },


        [getIsInWatchList.fulfilled]: (state, action) => {
            state.isInWatchList = action.payload !== false;
        },
        [getIsInWatchList.rejected]: (state, action) => {
            state.error += action.payload.message;
        },


        [fetchMovieReviews.pending]: (state, action) => {
            state.loading_reviews = true;
        },
        [fetchMovieReviews.fulfilled]: (state, action) => {
            state.loading_reviews = false;
            state.reviews = action.payload;
        },
        [fetchMovieReviews.rejected]: (state, action) => {
            state.loading_reviews = false;
            state.error += action.payload.message;
        },


        [fetchAudienceScore.fulfilled]: (state, action) => {
            state.audienceScore = Math.round(action.payload.avg_rating * 10);
        },


        [fetchFriendsThatLiked.fulfilled]: (state, action) => {
            state.friendsList = action.payload;
        },

        [addToWatchList.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [addToWatchList.fulfilled]: (state, action) => {
            state.isInWatchList = true;
            state.buttons_disabled = false;
        },

        [removeFromWatchList.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [removeFromWatchList.fulfilled]: (state, action) => {
            state.isInWatchList = false;
            state.buttons_disabled = false;
        },


        [addToLikeList.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [addToLikeList.fulfilled]: (state, action) => {
            console.log("added");
            state.isInLikeList = true;
            state.buttons_disabled = false;
        },

        [removeFromLikeList.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [removeFromLikeList.fulfilled]: (state, action) => {
            console.log("removed");
            state.isInLikeList = false;
            state.buttons_disabled = false;
        },
    }
});

export const { resetPage } = moviePageSlice.actions;

export default moviePageSlice.reducer;