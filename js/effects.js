const uploadForm = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    getFilter: () => '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    getFilter: (value) => `grayscale(${value})`,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    getFilter: (value) => `sepia(${value})`,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    getFilter: (value) => `invert(${value}%)`,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    getFilter: (value) => `blur(${value}px)`,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    getFilter: (value) => `brightness(${value})`,
  },
};

const getCurrentEffect = () => {
  const checkedRadio = effectsList.querySelector('.effects__radio:checked');

  return checkedRadio ? checkedRadio.value : 'none';
};

const setScale = (value) => {
  scaleValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const changeScale = (delta) => {
  const currentValue = parseInt(scaleValue.value, 10);

  setScale(Math.min(SCALE_MAX, Math.max(SCALE_MIN, currentValue + delta)));
};

const updateFilter = () => {
  const effect = EFFECTS[getCurrentEffect()];
  const value = Number(effectSlider.noUiSlider.get());

  previewImage.style.filter = effect.getFilter(value);
  effectLevelValue.value = value;
};

const setEffect = (name) => {
  const effect = EFFECTS[name];

  effectLevel.classList.toggle('hidden', name === 'none');
  effectSlider.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    step: effect.step,
    start: effect.max,
  });
  updateFilter();
};

noUiSlider.create(effectSlider, {
  range: { min: EFFECTS.none.min, max: EFFECTS.none.max },
  step: EFFECTS.none.step,
  start: EFFECTS.none.max,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', updateFilter);

scaleSmaller.addEventListener('click', () => changeScale(-SCALE_STEP));
scaleBigger.addEventListener('click', () => changeScale(SCALE_STEP));

effectsList.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    setEffect(evt.target.value);
  }
});

uploadForm.addEventListener('reset', () => {
  setScale(SCALE_DEFAULT);
  setEffect('none');
});

setEffect(getCurrentEffect());
