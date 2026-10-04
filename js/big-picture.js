const bigPicture = document.querySelector('.big-picture');
const pictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentSample = commentsList.querySelector('.social__comment');

const COMMENTS_STEP = 5;

let shownComments = 0;
let currentComments = [];

const createComment = (comment) => {
  const item = commentSample.cloneNode(true);
  const avatar = item.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

const showCommentsPortion = () => {
  const portion = currentComments.slice(shownComments, shownComments + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  portion.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  commentsList.appendChild(fragment);
  shownComments += portion.length;
  commentCount.firstChild.nodeValue = `${shownComments} из `;
  commentsLoader.classList.toggle('hidden', shownComments >= currentComments.length);
};

export const openBigPicture = (photo) => {
  pictureImage.src = photo.url;
  pictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  commentsList.textContent = '';
  currentComments = photo.comments;
  shownComments = 0;

  showCommentsPortion();
  bigPicture.classList.remove('hidden');
};

commentsLoader.addEventListener('click', showCommentsPortion);
