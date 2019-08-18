import axios from 'axios';
import { GEONAMES_USERNAME } from '../utils/config';

const MAX_ROWS = 20;

class SearchResult {

}

function transformRow(row) {
    let ret = new SearchResult();
    ret.id = row.geonameId;
    ret.lat = Number(row.lat);
    ret.lng = Number(row.lng);
    ret.name = row.name;
    ret.country = row.countryName;
    ret.population = Number(row.population);
    return ret;
}

export function searchByName(query, start) {
    const me = this;
    const url = 'https://secure.geonames.org/searchJSON?q=' + query + '&startRow='+start+'&maxRows=' + MAX_ROWS + '&username='+GEONAMES_USERNAME;
    return axios.get(url).then((response) => {
        return Promise.resolve({
            totalCount: response.data.totalResultsCount,
            results: response.data.geonames.map(transformRow)
        });
    }).catch(e => {
        alert('An error occured during search.');
        console.log('error message:');
        console.log(e);
    });
}