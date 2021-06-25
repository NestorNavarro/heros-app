import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { HeroCard } from './HeroCard';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';

export default function HeroList({ publisher }) {
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
    return (
        <div className="card-columns animate__animated animate__fadeIn">
           {
               heroes.map( hero =>
                    <HeroCard 
                        key={ hero.id }
                        hero={ hero }
                    /> 
               )
           } 
        </div>
    );
}
HeroList.propTypes = {
    publisher: PropTypes.string.isRequired,
}