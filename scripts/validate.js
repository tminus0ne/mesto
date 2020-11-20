'use strict';

function showError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add('popup__input_invalid');
}

function hideError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove('popup__input_invalid');
}

function chackValidity(form, input) {
  if (!input.validity.valid) {
    showError(form, input);
  } else {
    hideError(form, input);
  }
}

function switchButtonState(button, isEnable) {
  if (isEnable) {
    button.classList.remove('popup__submit-button_disabled');
    button.disabled = false;
  } else {
    button.classList.add('popup__submit-button_disabled');
    button.disabled = true;
  }
}

function addEventListeners(form) {
  const inputList = form.querySelectorAll('.popup__input');
  const submitButton = form.querySelector('.popup__submit-button');

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      chackValidity(form, input);
      switchButtonState(submitButton, form.checkValidity());
    });
  });
}

function enableValidation() {
  const forms = document.querySelectorAll('.popup__container');

  forms.forEach((form) => {
    addEventListeners(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const submitButton = form.querySelector('.popup__submit-button');
    switchButtonState(submitButton, form.checkValidity());
  });
}

enableValidation();
