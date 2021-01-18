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
import Api from '../components/Api.js';

//! Импорт переменных
import {
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

  // Аватар
  avatarEditPopupOpenButton,
  avatarEditForm,
} from '../utils/constants.js';

//! API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '0317c846-fa90-4414-9658-7dd1e3d83b45',
    'Content-Type': 'application/json',
  },
});

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

// Аватар
const avatarEditFormValidator = new FormValidator(
  formValidationData,
  avatarEditForm,
);
avatarEditFormValidator.enableValidation();

//! Класс с информацией профиля
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar',
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

//! Получение карточек с сервера и добавление своей карточки
api.getInitialCards().then((res) => {
  // Секция с исходным массивом карточек
  const cardListSection = new Section(
    {
      items: res,
      renderer: (card) => {
        cardListSection.addItem(createCard(card));
      },
    },
    cardsList,
  );

  cardListSection.renderItems();

  // Добавление карточки пользователем
  const cardAddPopup = new PopupWithForm(
    {
      popupElement: '.popup_card',
      handleFormSubmit: (card) => {
        cardAddPopup.setSubmitButtonText('Создание...');
        api
          .addCustomCard(card)
          .then((res) => {
            cardListSection.addCustomItem(createCard(res));
            cardAddPopup.close();
          })
          .finally(
            setTimeout(() => cardAddPopup.setSubmitButtonText('Создать'), 1500),
          );
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

  // Открытие попапа добавления нового места
  cardAddPopupOpenButton.addEventListener('click', openCardAddPopup);
});

// Открытие попапа изменения аватара
const avatarEditPopup = new PopupWithForm({
  popupElement: '.popup_avatar',
  handleFormSubmit: (user) => {
    avatarEditPopup.setSubmitButtonText('Сохранение...');
    api
      .setNewAvatar(user.avatar)
      .then((res) => {
        profileInfo.setUserAvatar(res.avatar);
        avatarEditPopup.close();
      })
      .finally(
        setTimeout(
          () => avatarEditPopup.setSubmitButtonText('Сохранить'),
          1500,
        ),
      );
  },
  avatarEditForm,
});

// Функция открытия попапа изменения аватара
function openAvatarEditPopup() {
  avatarEditFormValidator.clearPopupInputs();
  avatarEditFormValidator.disableActiveButton();

  avatarEditPopup.open();
}

//! Эвентлисенеры
// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Открытие поапап изменения аватара
avatarEditPopupOpenButton.addEventListener('click', openAvatarEditPopup);
