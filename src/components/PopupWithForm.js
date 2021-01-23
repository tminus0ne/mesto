'use strict';

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupElement, handleFormSubmit }) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();

    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._submitButton = this._popupElement.querySelector(
      '.popup__submit-button',
    );
  }

  // Получение значений инпутов
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _setEventListeners() {
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  // close() {
  //   super.close();
  //   this._formSelector.reset();
  // }

  // Сброс формы реализован в валидаторе
}
