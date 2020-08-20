import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import updateCoincidenseMarkup from './update-coinci-markup';
import updateCountryMarkup from './update-countries-markup';

const inputRef = document.querySelector('#mySearch');
const countriesContainerRef = document.querySelector('.countries');

inputRef.addEventListener('input', _.debounce(getSearchCountry, 500));

function getSearchCountry(evt) {
  evt.preventDefault();

  const countryName = evt.target.value;
  console.log(countryName);

  countriesContainerRef.innerHTML = '';
  inputRef.value = '';

  fetchCountries(countryName).then(data => {
    console.log(data);
    if (data.length >= 2 && data.length <= 10) {
      updateCoincidenseMarkup(data);
    } else if (data.length === 1) {
      updateCountryMarkup(data);
    } else {
      const myError = error({
        text: 'Too many matches found. Please, enter a more specific query.',
      });
    }
  });
}
