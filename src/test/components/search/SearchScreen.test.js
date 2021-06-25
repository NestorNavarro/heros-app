import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Test on <SearchScreen/>', () => {

    test('should show correctly with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route paht='/search' component={ SearchScreen }/>
            </MemoryRouter>    
        );    

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero!');
    }); 

    test('should show a hero correctly', () => {
        const hero = 'batman';
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <Route paht='/search' component={ SearchScreen }/>
            </MemoryRouter>    
        );
        expect(wrapper.find('input').prop('value')).toBe(hero);
        expect(wrapper).toMatchSnapshot();
    });

    test('should throw an hero error alert if the hero dose not exist', () => {
        const hero = 'I am not exist';
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <Route paht='/search' component={ SearchScreen }/>
            </MemoryRouter>    
        );
        expect(wrapper.find('input').prop('value')).toBe(hero);
        expect(wrapper.find('.alert-danger').text().trim()).toBe('Hero not Found!');
    });
    
    test('should call the history push', () => {
        const history = {
            push: jest.fn(),
        };
        const hero = 'batman';
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
                <Route 
                    paht='/search' 
                    component={ () => <SearchScreen history={history} /> }
                />
            </MemoryRouter>    
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'search-text',
                value: hero,
            }
        });
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect(history.push).toHaveBeenCalledWith(`?q=${hero}`);
    });
    
    
});
