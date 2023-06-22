import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";

import  {public_routes, auth_routes} from "./routes.js";
import {useSelector} from "react-redux";

function AppRouter() {
    const { user } = useSelector(state => state.userData);

    return (
        <Routes>
            {
                public_routes.map((route) => <Route key={new Date()} path={route.path} element={<route.pageComponent/>}/>)
            }
            {
                auth_routes.map((route) => {
                    return <Route key={new Date()} path={route.path}
                                element={
                                    user ? <route.pageComponent/> : <Navigate to="/"/>
                                }/>
                })
            }
            <Route key={new Date()} path="*" element={<div>Not found</div>}/>
        </Routes>
    )
}

export default AppRouter
