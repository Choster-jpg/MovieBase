import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            Home
            <ul>
                <li><Link to={'/sign_in'}> sign in </Link></li>
                <li><Link to={'/sign_up'}> sign up </Link></li>
                <li><Link to={'/movies'}> movies </Link></li>
            </ul>

        </div>
    );
};

export default Home;