'use strict';

export default class Card {
  constructor(name, link) {
    this._title = name;
    this._image = link;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector('.place__template')
      .content.querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  _setEventListeners() {
    const likeButton = this._place.querySelector('.place__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('place__like-button_active');
    });

    const removeButton = this._place.querySelector('.place__remove-button');
    removeButton.addEventListener('click', (event) => {
      if (this._place) {
        this._place.remove();
      }
    });
  }

  generatePlace() {
    this._place = this._getTemplate();
    this._setEventListeners();

    this._place.querySelector('.place__title').textContent = this._title;
    this._place.querySelector('.place__image').src = this._image;

    return this._place;
  }
}
