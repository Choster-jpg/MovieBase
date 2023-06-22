import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { $host, $authHost } from "../../dataService/index.js";

export const login = createAsyncThunk(
    "userData/login",
    async (body, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/user/login`, body);
            localStorage.setItem('token', data.accessToken);
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    "userData/logout",
    async ({ item }, {rejectWithValue}) => {
        try {
            console.log("logout");
            const { data } = await $authHost.post(`api/user/logout`);
            console.log(data);
            return data;
        }
        catch(e) {
            console.log(e);
            throw new Error(e.response.data.message);
        }
    }
);

export const register = createAsyncThunk(
    "userData/register",
    async (body, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`api/user/register`, body);
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

const initialState = {
    user: null,
    error: null,
    loading: false,
    registered: false,
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        resetRegistered: (state) => {
            state.registered = false;
        },
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                console.log("reducer error handler");
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(register.pending, (state) => {
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.registered = true;
            })
            .addCase(register.rejected, (state, action) => {
                console.log("reducer error handler");
                state.error = action.error.message;
            });
    },
});

export const { resetRegistered, resetError } = userDataSlice.actions;

export default userDataSlice.reducer;