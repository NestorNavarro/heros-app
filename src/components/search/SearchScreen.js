import React, { useMemo } from 'react';
import queryString from 'query-string';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router';
import { HeroCard } from '../hero/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    const [ fromValue , handleInputChange ] = useForm({
        search: q,
    });

    const { search } = fromValue;
    const heroesFiltered  = useMemo(() => getHeroesByName(q), [q]);
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ search }`);
    }
    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search From</h4>
                    <hr/>
                    <form onSubmit={ handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="search"
                            value={ search }
                            onChange={ handleInputChange }

                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>
                    {
                        (q === '') &&
                        <div className="alert alert-info">
                            Search a hero!
                        </div>
                    }
                    {
                        (q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            Hero not Found!
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                hero={ hero }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
