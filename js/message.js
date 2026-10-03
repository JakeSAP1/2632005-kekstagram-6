const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const closeMessage = () => {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
  }
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (currentMessage && !currentMessage.contains(evt.target)) {
    closeMessage();
  }
};

const showMessage = (template) => {
  closeMessage();

  const message = template.cloneNode(true);

  message.querySelector('button').addEventListener('click', closeMessage);
  document.body.append(message);
  currentMessage = message;

  return message;
};

export const showSuccessMessage = () => showMessage(successTemplate);

export const showErrorMessage = (title) => {
  const message = showMessage(errorTemplate);

  if (title) {
    message.querySelector('.error__title').textContent = title;
  }
};

document.addEventListener('keydown', onDocumentKeyDown);
document.addEventListener('click', onDocumentClick);
