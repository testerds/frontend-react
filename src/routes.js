import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './Componentes/Login';
import { isAuthenticated } from './auth';
import Home from './Componentes/Home';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
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
            <PrivateRoute path="/" component={Home} />
        </Switch>
    </BrowserRouter>
)

export default Routes;