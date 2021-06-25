import React from 'react';
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import DashboardRouters from "../../routers/DashboardRouters";
import { AuthContext } from '../../auth/AuthContext';


describe('Test on <DahsboardRouter/>', () => {
    const contexValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Nest'
        }
    };
    test('should show correctly', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <MemoryRouter>
                    <DashboardRouters />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Nest');
    });
        
});

