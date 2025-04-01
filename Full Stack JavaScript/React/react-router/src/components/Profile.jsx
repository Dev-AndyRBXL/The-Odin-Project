import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
            <p>So... how are you?</p>
            <Link to="/">&larr; Prev</Link>&nbsp;
            <hr />
            <h2>Outlet</h2>
            <Outlet />
        </div>
    )
}

export default Profile;
