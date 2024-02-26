const countriesContainerRef = document.querySelector('.countries');
import countryTpl from './templates/countries.hbs';

function updateCountryMarkup(countries) {
  const markup = countryTpl(countries);
  countriesContainerRef.insertAdjacentHTML('beforeend', markup);
}

export default updateCountryMarkup;
