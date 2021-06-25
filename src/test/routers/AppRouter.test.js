import React from 'react';
import { mount } from "enzyme";
import AppRouter from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Test on <AppRouter/>', () => {


    test('should show login, if the user is not authenticated', () => {
        const contexValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').exists()).toBe(true);
    });

    test('should show the componet marvel, if the user is authenticated', () => {
        const contexValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'juan'
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });      
});
