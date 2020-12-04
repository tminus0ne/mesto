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

    this._place
      .querySelector('.place__image')
      .addEventListener('click', (event) => {
        const imagePopup = document.querySelector('.popup_image');

        imagePopup.querySelector('.popup__photo').src = this._image;
        imagePopup.querySelector(
          '.popup__place-title'
        ).textContent = this._title;
      });

    // imagePopupCloseButton.addEventListener('click', () => {
    //   this._handleClosePopup();
    // });

    //   function openImagePopup(event) {
    //     openPopup(imagePopup);
    //     imagePopupPlacePhoto.src = event.target.src;
    //     imagePopupPlaceTitle.textContent = name;
    //   }
    //   placeImage.addEventListener('click', openImagePopup);
  }

  generatePlace(imagePopup) {
    this._place = this._getTemplate();
    this._setEventListeners();

    this._place.querySelector('.place__title').textContent = this._title;
    this._place.querySelector('.place__image').src = this._image;

    return this._place;
  }
}
