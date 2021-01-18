'use strict';

export default class Card {
  constructor(
    name,
    link,
    cardId,
    userId,
    ownerId,
    likes,
    template,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
    data,
  ) {
    this._title = name;
    this._image = link;
    this._cardId = cardId;
    this._userId = userId;
    this._ownerId = ownerId;
    this._likes = likes;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._data = data;

    console.log(data);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(this._data.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _toggleCardLike() {
    // Счетчик лайков
    this._card.querySelector(
      this._data.cardLikesCount,
    ).textContent = this._likes.length;

    const likeState = this._likes.findIndex(
      (card) => card._id === this._userId,
    );
    if (likeState === -1) {
      this._likeButton.classList.add(this._data.cardActiveLikeClass);
    } else {
      this._likeButton.classList.remove(this._data.cardActiveLikeClass);
    }
  }

  _setEventListeners() {
    // Лайк
    const likeButton = this._card.querySelector(
      this._data.cardLikeButtonSelector,
    );

    likeButton.addEventListener('click', () => {
      this._toggleCardLike();
    });

    // Удаление карточки
    const removeButton = this._card.querySelector(
      this._data.cardRemoveButtonSelector,
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

    // Данные для попапа с картинкой
    this._card.querySelector(
      this._data.cardTitleSelector,
    ).textContent = this._title;
    this._card.querySelector(this._data.cardImageSelector).src = this._image;
    this._card
      .querySelector(this._data.cardImageSelector)
      .setAttribute('alt', `Изображение на фотографии: ${this._title}`);

    if (this._ownerId === this._userId) {
      this._card.querySelector(
        this._data.cardRemoveButtonSelector,
      ).style.display = 'block';
    }

    return this._card;
  }
}
