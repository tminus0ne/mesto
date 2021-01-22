'use strict';

export default class Card {
  constructor(
    name,
    link,
    cardId,
    userId,
    ownerId,
    likes,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
    template,
    data,
  ) {
    this._title = name;
    this._image = link;
    this._cardId = cardId;
    this._userId = userId;
    this._ownerId = ownerId;
    this._likes = likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._template = template;
    this._data = data;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(this._data.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  // Получение количества лайков
  getCardLike() {
    return this._likeButton.classList.contains(this._data.cardActiveLikeClass);
  }

  setCardLike(likes) {
    // Счетчик лайков
    this._card.querySelector(this._data.cardLikesCount).textContent =
      likes.length;

    const likeState = likes.findIndex((owner) => owner._id === this._userId);

    if (likeState !== -1) {
      this._likeButton.classList.add(this._data.cardActiveLikeClass);
    } else {
      this._likeButton.classList.remove(this._data.cardActiveLikeClass);
    }
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    // Лайк
    this._card
      .querySelector(this._data.cardLikeButtonSelector)
      .addEventListener('click', () => {
        this._handleLikeClick(this);
      });

    // Удаление карточки
    this._card
      .querySelector(this._data.cardRemoveButtonSelector)
      .addEventListener('click', () => {
        this._handleRemoveClick(this);
      });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  generateCardLayout() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(this._data.cardImageSelector);
    this._setEventListeners();

    // Данные для попапа с картинкой
    this._card.querySelector(
      this._data.cardTitleSelector,
    ).textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.setAttribute(
      'alt',
      `Изображение на фотографии: ${this._title}`,
    );

    // Данные для лайка
    this._likeButton = this._card.querySelector(
      this._data.cardLikeButtonSelector,
    );

    this.setCardLike(this._likes);

    // Отрисовка корзины на своих карточках
    if (this._ownerId === this._userId) {
      this._card.querySelector(
        this._data.cardRemoveButtonSelector,
      ).style.display = 'block';
    }

    return this._card;
  }
}
