'use strict';

//! Объявление переменных

//Попап
let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let profileEdit = profile.querySelector('.profile__edit-button');
let popupClose = popup.querySelector('.popup__close-button');

//Редактирование
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_occupation');

let profileName = profile.querySelector('.profile__name');
let profileOccupation = profile.querySelector('.profile__occupation');

//! Функция открытия попапа
function popupOpened() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  popup.classList.add('popup_opened');
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

function popupWindowClose(event) {
  if (event.target.classList.contains('popup')) {
    popupClosed();
  }
}

//! Функция редактирования профиля

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  popupClosed();
}

//! Функция закрытия окна по нажатию Escape
function formSubmitClose(event) {
  if (event.key === 'Escape') {
    popupClosed();
  }
}

//! Эвентлисенеры

// Открытие попапа
profileEdit.addEventListener('click', popupOpened);

// Закрытие попапа по нажатию на крестик
popupClose.addEventListener('click', popupClosed);

// Закрытие папапа по нажатию на любую точку окна
popup.addEventListener('mousedown', popupWindowClose);

// Закрытие попапа по нажатию Escape
window.addEventListener('keydown', formSubmitClose);

// Сабмит попапа по нажатию кнопки Сохранить
formElement.addEventListener('submit', formSubmitHandler);
