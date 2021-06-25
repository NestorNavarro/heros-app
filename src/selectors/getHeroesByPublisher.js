import PropTypes from 'prop-types';
import { heroes } from '../data/heroes';

export const getHeroesByPublisher = (publisher) => {
    const validPublisher = ['DC Comics', 'Marvel Comics'];
    if(!validPublisher.includes(publisher)){
        throw new Error(`Publisher: "${publisher}" incorrect`);
    }
    return heroes.filter( hero => hero.publisher === publisher);
}
getHeroesByPublisher.propTypes = {
    publisher: PropTypes.string.isRequired,
}