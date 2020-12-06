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

// Инпуты добавления нового места
const placeTitle = placePopup.querySelector('.popup__input_type_title');
const placeUrl = placePopup.querySelector('.popup__input_type_url');

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
const cardClassData = {
  placeSelector: '.place',
  placeLikeButtonSelector: '.place__like-button',
  placeActiveLikeClass: 'place__like-button_active',
  placeRmoveButtonSelector: '.place__remove-button',
  placeTitleSelector: '.place__title',
  placeImageSelector: '.place__image',

  popupClass: 'popup',
  imagePopupSelector: '.popup_image',
  imagePopupOpenedClass: 'popup_opened',
  imagePopupPhotoSelector: '.popup__photo',
  imagePopupTitleSelector: '.popup__place-title',
};
// Сделал по аналогии с валидацией

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
// Профиль
const profileEditFormValidator = new FormValidator(
  formValidationData,
  profileEditForm
);
profileEditFormValidator.enableValidation();

// Новое место
const placeAddFormValidator = new FormValidator(
  formValidationData,
  placeAddForm
);
placeAddFormValidator.enableValidation();

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

function clearInputErrors() {
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

//! Функция переключения активной кнопки сабмита
function toggleButtonActivity(popup) {
  popup.classList.add('popup__submit-button_disabled');
  popup.disabled = true;
}

function toggleCurrentButtons() {
  buttons.forEach((event) => {
    toggleButtonActivity(event);
  });
}

//! Общие функции для открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnWindowClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('mousedown', closePopupOnWindowClick);
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

//! Функция создания карточки
function createCard(name, link) {
  const placeElement = new Card(
    cardClassData,
    name,
    link,
    '.place-template'
  ).generatePlace();

  return placeElement;
}

//! Функция создания исходного массива карточек
initialCards.forEach((card) => {
  placesList.append(createCard(card.name, card.link));
});

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();
  placesList.prepend(createCard(placeTitle.value, placeUrl.value));
  closePopup(placePopup);
}

//! Функция закрытия попапа при нажатии на Esc
function closePopupOnEsc(event) {
  if (event.key === escapeKey) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    clearInputErrors();
  }
}

//! Функция закрытия попапа при нажатии на любое место окна просмотра
function closePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
    clearInputErrors();
  }
}

//! Эвентлисенеры

// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', () => {
  toggleCurrentButtons();
  openProfilePopup();
});

// Сабмит попапа редактирования профиля
profilePopup.addEventListener('submit', profileEditFormSubmitHandler);

// Закрытие попапа редактирования профиля
profilePopupCloseButton.addEventListener('click', () => {
  clearInputErrors();
  closePopup(profilePopup);
});

// Открытие попапа добавления нового места
placePopupOpenButton.addEventListener('click', () => {
  toggleCurrentButtons();
  clearInputErrors();
  openPopup(placePopup);
});

// Сабмит попапа нового места
placePopup.addEventListener('submit', createCustomCard);

// Закрытие попапа добавления нового места
placePopupCloseButton.addEventListener('click', () => {
  clearInputErrors();
  closePopup(placePopup);
});

// Закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});
