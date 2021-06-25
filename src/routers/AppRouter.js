import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import DashboardRouters from './DashboardRouters';
import LoginScreen from '../components/login/LoginScreen';

import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';
import { AuthContext } from '../auth/AuthContext';

export default function AppRouter() {
    const { user: { logged } } = useContext(AuthContext);
    return (
        <Router>  
            <div>
                <Switch>
                    <PublicRouter 
                        exact
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ logged }
                    />
                    <PrivateRoute 
                        path="/"
                        component={ DashboardRouters }
                        isAuthenticated={ logged } 
                    />
                </Switch>
            </div>
        </Router>
    );
}
