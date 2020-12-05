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

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState(isEnable) {
    const button = this._form.querySelector(this._data.submitButtonSelector);
    if (isEnable) {
      button.classList.remove(this._data.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._data.inactiveButtonClass);
      button.disabled = true;
    }
  }

  _addEventListeners() {
    const inputList = this._form.querySelectorAll(this._data.inputSelector);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(
          input.checkValidity(),
          this._data.submitButtonSelector
        );
      });
    });
  }

  enableValidation() {
    this._addEventListeners();
    this._toggleButtonState(this._data.submitButtonSelector);
  }
}
