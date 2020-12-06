'use strict';

export default class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._data.inputInvalidClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._data.inputInvalidClass);
  }

  // Функция проверки валидации
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  // Переключение состояния кнопки
  _toggleButtonState() {
    const button = this._form.querySelector(this._data.submitButtonSelector);
    if (!this._form.checkValidity()) {
      button.classList.add(this._data.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._data.inactiveButtonClass);
      button.disabled = false;
    }
  }

  // Эвентлисенеры
  _setEventListeners() {
    const inputList = this._form.querySelectorAll(this._data.inputSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Очистка полей и ошибок попапа
  clearPopupInputs() {
    // Очистка текста
    this._form.reset();

    // Удаление красной полоски
    const inputList = this._form.querySelectorAll(this._data.inputSelector);
    inputList.forEach((input) => {
      input.classList.remove(this._data.inputInvalidClass);
    });

    // Удаление сообщения об ошибке
    const errorElement = this._form.querySelectorAll(
      this._data.inputErrorSelector
    );
    errorElement.forEach((error) => {
      error.textContent = '';
    });
  }

  // Неактивная кнопка при открытии попапа
  // Придумал только так, по аналогии с инпутами
  disableActiveButton() {
    const button = this._form.querySelector(this._data.submitButtonSelector);
    button.classList.add(this._data.inactiveButtonClass);
    button.disabled = true;
  }

  // Основная функция валидации
  enableValidation() {
    this._setEventListeners();
  }
}
