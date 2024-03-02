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
    loaderRef.classList.add(['visually-hidden']);
    selectRef.classList.remove('visually-hidden');
  })
  .catch(err => {
    Notify.failure(err.message);
    loaderRef.classList.add(['visually-hidden']);
  });

function changeHandler(optionObj) {
  const { value } = optionObj;
  if (!value) {
    return;
  }
  outputRef.innerHTML = '';
  loaderRef.classList.remove('visually-hidden');

  fetchCatByBreed(value)
    .then(cat => {
      createMarkup(...cat);
      loaderRef.classList.add(['visually-hidden']);
    })
    .catch(err => {
      Notify.failure(err.message);
      loaderRef.classList.add(['visually-hidden']);
    });
}

function createMarkup(catObj) {
  const { url, breeds } = catObj;
  const { description, origin, temperament, name } = breeds[0];

  const markup = `
      <div class="cat-info-thumb">
      <img src="${url}" alt="Cat of ${name} breed" width="800" height="550" class="cat-info-img"/>
      </div>
      <h1>${name}</h1>
      <h2>(${origin})</h2>
      <p>${temperament}</p>
      <p class="cat-info-descr">${description}</p>`;

  outputRef.innerHTML = markup;
}
