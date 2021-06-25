import React from 'react';
import { mount } from 'enzyme';
import LoginScreen from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';



describe('Test on <LoginScreen/> ', () => {
    const history = {
        replace: jest.fn(),
    };

    const contexValue = {
        dispatch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider  value={ contexValue } >
            <LoginScreen history={ history } /> 
        </AuthContext.Provider>
    );

    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    

    test('should to do the dispatch and nav', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick(); 
        expect(contexValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Nestor',
            }
        });
        expect(history.replace).toHaveBeenCalled();

        localStorage.setItem('lastpath', '/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
    });
});
