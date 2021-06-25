import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('test on authReducer', () => {

    test('should return the default state', () => {
        const demoInit = {
            name: '',
            logged: false,
        };
       const state = authReducer(demoInit, {});
       expect(state).toEqual(demoInit);
    });

    test('should autheticated and set the user name', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Nestor',
            }
        };
        const {name, logged} = authReducer({ name: 'Nestor' }, action);
        expect(name).toBe('Nestor');
        expect(logged).toBe(true);
    });

    test('should delete user name and logged false', () => {
        const userState = {
            name: 'Nestor',
            logged: true,
        };
        const { logged } = authReducer(userState, { type: types.logout });
        expect(logged).toBe(false);
    });
    
});
