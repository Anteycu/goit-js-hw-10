import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_1L8o630KFbh54i49JDMP5E6v8fOQfO19H6VSOHT9hxS2PANY9N6T69ZxwX1Huh18';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios(`${BASE_URL}/breeds`).then(({ data }) => data);
}

function fetchCatByBreed(breedId) {
  return axios(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(
    ({ data }) => data
  );
}

export { fetchBreeds, fetchCatByBreed };
