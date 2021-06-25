import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import HeroScreen from '../../../components/hero/HeroScreen';



describe('Test on <HeroScreen/>', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };


    test('should show the default component correctly (if the hero dose not exist)', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ history } />
            </MemoryRouter>
            
        );
       expect(wrapper.find('Redirect').exists()).toBe(true); 
    });

    test('should show a hero if the parameter exist and it was found', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path={ '/hero/:heroId' } component={ HeroScreen } />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.row').exists()).toBe(true);         
    });

    test('should reeturn to the back screen with PUSH', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path={ '/hero/:heroId' } component={ (props) => < HeroScreen history={ history } /> } />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalledWith('/');
        
    });
    
    test('should return to the back scren with GOBACK', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path={ '/hero/:heroId' } component={ (props) => < HeroScreen history={ history } /> } />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();  
    });
    
    test('should call the component Redirect if the hero dose not exist', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/hero/marvel-spider1234'] }>
                <Route path={ '/hero/:heroId' } component={ (props) => < HeroScreen history={ history } /> } />
            </MemoryRouter>
        );
        expect(wrapper.text()).toBe("");
    });
    
    
});
