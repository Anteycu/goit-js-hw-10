function createMarkup(catObj) {
  const { url, breeds } = catObj;
  const { description, origin, temperament, name } = breeds[0];

  return `
      <div class="cat-info-thumb">
      <img src="${url}" alt="Cat of ${name} breed" width="800" height="550" class="cat-info-img"/>
      </div>
      <h1>${name}</h1>
      <h2>(${origin})</h2>
      <p>${temperament}</p>
      <p class="cat-info-descr">${description}</p>`;
}

export default createMarkup;
