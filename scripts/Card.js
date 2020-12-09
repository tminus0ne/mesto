'use strict';

export class Card {
  constructor(data, name, link, template) {
    this._data = data;
    this._title = name;
    this._image = link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(this._data.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  // Функция открытия попапа с картинкой
  _handleOpenPopup() {
    const popupImageElement = document.querySelector(
      this._data.imagePopupSelector
    );
    const popupImage = popupImageElement.querySelector(
      this._data.imagePopupPhotoSelector
    );
    const popupImageTitle = popupImageElement.querySelector(
      this._data.imagePopupTitleSelector
    );
    popupImage.src = this._image;
    popupImageTitle.textContent = this._title;
    popupImage.alt = `Изображение на фотографии: ${this._title}`;

    popupImageElement.classList.add(this._data.imagePopupOpenedClass);
  }

  // Функция закрытия попапа
  _handleClosePopup() {
    const popupImageElement = document.querySelector(
      this._data.imagePopupSelector
    );
    popupImageElement.classList.remove(this._data.imagePopupOpenedClass);
  }

  // Закрытие по нажатию Esc
  _handleEscClick() {
    document.addEventListener('keydown', (event) => {
      const escapeKey = 'Escape';
      if (event.key === escapeKey) {
        this._handleClosePopup();
      }
    });
  }

  // Закрытие при клике по окну
  _handleWindowClick() {
    document.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains(this._data.popupClass)) {
        this._handleClosePopup();
      }
    });
  }

  _setEventListeners() {
    // Лайк
    const likeButton = this._card.querySelector(
      this._data.cardLikeButtonSelector
    );
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(this._data.cardActiveLikeClass);
    });

    // Удаление карточки
    const removeButton = this._card.querySelector(
      this._data.cardRmoveButtonSelector
    );
    removeButton.addEventListener('click', () => {
      if (this._card) {
        this._card.remove();
        this._card = null;
      }
    });

    // Открытие попапа с картинкой
    const imagePopup = this._card.querySelector(this._data.cardImageSelector);
    imagePopup.addEventListener('click', () => {
      this._handleOpenPopup();
      this._handleEscClick();
      this._handleWindowClick();
    });
  }

  generateCardLayout() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(
      this._data.cardTitleSelector
    ).textContent = this._title;
    this._card.querySelector(this._data.cardImageSelector).src = this._image;
    this._card
      .querySelector(this._data.cardImageSelector)
      .setAttribute('alt', `Изображение на фотографии: ${this._title}`);

    return this._card;
  }
}
