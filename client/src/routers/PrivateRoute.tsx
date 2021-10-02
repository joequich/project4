import React from 'react'
import { Redirect, Route } from 'react-router';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    component: React.ElementType;
    [x: string]: any;
}

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest}: PrivateRouteProps) => {
    return (
        <Route {...rest}
            render={ (props) => (
                (isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to="/auth/login" />
            )}
        />
    )
}
