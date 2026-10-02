const DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';

export const loadPhotos = async () => {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json();
};
