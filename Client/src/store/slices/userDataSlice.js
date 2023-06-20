import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {$host, SERVER_API_ROUTE} from "../../dataService/index.js";

export const login = createAsyncThunk(
    "userData/login",
    async (body, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`${SERVER_API_ROUTE}api/user/login`, body);
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
    async (body, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`${SERVER_API_ROUTE}api/user/logout`, body);
            localStorage.removeItemm('token');
            return data;
        }
        catch(e) {
            throw new Error(e.response.data.message);
        }
    }
);

export const register = createAsyncThunk(
    "userData/register",
    async (body, {rejectWithValue}) => {
        try {
            const { data } = await $host.post(`${SERVER_API_ROUTE}api/user/register`, body);
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                console.log("reducer error handler");
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })


            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, (state, action) => {
                console.log("reducer error handler");
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetRegistered } = userDataSlice.actions;

export default userDataSlice.reducer;