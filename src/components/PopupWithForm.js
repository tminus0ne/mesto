'use strict';

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupElement, handleFormSubmit }, formSelector) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = formSelector;
    this._setEventListeners();
  }

  // Получение значений инпутов
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
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

  close() {
    // По заданию работы форму надо ресетить при закрытии
    // не совсем понял, надо ли ресетить здесь, если ресет уже есть в валидаторе
    // и там это у меня сделано при открытии, потому что при закрытии заметен ресет инпутов и сброс ошибок
    // и это выглядит странно на сой взгляд, как пользователя
    // у нас в слаке был тред на эту тему https://yandex-students.slack.com/archives/G018NEU0QAH/p1607185226278800

    // this._formSelector.reset();
    super.close();
  }
}
