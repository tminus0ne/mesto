'use strict';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _closeButtonClick() {
    const closeButton = this._popupSelector.querySelector(
      '.popup__close-button',
    );
    closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  // Закрытие пр инажатии вне формы
  _windowClick() {
    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  // Закрытие попапа по Esc
  _handleEscClose(event) {
    const escapeKey = 'Escape';
    if (event.key === escapeKey) {
      this.close();
    }
  }

  // Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('click', this._windowClick);
  }

  setEventListeners() {
    this._closeButtonClick();
    this._windowClick();
  }
}
