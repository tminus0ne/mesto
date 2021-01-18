'use strict';

export default class Card {
  constructor(
    data,
    userId,
    template,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
  ) {
    this._data = data;
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(this._data.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Лайк
    const likeButton = this._card.querySelector(
      this._data.cardLikeButtonSelector,
    );
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(this._data.cardActiveLikeClass);
    });

    // Удаление карточки
    const removeButton = this._card.querySelector(
      this._data.cardRmoveButtonSelector,
    );
    removeButton.addEventListener('click', () => {
      if (this._card) {
        this._card.remove();
        this._card = null;
      }
    });

    this._card
      .querySelector(this._data.cardImageSelector)
      .addEventListener('click', this._handleCardClick);
  }

  generateCardLayout() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(
      this._data.cardTitleSelector,
    ).textContent = this._title;

    this._card.querySelector(this._data.cardImageSelector).src = this._image;

    this._card
      .querySelector(this._data.cardImageSelector)
      .setAttribute('alt', `Изображение на фотографии: ${this._title}`);

    return this._card;
  }
}
