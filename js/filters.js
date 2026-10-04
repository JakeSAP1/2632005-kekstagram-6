const filtersBlock = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const DEFAULT_FILTER_ID = 'filter-default';
const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let photos = [];
let render = () => {};
let activeFilterId = DEFAULT_FILTER_ID;
let debounceTimer = null;

const getRandomPhotos = () => photos.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);

const getDiscussedPhotos = () => photos.slice().sort((first, second) => second.comments.length - first.comments.length);

const getFilteredPhotos = () => {
  if (activeFilterId === 'filter-random') {
    return getRandomPhotos();
  }

  if (activeFilterId === 'filter-discussed') {
    return getDiscussedPhotos();
  }

  return photos;
};

const applyFilter = () => {
  render(getFilteredPhotos());
};

const onFiltersClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button || button.id === activeFilterId) {
    return;
  }

  filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  activeFilterId = button.id;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilter, DEBOUNCE_DELAY);
};

export const initFilters = (loadedPhotos, renderPhotos) => {
  photos = loadedPhotos;
  render = renderPhotos;

  filtersBlock.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersClick);
};
