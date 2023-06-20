import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";
import {fetchMovies} from "./browsePageSlice.js";

export const fetchFeed = createAsyncThunk(
    "homePage/fetchFeed",
    async ({ filter, page, limit }, {rejectWithValue}) => {
        try {
            console.log('zapros poshel')
            const { data } = await $host.get(`api/review/feed`, {
                params: { filter, page, limit }
            });
            console.log(data);

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
    feedPosts: [],
    friendsPosts: [],
    pageFeed: 1,
    pageFriends: 1,
    limit: 5,
    hasMoreFeed: true,
    hasMoreFriends: true,
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
    },
    extraReducers: {
        [fetchFeed.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchFeed.fulfilled]: (state, action) => {
            console.log("fetch feed fulfilled");
            state.loading = false;
            /*state.feedPosts = state.feedPosts.concat(action.payload.filter(item =>
                !state.feedPosts.some(element => element.id === item.id)
            ));*/

            state.feedPosts = state.feedPosts.concat(action.payload);
            if(action.payload.length < state.limit)
            {
                state.hasMoreFeed = false;
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
            console.log("fetch friends fulfilled");
            state.loading = false;
            state.friendsPosts = state.friendsPosts.concat(action.payload);
            if(action.payload.length < state.limit)
            {
                state.hasMoreFriends = false;
            }
        },
        [fetchFriends.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export const { setPageFriends, setPageFeed } = homePageSlice.actions;

export default homePageSlice.reducer;

