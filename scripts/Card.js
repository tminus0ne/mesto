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

  _handleOpenPopup() {
    const popupImageElement = document.querySelector('.popup_image');
    const popupImage = popupImageElement.querySelector('.popup__photo');
    const popupImageTitle = popupImageElement.querySelector(
      '.popup__place-title'
    );
    popupImage.src = this._image;
    popupImageTitle.textContent = this._title;

    popupImageElement.classList.add('popup_opened');
  }

  _setEventListeners() {
    const likeButton = this._place.querySelector('.place__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('place__like-button_active');
    });

    const removeButton = this._place.querySelector('.place__remove-button');
    removeButton.addEventListener('click', () => {
      if (this._place) {
        this._place.remove();
      }
    });

    const imagePopup = this._place.querySelector('.place__image');
    imagePopup.addEventListener('click', () => {
      this._handleOpenPopup();
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          const popupImageElement = document.querySelector('.popup_image');
          popupImageElement.classList.remove('popup_opened');
        }
      });
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
