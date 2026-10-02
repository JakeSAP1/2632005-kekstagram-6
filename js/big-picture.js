const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const caption = bigPicture.querySelector('.social__caption');
const likes = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = commentsList.querySelector('.social__comment');

let comments = [];
let shownComments = 0;

const createComment = (comment) => {
  const item = commentTemplate.cloneNode(true);
  const avatar = item.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  item.querySelector('.social__text').textContent = comment.message;

  return item;
};

const showCommentsPortion = () => {
  const portion = comments.slice(shownComments, shownComments + COMMENTS_STEP);

  portion.forEach((comment) => commentsList.append(createComment(comment)));
  shownComments += portion.length;

  commentCount.firstChild.nodeValue = `${shownComments} из `;
  commentCount.querySelector('.comments-count').textContent = comments.length;
  commentsLoader.classList.toggle('hidden', shownComments >= comments.length);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

export const openBigPicture = (photo) => {
  comments = photo.comments;
  shownComments = 0;
  commentsList.textContent = '';

  image.src = photo.url;
  image.alt = photo.description;
  caption.textContent = photo.description;
  likes.textContent = photo.likes;

  showCommentsPortion();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', showCommentsPortion);
