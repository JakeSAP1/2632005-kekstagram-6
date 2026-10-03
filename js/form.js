import { uploadPhoto } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

const getHashtags = () => hashtagsField.value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const getHashtagsError = () => {
  const hashtags = getHashtags();

  if (hashtags.length === 0) {
    return '';
  }

  if (hashtags.some((hashtag) => !HASHTAG_PATTERN.test(hashtag))) {
    return 'Хэш-тег начинается с #, содержит только буквы и числа и не длиннее 20 символов';
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`;
  }

  if (new Set(hashtags).size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return '';
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onDocumentKeyDown = (evt) => {
  const isFormOpened = !uploadOverlay.classList.contains('hidden');

  if (evt.key === 'Escape' && isFormOpened && !isTextFieldFocused()) {
    closeForm();
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagsField, () => getHashtagsError() === '', getHashtagsError);
pristine.addValidator(descriptionField, () => descriptionField.value.length <= MAX_DESCRIPTION_LENGTH, `Длина комментария не может быть больше ${MAX_DESCRIPTION_LENGTH} символов`);

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  uploadSubmit.disabled = true;

  try {
    await uploadPhoto(new FormData(uploadForm));

    closeForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
  }

  uploadSubmit.disabled = false;
};

document.addEventListener('keydown', onDocumentKeyDown);
uploadInput.addEventListener('change', openForm);
uploadCancel.addEventListener('click', closeForm);
uploadForm.addEventListener('submit', onFormSubmit);
