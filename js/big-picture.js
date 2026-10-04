const bigPicture = document.querySelector('.big-picture');
const pictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentSample = commentsList.querySelector('.social__comment');

const createComment = (comment) => {
  const item = commentSample.cloneNode(true);
  const avatar = item.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

export const openBigPicture = (photo) => {
  const fragment = document.createDocumentFragment();

  pictureImage.src = photo.url;
  pictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  commentsList.textContent = '';

  photo.comments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  commentsList.appendChild(fragment);
  bigPicture.classList.remove('hidden');
};
