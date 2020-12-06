'use strict';

export default class Card {
  constructor(data, name, link, template) {
    this._data = data;
    this._title = name;
    this._image = link;
    this._template = template;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._template)
      .content.querySelector(this._data.placeSelector)
      .cloneNode(true);

    return placeElement;
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
    popupImage.alt = this._title;

    popupImageElement.classList.add(this._data.imagePopupOpenedClass);
  }

  // Закрытие по нажатию Esc
  _handleEscClick() {
    document.addEventListener('keydown', (event) => {
      const escapeKey = 'Escape';
      if (event.key === escapeKey) {
        const popupImageElement = document.querySelector(
          this._data.imagePopupSelector
        );
        popupImageElement.classList.remove(this._data.imagePopupOpenedClass);
      }
    });
  }

  _setEventListeners() {
    // Лайк
    const likeButton = this._place.querySelector(
      this._data.placeLikeButtonSelector
    );
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(this._data.placeActiveLikeClass);
    });

    // Удаление карточки
    const removeButton = this._place.querySelector(
      this._data.placeRmoveButtonSelector
    );
    removeButton.addEventListener('click', () => {
      if (this._place) {
        this._place.remove();
      }
    });

    // Открытие попапа с картинкой
    const imagePopup = this._place.querySelector(this._data.placeImageSelector);
    imagePopup.addEventListener('click', () => {
      this._handleOpenPopup();
      this._handleEscClick();
    });
  }

  generatePlace() {
    this._place = this._getTemplate();
    this._setEventListeners();

    this._place.querySelector(
      this._data.placeTitleSelector
    ).textContent = this._title;
    this._place.querySelector(this._data.placeImageSelector).src = this._image;
    this._place
      .querySelector(this._data.placeImageSelector)
      .setAttribute('alt', `'Изображение на фотографии:' ${this._title}`);

    return this._place;
  }
}
