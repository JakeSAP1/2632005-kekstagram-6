const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo, onSelect) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    onSelect(photo);
  });

  return thumbnail;
};

export const renderThumbnails = (photos, onSelect) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo, onSelect));
  });

  container.appendChild(fragment);
};
