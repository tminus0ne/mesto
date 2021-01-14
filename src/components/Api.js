export default class Api {
  constructor({ baseUrl, token, groupId }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCustomCard(data) {
    return fetch(`${this._baseUrl}`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        link: data.link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    );
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    );
  }
}
