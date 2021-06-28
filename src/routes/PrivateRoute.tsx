import React from "react";
import {Route, Redirect} from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const condition = loginStatus();

    return condition ? (<Route path={props.path} exact={props.exact} component={props.component}/>) :
        (<Redirect to="/login"/>);
};

const loginStatus = () => {
    return Cookies.get("access_token") !== undefined && Cookies.get("user_token") !== undefined;
}

export default PrivateRoute;