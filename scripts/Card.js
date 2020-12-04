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

  generatePlace() {
    this._place = this._getTemplate();

    this._place.querySelector('.place__title').textContent = this._title;
    this._place.querySelector('.place__image').src = this._image;

    return this._place;
  }
}
