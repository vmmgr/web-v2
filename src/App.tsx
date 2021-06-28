import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import SignIn from './pages/Login/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import VM from "./pages/VM/VM";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/login" exact/>
                <Route exact path="/login" component={SignIn}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/vm" component={VM}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
