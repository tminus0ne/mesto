'use strict';

function showError(form, input, object) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(object.inputErrorClass);
}

function hideError(form, input, object) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(object.inputErrorClass);
}

function checkInputValidation(form, input, object) {
  if (input.validity.valid) {
    hideError(form, input, object);
  } else {
    showError(form, input, object);
  }
}

function switchButtonState(button, isEnable, object) {
  if (isEnable) {
    button.classList.remove(object.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(object.inactiveButtonClass);
    button.disabled = true;
  }
}

function addEventListeners(form, object) {
  const inputList = form.querySelectorAll(object.inputSelector);
  const submitButton = form.querySelector(object.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidation(form, input, object);
      switchButtonState(submitButton, form.checkValidity(), object);
    });
  });
}

function addFormValidation(object) {
  const forms = document.querySelectorAll(object.formSelector);

  forms.forEach((form) => {
    addEventListeners(form, object);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const submitButton = form.querySelector(object.submitButtonSelector);
    switchButtonState(submitButton, form.checkValidity(), object);
  });
}

const enableValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
};

addFormValidation(enableValidation);
