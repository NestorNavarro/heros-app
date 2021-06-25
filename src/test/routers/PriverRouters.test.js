import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Test on <PrivateRouter/>', () => {
    const props = {
        location: {
            pathname: 'marvel',
            search: '',
        }
    }
    Storage.prototype.setItem = jest.fn();

    test('should show the component if the user is authenticated and save to localStorage', () => {
        //if we are going to use a higherOrederComponent, we can't use a shallow function. That is because the shallow
        //render only one compenente. On our case it is going to render the MemoryRouter without <PrivateRouter/>
        const wrapper =  mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ true }
                    component={ ()=> <span>Ready!</span>  }
                    { ...props }
                />
            </MemoryRouter>
        );
        const { pathname, search } = props.location;
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastpath',  `${pathname}${search}`);
    });

    test('should block the component if it is not authenticated', () => {
        const wrapper =  mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    component={ ()=> <span>Ready!</span>  }
                    { ...props }
                />
            </MemoryRouter>
        );
        const { pathname, search } = props.location;
        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastpath',  `${pathname}${search}`);
    }); 
});
