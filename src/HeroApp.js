import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';
import AppRouter from './routers/AppRouter';

export default function HeroApp() {
    const init = () =>  JSON.parse(localStorage.getItem('user')) || { looged: false };

    const [ user, dispatch ] = useReducer(authReducer, {}, init);
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    
    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter/>
        </AuthContext.Provider>  
    );
}
