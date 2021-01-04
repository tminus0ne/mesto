'use strict';

import '../vendor/normalize.css';
import '../pages/index.css';
import { initialCards } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

//! Объявление переменных
// Открытие и закрытие попапа
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_profile');

const profilePopupOpenButton = profile.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector(
  '.popup__close-button',
);

// Редактирование
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_occupation');

const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');

// Открытие и закрытие попапа нового места
const cardPopup = document.querySelector('.popup_card');
const cardPopupOpenButton = profile.querySelector('.profile__add-button');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

// Инпуты добавления нового места
const cardTitle = cardPopup.querySelector('.popup__input_type_title');
const cardUrl = cardPopup.querySelector('.popup__input_type_url');

// Список карточек
const cardsList = document.querySelector('.cards');

// Попап с выбранной картинкой
const imagePopup = document.querySelector('.popup_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

// Тоггл состояния кнопки
const buttons = document.querySelectorAll('.popup__submit-button');

// Переменная для кнопки Escape
const escapeKey = 'Escape';

//! Объект с классами карточки
const cardClassData = {
  cardSelector: '.card',
  cardLikeButtonSelector: '.card__like-button',
  cardActiveLikeClass: 'card__like-button_active',
  cardRmoveButtonSelector: '.card__remove-button',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',

  popupClass: 'popup',
  imagePopupSelector: '.popup_image',
  imagePopupOpenedClass: 'popup_opened',
  imagePopupPhotoSelector: '.popup__photo',
  imagePopupTitleSelector: '.popup__card-title',
};

//! Объект с классами форм
const formValidationData = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputInvalidClass: 'popup__input_invalid',
  inputErrorSelector: '.popup__input-error',
};

// Формы попапов для валидации
const profileEditForm = document.querySelector('.popup__container_profile');
const cardAddForm = document.querySelector('.popup__container_card');

//! Вызов валидации для каждой формы
// Профиль
const profileEditFormValidator = new FormValidator(
  formValidationData,
  profileEditForm,
);
profileEditFormValidator.enableValidation();

// Новое место
const cardAddFormValidator = new FormValidator(formValidationData, cardAddForm);
cardAddFormValidator.enableValidation();

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

// Функция открытия попапа редактированяи профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  openPopup(profilePopup);
}

// Функция сохранения новых данных профиля
function profileEditFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(profilePopup);
}

//! Функция создания карточки
function createCard(name, link) {
  const cardElement = new Card(
    cardClassData,
    name,
    link,
    '.card-template',
  ).generateCardLayout();

  return cardElement;
}

//! Функция создания исходного массива карточек
initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link));
});

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();
  cardsList.prepend(createCard(cardTitle.value, cardUrl.value));
  closePopup(cardPopup);
}

// Функция закрытия попапа при нажатии на Esc
function closePopupOnEsc(event) {
  if (event.key === escapeKey) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия попапа при нажатии на любое место окна просмотра
function closePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

//! Эвентлисенеры

// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', () => {
  profileEditFormValidator.clearPopupInputs();
  profileEditFormValidator.disableActiveButton();
  openProfilePopup();
});

// Сабмит попапа редактирования профиля
profilePopup.addEventListener('submit', profileEditFormSubmitHandler);

// Закрытие попапа редактирования профиля
profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

// Открытие попапа добавления нового места
cardPopupOpenButton.addEventListener('click', () => {
  cardAddFormValidator.clearPopupInputs();
  cardAddFormValidator.disableActiveButton();
  openPopup(cardPopup);
});

// Сабмит попапа нового места
cardPopup.addEventListener('submit', createCustomCard);

// Закрытие попапа добавления нового места
cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

// Закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});
