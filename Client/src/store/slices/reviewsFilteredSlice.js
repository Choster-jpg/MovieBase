import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host} from "../../dataService/index.js";



const initialState = {
    loading: false,
    error: "",
};

const reviewsFilteredSlice = createSlice({
    name: "reviewsFiltered",
    initialState,
    reducers: {},
    extraReducers: {

    }
});