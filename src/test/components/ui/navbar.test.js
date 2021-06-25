import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';


describe('Test on <Navbar />', () => {
    const historyMock =  {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
            name: 'Juana',
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contexValue }>
            <MemoryRouter>
                <Router history={ historyMock } >
                    <Navbar />  
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Juana');
    });

    test('should call the logut and the user history', () => {
       wrapper.find('button').prop('onClick')(); 
       expect(contexValue.dispatch).toHaveBeenCalledWith({
           type: types.logout
       });
       expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });
    
});
