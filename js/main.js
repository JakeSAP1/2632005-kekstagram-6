import './effects.js';
import './form.js';
import { loadPhotos } from './api.js';
import { initFilters } from './filters.js';
import { showErrorMessage } from './message.js';
import { renderThumbnails } from './thumbnail.js';

loadPhotos()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos, renderThumbnails);
  })
  .catch(() => showErrorMessage('Не удалось загрузить фотографии'));
