import {configureStore} from '@reduxjs/toolkit';

import homePageReducer from "./slices/homePageSlice.js";
import browsePageReducer from "./slices/browsePageSlice.js";
import moviePageReducer from "./slices/moviePageSlice.js";
import userDataReducer from "./slices/userDataSlice.js";
import navbarStateReducer from "./slices/navbarStateSlice.js";
import accountPageReducer from "./slices/accountPageSlice.js";

export default configureStore({
    reducer: {
        homePage: homePageReducer,
        browsePage: browsePageReducer,
        moviePage: moviePageReducer,
        userData: userDataReducer,
        navbarState: navbarStateReducer,
        accountPage: accountPageReducer,
    }
});