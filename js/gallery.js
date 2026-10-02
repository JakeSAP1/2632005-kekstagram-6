const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

export const renderThumbnails = (photos, onSelect) => {
  const thumbnails = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');

    image.src = photo.url;
    image.alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;

    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      onSelect(photo);
    });

    thumbnails.append(thumbnail);
  });

  container.append(thumbnails);
};
