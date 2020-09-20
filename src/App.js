import React from 'react';
import Home from './Components/Home'

import NavBar from "./Components/NavBar";
import {useAuth0} from "./react-auth0-spa";

import {Router, Route, Switch} from "react-router-dom";
import Profile from "./Components/Profile";
import history from "./util/history";
import PrivateRoute from "./Components/PrivateRoute";


import './App.css';
import FQTrack from "./Components/FQTrack";
import Habit from "./Components/Habit";


function App() {
    const {isAuthenticated} = useAuth0();
    const {loading,user} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="App">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
            <link href='https://fonts.googleapis.com/css?family=Almendra SC' rel='stylesheet'/>

            <Router history={history}>
                <header className={'headerHolder'}>
                    <div className={'header'}>
                        Welcome to <span className={'red'}>Your M</span>indfulness <span className={'red'}>U</span>tility <span className={'red'}>C</span>enter
                    </div>
                    <div className={'authBar'}>
                        <NavBar/>
                    </div>

                </header>


                <div className={'body'}>
                    {!isAuthenticated && <div>
                        Log in to do stuff
                    </div>}

                    {isAuthenticated &&
                    <div>
                        <Switch>
                            <Route path="/" exact/>
                            <PrivateRoute path="/profile" component={Profile}/>
                            <PrivateRoute path="/fqtrack" render={(props) => <FQTrack {...props} user={user} />}/>
                            <PrivateRoute path="/home" component={Home}/>
                            <PrivateRoute path="/habits" render={(props) => <Habit {...props} user={user} />}/>

                        </Switch>

                    </div>

                    }
                </div>


            </Router>
        </div>
    );
}

export default App;
