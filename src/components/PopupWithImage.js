'use strict';

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__photo');
    this._popupImageTitle = this._popupSelector.querySelector(
      '.popup__card-title',
    );
  }

  open(image) {
    super.open();
    this._popupImage.src = image.src;
    this._popupImageTitle.textContent = image.textContent;
    this._popupImage.alt = `Изображение на фотографии: ${image.textContent}`;
  }
}
