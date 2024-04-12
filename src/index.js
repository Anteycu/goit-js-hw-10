import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import createMarkup from './js/markup-creator';
import { showElem, hideElem, outputMarkup, clearMarkup } from './js/utils';

const selectRef = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const outputRef = document.querySelector('.cat-info');

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

    hideElem(loaderRef);
    showElem(selectRef);
  })
  .catch(err => {
    Notify.failure(err.message);
    hideElem(loaderRef);
  });

function changeHandler(optionObj) {
  const { value } = optionObj;
  if (!value) {
    return;
  }
  clearMarkup(outputRef);
  showElem(loaderRef);

  fetchCatByBreed(value)
    .then(cat => {
      outputMarkup(outputRef, createMarkup(...cat));
      hideElem(loaderRef);
    })
    .catch(err => {
      Notify.failure(err.message);
      hideElem(loaderRef);
    });
}
