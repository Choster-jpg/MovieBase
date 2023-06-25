import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";
import {getPublicationDate} from "../../utils/getPublicationDate.js";

export const fetchReviewData = createAsyncThunk(
    "reviewPage/fetchReviewData",
    async ({ review_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review`, {
                params: { review_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchReviewReactions = createAsyncThunk(
    "reviewPage/fetchReviewReactions",
    async ({ review_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/reaction`, {
                params: { review_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchReviewComments = createAsyncThunk(
    "reviewPage/fetchReviewComments",
    async ({ review_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/comment`, {
                params: { review_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchCommentReplies = createAsyncThunk(
    "reviewPage/fetchCommentReplies",
    async ({ comment_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/comment/reply`, {
                params: { comment_id }
            });

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const fetchUserReaction = createAsyncThunk(
    "reviewPage/fetchUserReaction",
    async ({ user_id, review_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.get(`api/review/reaction/user`, {
                params: { user_id, review_id }
            });

            console.log(data);

            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const createComment = createAsyncThunk(
    "reviewPage/createComment",
    async ({text, user_id, review_id}, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/comment/`, {text, user_id, review_id});
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const createReply = createAsyncThunk(
    "reviewPage/createReply",
    async ({ text, user_id, comment_id }, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/comment/reply`, { text, user_id, comment_id });
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const likeReview = createAsyncThunk(
    "reviewPage/likeReview",
    async (reactionData, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/review/reaction`, reactionData);
            console.log("liked")
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const dislikeReview = createAsyncThunk(
    "reviewPage/dislikeReview",
    async (reactionData, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/review/reaction`, reactionData);
            console.log("disliked");
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const clearReaction = createAsyncThunk(
    "reviewPage/ clearReaction",
    async (reactionData, {rejectWithValue}) => {
        try {
            console.log(reactionData);
            const { data } = await $host.delete(`api/review/reaction`, {
                params: {...reactionData}
            });
            console.log("reaction cleared");
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
    comments: [],
    replies: [],
    data: {},
    user_reaction: null,
    reply_item: null,
    input_text: "",
    buttons_disabled: false,
    need_fetch: false,
    dislikes: 0,
    likes: 0
}

const reviewPageSlice = createSlice({
    name: 'reviewPage',
    initialState,
    reducers: {
        resetReplies: (state, { payload }) => {
            state.replies = [];
        },
        setReplyItem: (state, { payload }) => {
            state.reply_item = payload;
        },
        setInputText: (state, { payload }) => {
            state.input_text = payload;
        },
        resetNeedFetch: (state) => {
            state.need_fetch = false;
        }
    },
    extraReducers: {
        [fetchReviewData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchReviewData.fulfilled]: (state, action) => {
            state.data = action.payload;

            const { timeFormatted, dateFormatted } = getPublicationDate(new Date(state.data.createdAt))
            state.data.timeFormatted = timeFormatted;
            state.data.dateFormatted = dateFormatted;
        },
        [fetchReviewData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [fetchReviewReactions.fulfilled]: (state, action) => {
            state.loading = false;
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
        },


        [fetchReviewComments.fulfilled]: (state, action) => {
            state.comments = action.payload;
            state.loading = false;
        },

        [fetchCommentReplies.fulfilled]: (state, action) => {
            state.replies = state.replies.concat(action.payload.filter(item =>
                !state.replies.some(element => element.id === item.id)
            ));
        },

        [fetchUserReaction.fulfilled]: (state, action) => {
            state.user_reaction = action.payload?.reaction_type;
        },


        [likeReview.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [likeReview.fulfilled]: (state, action) => {
            state.user_reaction = "like";
            state.buttons_disabled = false;
        },

        [dislikeReview.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [dislikeReview.fulfilled]: (state, action) => {
            state.user_reaction = "dislike";
            state.buttons_disabled = false;
        },

        [clearReaction.pending]: (state, action) => {
            state.buttons_disabled = true;
        },
        [clearReaction.fulfilled]: (state, action) => {
            state.user_reaction = null;
            state.buttons_disabled = false;
        },

        [createComment.pending] : (state, action) => {
            state.buttons_disabled = true;
        },
        [createComment.fulfilled] : (state, action) => {
            state.input_text = "";
            state.reply_item = null;
            state.need_fetch = true;
            state.buttons_disabled = false;
        },

        [createReply.pending] : (state, action) => {
            state.buttons_disabled = true;
        },
        [createReply.fulfilled] : (state, action) => {
            state.input_text = "";
            state.reply_item = null;
            state.need_fetch = true;
            state.buttons_disabled = false;
        },
    }
});

export const { resetReplies, setReplyItem, setInputText, resetNeedFetch } = reviewPageSlice.actions;

export default reviewPageSlice.reducer;