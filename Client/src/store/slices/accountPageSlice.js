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
);

export const fetchAnotherAccountData = createAsyncThunk(
    "accountPage/fetchAnotherAccountData",
    async ({ user_id }, {rejectWithValue}) => {
        try {
            console.log("Fetching");
            const { data } = await $host.get(`api/user`, {
                params: { user_id }
            });
            console.log("Fetched");
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

export const updateUserData = createAsyncThunk(
    "accountPage/updateUserData",
    async ({ user_id, nickname, about }, {rejectWithValue}) => {
        try {
            const { data } = await $host.put(`api/user`, { user_id, nickname, about });
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const updateUserImage = createAsyncThunk(
    "accountPage/updateUserImage",
    async (form_data, {rejectWithValue}) => {
        try {
            const { data } = await $host.put(`api/user/image`, form_data);
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const checkIsUserIsFriend = createAsyncThunk(
    "accountPage/checkIsUserIsFriend",
    async ({ searched_user_id, searching_user_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/user/friends/check`, {
                params: { searched_user_id, searching_user_id }
            });
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const addFriend = createAsyncThunk(
    "accountPage/addFriend",
    async ({ friend_owner_id, friend_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/user/friends`, { friend_owner_id, friend_id });
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const removeFriend = createAsyncThunk(
    "accountPage/removeFriend",
    async ({ friend_owner_id, friend_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.delete(`api/user/friends`, {
                params: { friend_owner_id, friend_id }
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
    otherUserData: {},
    friends: [],
    loading_friends: false,
    loading_liked: false,
    loading_reviews: false,
    liked: [],
    reviews: [],
    need_fetch: false,
    is_another_user_friend: false,
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
            state.need_fetch = false;
        },
        [fetchAccountData.rejected]: (state, action) => {
            state.loading = false;
            state.need_fetch = false;
            state.error = action.payload.message;
        },


        [fetchAnotherAccountData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAnotherAccountData.fulfilled]: (state, action) => {
            state.loading = false;
            state.otherUserData = action.payload[0];
        },
        [fetchAnotherAccountData.rejected]: (state, action) => {
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


        [updateUserData.fulfilled]: (state, action) => {
            state.need_fetch = true;
        },

        [updateUserImage.fulfilled]: (state, action) => {
            state.need_fetch = true;
        },


        [checkIsUserIsFriend.fulfilled]: (state, action) => {
            state.is_another_user_friend = !!action?.payload;
            state.need_fetch = false;
        },

        [addFriend.fulfilled]: (state, action) => {
            state.need_fetch = true;
        },
        [removeFriend.fulfilled]: (state, action) => {
            state.need_fetch = true;
        },
    }
});

export default accountPageSlice.reducer;