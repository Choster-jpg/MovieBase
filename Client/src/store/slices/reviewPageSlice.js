import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";
import {fetchFriends} from "./homePageSlice.js";

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
)

const initialState = {
    loading: false,
    error: null,
    comments: [],
    replies: [],
    data: null,
    reaction: "",
}

const reviewPageSlice = createSlice({
    name: 'reviewPage',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchReviewData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchReviewData.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchReviewData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export default reviewPageSlice.reducer;