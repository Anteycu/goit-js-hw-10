const countriesContainerRef = document.querySelector('.countries');
import coincidenseTpl from './templates/coincidense.hbs';

function updateCoincidenseMarkup(coincidense) {
  const markup = coincidenseTpl(coincidense);
  countriesContainerRef.insertAdjacentHTML('beforeend', markup);
}

export default updateCoincidenseMarkup;
