import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter.jsx';
import {BrowserRouter} from "react-router-dom";

import './styles/main.scss'

import {Provider} from "react-redux";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </Provider>,
)
