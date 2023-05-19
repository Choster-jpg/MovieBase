import { useState } from 'react'
import {Route, Routes} from "react-router-dom";

import  {public_routes} from "./routes.js";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import Movie from "./pages/Movie.jsx";

function AppRouter() {
  return (
      <Routes>
          {
            public_routes.map((route) => <Route key={new Date()} path={route.path} element={<route.pageComponent/>}/>)
          }
          <Route key={new Date()} path="/movies">
              <Route key={new Date()} index element={<BrowseMovies/>}/>
              <Route key={new Date()} path=":id" element={<Movie/>}/>
          </Route>
          <Route key={new Date()} path="*" element={<div>Not found</div>}/>
      </Routes>
  )
}

export default AppRouter
