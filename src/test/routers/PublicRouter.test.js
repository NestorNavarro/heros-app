import React from 'react';
import { mount  } from 'enzyme';
import { PublicRouter } from '../../routers/PublicRouter';
import { MemoryRouter } from 'react-router-dom';

describe('Test on <PublicRouter/>', () => {
    test('should show the component, if the user is not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicRouter 
                    isAuthenticated={ false }
                    component={ () => <span>Ready!</span> }
                />
            </MemoryRouter>
        );
        expect(wrapper.find('span').exists()).toBe(true);   
    });

    test('should not show nothing, if the user is authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicRouter 
                    isAuthenticated={ true }
                    component={ () => <span>Ready!</span> }
                />
            </MemoryRouter>
        );
        expect(wrapper.find('span').exists()).toBe(false);   
    });

});


