export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Получение информации о польтзователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Редактирование информации о пользователе
  editUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.job,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Добавление своей карточки
  addCustomCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Удаление своей карточки
  removeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Посатвить лайк
  addCardLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Убрать лайк
  removeCardLike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }

  // Установить новый аватар
  setNewAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar.link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
      )
      .catch((err) => console.log(err));
  }
}
