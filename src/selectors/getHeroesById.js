import { heroes } from '../data/heroes';

export const getHerosById = (id) => {
    return heroes.filter( hero => hero.id === id);
}