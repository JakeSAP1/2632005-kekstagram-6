import './effects.js';
import './form.js';
import { loadPhotos } from './api.js';
import { showErrorMessage } from './message.js';
import { renderThumbnails } from './thumbnail.js';

loadPhotos()
  .then((photos) => renderThumbnails(photos))
  .catch(() => showErrorMessage('Не удалось загрузить фотографии'));
