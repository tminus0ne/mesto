'use strict';

const formProfile = document.querySelector('.popup__container_profile');
const inputList = formProfile.querySelectorAll('.popup__input');
const submitButton = formProfile.querySelector('.popup__submit-button');

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
});

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

inputList.forEach((input) => {
  input.addEventListener('input', () => {
    chackValidity(formProfile, input);
    switchButtonState(submitButton, formProfile.checkValidity());
  });
});
