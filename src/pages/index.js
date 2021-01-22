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

  // Удаление
  cardRemoveForm,
} from '../utils/constants.js';

let userId;

//! Информация из API
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

//! Редактирование профиля
// Класс с информацией профиля
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar',
});

// Функция открытия попапа редактированяи профиля
function openProfilePopup() {
  profileEditFormValidator.clearPopupInputs();
  profileEditFormValidator.disableActiveButton();

  const user = profileInfo.getUserInfo();

  nameInput.value = user.name;
  jobInput.value = user.job;

  profileEditPopup.open();
}

// Попап редактирования профиля
const profileEditPopup = new PopupWithForm(
  {
    popupElement: '.popup_profile',
    handleFormSubmit: (user) => {
      profileEditPopup.setSubmitButtonText('Сохранение...');
      api
        .editUserInfo(user)
        .then((res) => {
          profileInfo.setUserInfo({
            profileName: res.name,
            profileOccupation: res.about,
          });
          profileEditPopup.close();
        })
        .finally(
          setTimeout(
            () => profileEditPopup.setSubmitButtonText('Сохранить'),
            1500,
          ),
        );
    },
  },
  profileEditForm,
);

//! Изменение аватара
// Функция открытия попапа изменения аватара
function openAvatarEditPopup() {
  avatarEditFormValidator.clearPopupInputs();
  avatarEditFormValidator.disableActiveButton();

  avatarEditPopup.open();
}

// Попап изменения аватара
const avatarEditPopup = new PopupWithForm({
  popupElement: '.popup_avatar',
  handleFormSubmit: (user) => {
    avatarEditPopup.setSubmitButtonText('Сохранение...');
    api
      .setNewAvatar(user)
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

//! Функция создания темплейта карточки
function createCard(card) {
  const cardElement = new Card(
    card.name,
    card.link,
    card._id,
    userId,
    card.owner._id,
    card.likes,
    openImagePopup,
    toggleCardLike,
    openRemoveCardPopup,
    '.card-template',
    cardClassData,
  ).generateCardLayout();

  return cardElement;
}

//! Секция с исходным массивом карточек
const cardListSection = new Section(
  {
    renderer: (card) => {
      cardListSection.addItem(createCard(card));
    },
  },
  cardsList,
);

//! Добавление карточки пользователем
// Функция открытия попапа добавления новой карточки
function openCardAddPopup() {
  cardAddFormValidator.clearPopupInputs();
  cardAddFormValidator.disableActiveButton();

  cardAddPopup.open();
}

// Попап добавления новой карточки
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

//! Попап с картинкой
const imagePopup = new PopupWithImage('.popup_image');

// Функция открытия попапа с картинкой
function openImagePopup(event) {
  const imageValues = {};
  imageValues.src = event.target.src;
  imageValues.textContent = event.target
    .closest('.card')
    .querySelector('.card__title').textContent;

  imagePopup.open(imageValues);
}

//! Функция переключения лайков
function toggleCardLike(card) {
  if (card.getCardLike()) {
    api
      .removeCardLike(card)
      .then((res) => card.setCardLike(res.likes))
      .catch((err) => console.log(err));
  } else {
    api
      .addCardLike(card)
      .then((res) => card.setCardLike(res.likes))
      .catch((err) => console.log(err));
  }
}

//! Удаление карточки
// Функция открытия попапа удаления карточки
function openRemoveCardPopup(card) {
  cardRemovePopup.card = card;
  cardRemovePopup.open();
}

// Попап удаления карточки
const cardRemovePopup = new PopupWithForm({
  popupElement: '.popup_remove',
  handleFormSubmit: () => {
    cardRemovePopup.setSubmitButtonText('Удаление...');
    api
      .removeCard(cardRemovePopup.card)
      .then(() => {
        cardRemovePopup.card.deleteCard();
        cardRemovePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(
        setTimeout(() => cardRemovePopup.setSubmitButtonText('Да'), 1500),
      );
  },
  cardRemoveForm,
});

//! Информация о пользователе и секция с карточками
const apiData = [api.getUserInfo(), api.getInitialCards()];
Promise.all(apiData)
  .then(([user, cards]) => {
    userId = user._id;

    profileInfo.setUserInfo({
      profileName: user.name,
      profileOccupation: user.about,
    });

    profileInfo.setUserAvatar(user.avatar);

    cardListSection.renderItems(cards);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

//! Эвентлисенеры
// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Открытие попапа добавления нового места
cardAddPopupOpenButton.addEventListener('click', openCardAddPopup);

// Открытие поапап изменения аватара
avatarEditPopupOpenButton.addEventListener('click', openAvatarEditPopup);
