import axios from 'axios';
import { POPULARITY_BACKEND } from '../utils/config';

export function getPopularityByLocation(location) {
    const url = POPULARITY_BACKEND+'/getPopularity?lat='+location.lat+'&lng='+location.lng;
    return axios.get(url).then(response => Promise.resolve(response.data));
}