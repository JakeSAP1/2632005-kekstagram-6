import { loadPhotos } from './api.js';
import { renderThumbnails } from './gallery.js';
import { openBigPicture } from './big-picture.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const pictures = document.querySelector('.pictures');

const showError = () => {
  const error = errorTemplate.cloneNode(true);

  error.querySelector('.error__title').textContent = 'Не удалось загрузить фотографии';
  error.querySelector('.error__button').textContent = 'Попробовать снова';
  error.querySelector('.error__button').addEventListener('click', () => location.reload());

  pictures.append(error);
};

const load = () => {
  loadPhotos()
    .then((photos) => renderThumbnails(photos, openBigPicture))
    .catch(showError);
};

load();
