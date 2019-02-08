import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './Componentes/Login';
import { isAuthenticated } from './auth';
import { isAuthenticatedTeacher } from './authTeacher';
import Home from './Componentes/Home';
import Administration from './Componentes/Administration';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
    )}/>
);

const PrivateRouteTeacher = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticatedTeacher() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
    )}/>
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRouteTeacher exact path="/administration" component={Administration} />
        </Switch>
    </BrowserRouter>
)

export default Routes;