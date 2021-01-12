'use strict';

//! Импорт css
import '../pages/index.css';

//! Импорт компонентов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//! Импорт переменных
import {
  // Карточки
  initialCards,

  // Валидация
  cardClassData,
  formValidationData,

  // Кнопки открытия попапов
  profilePopupOpenButton,
  cardAddPopupOpenButton,

  // Формы попапов
  profileEditForm,
  cardAddForm,

  //Инпуты попапа редактирования профиля
  nameInput,
  jobInput,

  // Секция карточек
  cardsList,
} from '../utils/constants.js';

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

//! Класс с информацией профиля
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__occupation',
});

//! Попап редактирования профиля
const profileEditPopup = new PopupWithForm(
  {
    popupElement: '.popup_profile',
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

//! Функция открытия попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');

function openImagePopup(event) {
  const imageValues = {};
  imageValues.src = event.target.src;
  imageValues.textContent = event.target
    .closest('.card')
    .querySelector('.card__title').textContent;

  imagePopup.open(imageValues);
}

//! Функция создания темплейта карточки
function createCard(card) {
  const cardElement = new Card(
    cardClassData,
    card.name,
    card.link,
    '.card-template',
    openImagePopup,
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
    popupElement: '.popup_card',
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
