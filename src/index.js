import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectRef = document.querySelector('.breed-select');
const outputRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');

const select = new SlimSelect({
  select: selectRef,
  events: {
    afterChange: updVal => changeHandler(...updVal),
  },
});

fetchBreeds()
  .then(catArr => {
    const selectData = [
      { placeholder: true, text: 'Choose the breed', value: '' },
    ];
    catArr.map(({ id, name }) => {
      selectData.push({ text: name, value: id });
    });
    select.setData(selectData);
    loaderRef.style.display = 'none';
    selectRef.classList.remove('is-hidden');
  })
  .catch(err => Notify.failure(err.message));

function changeHandler(optionObj) {
  const { value } = optionObj;
  if (!value) {
    return;
  }
  outputRef.innerHTML = '';
  loaderRef.style.display = 'block';

  fetchCatByBreed(value)
    .then(cat => {
      const result = createMarkup(...cat);
      loaderRef.style.display = 'none';
      return result;
    })
    .catch(err => Notify.failure(err.message));
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
