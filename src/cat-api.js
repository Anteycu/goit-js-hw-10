import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_1L8o630KFbh54i49JDMP5E6v8fOQfO19H6VSOHT9hxS2PANY9N6T69ZxwX1Huh18';

function fetchBreeds() {
  return axios('https://api.thecatapi.com/v1/breeds')
    .then(resp => resp.data)
    .catch(err => Notify.failure(err.message));
}

function fetchCatByBreed(breedId) {
  return axios(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  )
    .then(resp => resp.data)
    .catch(err => Notify.failure(err.message));
}

export { fetchBreeds, fetchCatByBreed };
