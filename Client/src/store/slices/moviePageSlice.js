import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";

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
    async({ user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user/friends/like`, {
                params: { user_id }
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
    async({ imdb_link }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/movie/info/score`, {
                params: { imdb_link }
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
            const { data } = await $host.get(`api/movie/info/score`, {
                params: { imdb_link }
            });
        }
        catch(e) {
            rejectWithValue(e.response.data);
        }
    }
)


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
};

const moviePageSlice = createSlice({
    name: "moviePage",
    initialState,
    reducers: {
        setIsInLikeList: (state, { payload }) => {
            state.isInLikeList = payload.value;
        },
        setIsInWatchList: (state, { payload }) => {
            state.isInWatchList = payload.value;
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
            state.isInLikeList = action.payload;
        },
        [getIsInLikeList.rejected]: (state, action) => {
            state.error += action.payload.message;
        },


        [getIsInWatchList.fulfilled]: (state, action) => {
            state.isInWatchList = action.payload;
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
    }
});

export const { setIsInLikeList, setIsInWatchList } = moviePageSlice.actions;

export default moviePageSlice.reducer;