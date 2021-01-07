'use strict';

//! Импорт css
import '../vendor/normalize.css';
import '../pages/index.css';

//! Импорт компонентов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

//! Импорт переменных
import {
  // Карточки
  initialCards,

  // Валидация
  cardClassData,
  formValidationData,
} from '../utils/constants.js';

//! Объявление переменных
// Открытие и закрытие попапа
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_profile');

const profilePopupOpenButton = profile.querySelector('.profile__edit-button');

// Редактирование
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_occupation');

// Открытие и закрытие попапа нового места
const cardPopup = document.querySelector('.popup_card');
const cardAddPopupOpenButton = profile.querySelector('.profile__add-button');

// Список карточек
const cardsList = document.querySelector('.cards');

// Попап с выбранной картинкой
const imagePopup = document.querySelector('.popup_image');

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

// Класс с информацией профиля
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__occupation',
});

//! Функции попапов
// Редактирование профиля
const profileEditPopup = new PopupWithForm(
  {
    popupSelector: '.popup_profile',
    handleFormSubmit: (user) => {
      profileInfo.setUserInfo(user.name, user.job);
      profileEditPopup.close();
    },
  },
  profileEditForm,
);

// Функция открытия попапа редактированяи профиля
function openProfilePopup() {
  profileEditFormValidator.clearPopupInputs();
  profileEditFormValidator.disableActiveButton();

  const user = profileInfo.getUserInfo();

  nameInput.value = user.name;
  jobInput.value = user.job;

  profileEditPopup.open();
}

//! Функция создания темплейта карточки
function createCard(card) {
  const cardElement = new Card(
    cardClassData,
    card.name,
    card.link,
    '.card-template',
  ).generateCardLayout();

  return cardElement;
}

//! Секция с исходным массивом карточек
const cardListSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardListSection.addItem(createCard(card));
    },
  },
  cardsList,
);

cardListSection.renderItems();

//! Добавление карточки пользователем
const cardAddPopup = new PopupWithForm(
  {
    popupSelector: '.popup_card',
    handleFormSubmit: (card) => {
      cardListSection.addCustomItem(createCard(card));
      cardAddPopup.close();
    },
  },
  cardAddForm,
);

// Функция открытия попапа добавления нового места
function openCardAddPopup() {
  cardAddFormValidator.clearPopupInputs();
  cardAddFormValidator.disableActiveButton();

  cardAddPopup.open();
}

//! Эвентлисенеры

// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Открытие попапа добавления нового места
cardAddPopupOpenButton.addEventListener('click', openCardAddPopup);
