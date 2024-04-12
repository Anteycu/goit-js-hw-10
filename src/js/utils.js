const showElem = elemRef => {
  elemRef.classList.remove('visually-hidden');
};

const hideElem = elemRef => {
  elemRef.classList.add(['visually-hidden']);
};

const outputMarkup = (elemRef, markup) => {
  elemRef.innerHTML = markup;
};

const clearMarkup = elemRef => {
  elemRef.innerHTML = '';
};

export { showElem, hideElem, outputMarkup, clearMarkup };
