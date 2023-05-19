import React from 'react';
import {Link, useParams} from "react-router-dom";

const Movie = () => {

    const { id } = useParams();

    return (
        <div>
            Movie {id}.
            <br/>
            <Link to="/home"> back to Home</Link>
        </div>
    );
};

export default Movie;