import { renderThumbnails } from './thumbnail.js';

const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const AVATARS_COUNT = 6;

const DESCRIPTIONS = [
  'Закат на берегу',
  'Утренний кофе',
  'Горный маршрут',
  'Старый город',
  'Набережная вечером',
  'Кот на подоконнике',
  'Осенний парк',
  'Первый снег',
  'Полевые цветы',
  'Морской бриз',
  'Крыши домов',
  'Лесная тропа',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Ирина',
  'Дмитрий',
  'Мария',
  'Сергей',
  'Ольга',
  'Никита',
  'Анна',
  'Павел',
  'Екатерина',
  'Максим',
  'Юлия',
];

let commentId = 0;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getRandomMessage = () => {
  const sentencesCount = getRandomInteger(1, 2);
  const shuffled = MESSAGES.slice().sort(() => Math.random() - 0.5);

  return shuffled.slice(0, sentencesCount).join(' ');
};

const createComment = () => {
  commentId += 1;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
    message: getRandomMessage(),
    name: getRandomItem(NAMES),
  };
};

const createComments = () => Array.from({ length: getRandomInteger(0, COMMENTS_MAX) }, createComment);

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomItem(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: createComments(),
});

export const photos = Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index));

renderThumbnails(photos);
