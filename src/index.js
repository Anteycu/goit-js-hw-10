import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectRef = document.querySelector('.breed-select');
const outputRef = document.querySelector('.cat-info');

fetchBreeds().then(catArr =>
  catArr.map(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.text = name;
    selectRef.add(option);
  })
);

selectRef.addEventListener('change', onChange);

function onChange(e) {
  const { value } = e.target;
  fetchCatByBreed(value).then(cat => createMarkup(...cat));
}

function createMarkup(catObj) {
  const { url, breeds } = catObj;
  const { description, origin, temperament, name } = breeds[0];

  const markup = `
      <img src="${url}" alt="Cat of ${name} breed" width="500" height="400"/>
      <h1>${name}</h1>
      <p>${origin}</p>
      <p>${description}</p>
      <p>${temperament}</p>`;

  outputRef.innerHTML = markup;
}
