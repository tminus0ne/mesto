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

// Переменная для кнопки Escape
const escapeKey = 'Escape';

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

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__occupation',
});

console.log(profileInfo);

// Функция открытия попапа редактированяи профиля
//? Работает
function openProfilePopup() {
  profileEditFormValidator.clearPopupInputs();
  profileEditFormValidator.disableActiveButton();

  const user = profileInfo.getUserInfo();

  nameInput.value = user.name;
  jobInput.value = user.job;

  profileEditPopup.open();
}

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

console.log(profileEditPopup);

// // Функция сохранения новых данных профиля
// function profileEditFormSubmitHandler(event) {
//   event.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileOccupation.textContent = jobInput.value;
//   closePopup(profilePopup);
// }

//! Функция создания карточки
function createCard(card) {
  const cardElement = new Card(
    cardClassData,
    card.name,
    card.link,
    '.card-template',
  ).generateCardLayout();

  return cardElement;
}

//! Класс с исходным массивом карточек
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

//! Функция добавленяи карточки пользователем
// function createCustomCard(event) {
//   event.preventDefault();
//   cardsList.prepend(createCard(cardTitle.value, cardUrl.value));
//   closePopup(cardPopup);
// }

// TODO const cardAddPopup = new PopupWithForm(
//   {
//     popupSelector: '.popup_card',
//     handleFormSubmit: (formData) => {
//       // cardListSection.addCustomItem(
//       //   createCard({ link: formData.link, name: formData.title }),
//       // );

//       // cardAddPopup.close();

//       const card = new Card(formData.title, formData.url);
//       const cardElement = card.generateCardLayout();

//       cardListSection.addCustomItem(cardElement);
//     },
//   },
//   '.popup__container_card',
//   popupSelectorsData,
// );
// TODO

// Функция закрытия попапа при нажатии на Esc
// function closePopupOnEsc(event) {
//   if (event.key === escapeKey) {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// Функция закрытия попапа при нажатии на любое место окна просмотра
function closePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

//! Эвентлисенеры

// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Сабмит попапа редактирования профиля
// profilePopup.addEventListener('submit', profileEditFormSubmitHandler);

// Закрытие попапа редактирования профиля
// profilePopupCloseButton.addEventListener('click', () => {
//   closePopup(profilePopup);
// });

// Открытие попапа добавления нового места
cardPopupOpenButton.addEventListener('click', () => {
  cardAddFormValidator.clearPopupInputs();
  cardAddFormValidator.disableActiveButton();
  cardAddPopup.open();
});

// Сабмит попапа нового места
// cardPopup.addEventListener('submit', createCustomCard);

// Закрытие попапа добавления нового места
// cardPopupCloseButton.addEventListener('click', () => {
//   closePopup(cardPopup);
// });

// Закрытие попапа с картинкой
// imagePopupCloseButton.addEventListener('click', () => {
//   closePopup(imagePopup);
// });
