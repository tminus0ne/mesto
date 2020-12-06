'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';

//! Объявление переменных
// Открытие и закрытие попапа
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_profile');

const profilePopupOpenButton = profile.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector(
  '.popup__close-button'
);

// Редактирование
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_occupation');

const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');

// Открытие и закрытие попапа нового места
const placePopup = document.querySelector('.popup_place');
const placePopupOpenButton = profile.querySelector('.profile__add-button');
const placePopupCloseButton = placePopup.querySelector('.popup__close-button');

// Список карточек
const placesList = document.querySelector('.places');

// Попап с выбранной картинкой
const imagePopup = document.querySelector('.popup_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

// Очистка ошибок валидации
const errorMessages = document.querySelectorAll('.popup__input-error');
const popupInputs = document.querySelectorAll('.popup__input');

//Очистка инпутов
const popupForm = document.querySelectorAll('.popup__container');

// Тоггл состояния кнопки
const buttons = document.querySelectorAll('.popup__submit-button');

// Переменная для кнопки Escape
const escapeKey = 'Escape';

//! Объект с классами карточки
// const cardClassData = {

// }

//! Объект с классами форм
const formValidationData = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputInvalidClass: 'popup__input_invalid',
};

//! Формы попапов для валидации
const profileEditForm = document.querySelector('.popup__container_profile');
const placeAddForm = document.querySelector('.popup__container_place');

//! Вызов валидации для каждой формы
new FormValidator(formValidationData, profileEditForm).enableValidation();
new FormValidator(formValidationData, placeAddForm).enableValidation();

//! Функции очистки инпутов попапов
function clearPopupInputs(popup) {
  popup.reset();
}

//! Функции очистки ошибок валидации
function clearErrorMessage(popup) {
  popup.textContent = '';
}

function removeInvalidInputClass(popup) {
  popup.classList.remove('popup__input_invalid');
}

//! Функция переключения активной кнопки сабмита
function toggleButtonActivity(popup) {
  popup.classList.add('popup__submit-button_disabled');
  popup.disabled = true;
}

//! Общие функции для открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);

  buttons.forEach((popup) => {
    toggleButtonActivity(popup);
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);

  popupForm.forEach((popup) => {
    clearPopupInputs(popup);
  });

  errorMessages.forEach((popup) => {
    clearErrorMessage(popup);
  });

  popupInputs.forEach((popup) => {
    removeInvalidInputClass(popup);
  });
}

//! Функция открытия попапа редактированяи профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  openPopup(profilePopup);
}

//! Функция сохранения новых данных профиля
function profileEditFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(profilePopup);
}

//! Функция создания исходного массива карточек
initialCards.forEach((card) => {
  const place = new Card(card.name, card.link, '.place-template');
  const placeElement = place.generatePlace();

  placesList.append(placeElement);
});

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();

  const placeTitle = placePopup.querySelector('.popup__input_type_title').value;
  const placeUrl = placePopup.querySelector('.popup__input_type_url').value;
  const place = new Card(placeTitle, placeUrl, '.place-template');

  placesList.prepend(place.generatePlace());
  closePopup(placePopup);
}

//! Функция закрытия попапа при нажатии на Esc
function closePopupOnEsc(event) {
  if (event.key === escapeKey) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//! Функция закрытия попапа при нажатии на любое место окна просмотра
function closePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

//! Эвентлисенеры

// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Сабмит попапа редактирования профиля
profilePopup.addEventListener('submit', profileEditFormSubmitHandler);

// Закрытие попапа редактирования профиля
profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});
profilePopup.addEventListener('mousedown', closePopupOnWindowClick);

// Открытие попапа добавления нового места
placePopupOpenButton.addEventListener('click', () => {
  openPopup(placePopup);
});

// Сабмит попапа нового места
placePopup.addEventListener('submit', createCustomCard);

// Закрытие попапа добавления нового места
placePopupCloseButton.addEventListener('click', () => {
  closePopup(placePopup);
});
placePopup.addEventListener('mousedown', closePopupOnWindowClick);

// Закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});
imagePopup.addEventListener('mousedown', closePopupOnWindowClick);
