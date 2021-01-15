export default class Api {
  constructor({
    baseUrl,
    token
  }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        heders: {
          authorization: this._token,
        }
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  editUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        heders: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          about: user.job,
        })
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._token,
        },
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  addCustomCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        },
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  addCardLike() {
    return fetch(`${this._baseUrl}/cards/likes/`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
        },
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  removeCardLike() {
    return fetch(`${this._baseUrl}/cards/likes/`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        },
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }

  setNewAvatar() {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
        },
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch(err => console.log(err));
  }
}