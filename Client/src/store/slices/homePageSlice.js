import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";
import {fetchMovies} from "./browsePageSlice.js";

export const fetchFeed = createAsyncThunk(
    "homePage/fetchFeed",
    async ({ filter, page, limit }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/feed`, {
                params: { filter, page, limit }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchFriends = createAsyncThunk(
    "homePage/fetchFriends",
    async ({ user_id, filter, limit, page }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/friends`, {
                params: { user_id, filter, limit, page }
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
    posts: [],
    page: 1,
    limit: 1000,
    hasMore: true,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPageFeed: (state, { payload }) => {
            state.pageFeed = payload.value;
        },
        setPageFriends: (state, { payload }) => {
            state.pageFriends = payload.value;
        },
        resetPosts: (state) => {
            state.posts = [];
            state.page = 1;
            state.hasMore = true;
        }
    },
    extraReducers: {
        [fetchFeed.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchFeed.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.posts = state.posts.concat(action.payload.filter(item =>
                !state.posts.some(element => element.id === item.id)
            ));

            if(action.payload.length < state.limit )
            {
                state.hasMore = false;
            }
        },
        [fetchFeed.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },


        [fetchFriends.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = state.posts.concat(action.payload.filter(item =>
                !state.posts.some(element => element.id === item.id)
            ));

            if(action.payload.length < state.limit)
            {
                state.hasMore = false;
            }
        },
        [fetchFriends.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export const { setPageFriends, setPageFeed, resetPosts } = homePageSlice.actions;

export default homePageSlice.reducer;

