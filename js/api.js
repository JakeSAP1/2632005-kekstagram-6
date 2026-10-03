const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

export const loadPhotos = async () => {
  const response = await fetch(`${SERVER_URL}/data`);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить фотографии: ${response.status}`);
  }

  return response.json();
};

export const uploadPhoto = async (data) => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Не удалось отправить форму: ${response.status}`);
  }
};
