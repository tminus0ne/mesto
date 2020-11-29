'use strict';

//! Объект с классами форм
const enableValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputInvalidClass: 'popup__input_invalid',
};

//! Функция отображения сообщения об ошибке
function showInputError(form, input, object) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(object.inputInvalidClass);
}

//! Функция скрытия сообщения об ошибке
function hideInputError(form, input, object) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove(object.inputInvalidClass);
}

//! Функция проверки валидности инпутов
function checkInputValidity(form, input, object) {
  if (!input.validity.valid) {
    showInputError(form, input, object);
  } else {
    hideInputError(form, input, object);
  }
}

//! Функция переключения состояния кнопки
function toggleButtonState(button, isEnable, object) {
  if (isEnable) {
    button.classList.remove(object.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(object.inactiveButtonClass);
    button.disabled = true;
  }
}

//! Функция добавления эвентличенеров
function addEventListeners(form, object) {
  const inputList = form.querySelectorAll(object.inputSelector);
  const submitButton = form.querySelector(object.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, object);
      toggleButtonState(submitButton, form.checkValidity(), object);
    });
  });
}

//! Функция валидации формы
function addFormValidation(object) {
  const forms = document.querySelectorAll(object.formSelector);

  forms.forEach((form) => {
    addEventListeners(form, object);

    const submitButton = form.querySelector(object.submitButtonSelector);
    toggleButtonState(submitButton, form.checkValidity(), object);
  });
}

//! Вызов функции валидации
addFormValidation(enableValidation);
