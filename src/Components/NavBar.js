// src/components/NavBar.js

import {
    login_redirect_uri
} from '../util/config';

import React from "react";
import {useAuth0} from "../react-auth0-spa";


const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
        });

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({redirect_uri: login_redirect_uri})}>Log in</button>
            )}

            {isAuthenticated && <div>
                <div>Welcome back {user.name}</div>
                <div className={'navItem'}><a href={'./home'} >Home</a></div>
                <div className={'navItem'}><a href={'./profile'} >My Profile</a></div>
                <div className={'navItem'}> <a href={'./fqtrack'} >Day Planner</a></div>
                <button onClick={() => logoutWithRedirect()}>Log out</button>

            </div>

            }
        </div>
    );
};

export default NavBar;
