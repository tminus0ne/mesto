'use strict';

//! Исходный массив карточек
const initialCards = [
  {
    name: 'Ольхон',
    link:
      'https://images.unsplash.com/photo-1548130516-2ca6aaeb84b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Выборг',
    link:
      'https://images.unsplash.com/photo-1555966380-9ee3a8b733b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Камчатка',
    link:
      'https://images.unsplash.com/photo-1568028476727-0c86534220fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
  },
  {
    name: 'Аршан',
    link:
      'https://images.unsplash.com/photo-1591453374585-87f76788ace9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: 'Москва',
    link:
      'https://images.unsplash.com/photo-1521815049196-8a76f26a2135?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
  },
  {
    name: 'Онежское озеро',
    link:
      'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
  },
];

//! MESTO project ch.1

//! Попап редактирования данных профиля

//! Объявление переменных
// Открытие и закрытие попапа
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_profile');

const profilePopupOpenButton = profile.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector(
  '.popup__close-button'
);

// Редактирование
const profileFormSubmit = profilePopup.querySelector(
  '.popup__container_profile'
);
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_occupation');

const profileName = profile.querySelector('.profile__name');
const profileOccupation = profile.querySelector('.profile__occupation');

//! Функция открытия попапа редактированяи профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  profilePopup.classList.add('popup_opened');
}

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

//! Функция закрытия окна попапа профиля по нажатию Escape
function closeProfilePopupOnEsc(event) {
  if (event.key === 'Escape') {
    closeProfilePopup();
  }
}

//! Функция закрытия окна попапа профиля по нажатию на пустое место окна
function closeProfilePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup')) {
    closeProfilePopup();
  }
}

//! Функция сохранения новых данных профиля
function profileEditFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closeProfilePopup();
}

//! Эвентлисенеры
// Открытие попапа редактирования профиля
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Сабмит попапа редактирования профиля
profileFormSubmit.addEventListener('submit', profileEditFormSubmitHandler);

// Закрытие попапа редактирования профиля
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profilePopup.addEventListener('mousedown', closeProfilePopupOnWindowClick);
window.addEventListener('keydown', closeProfilePopupOnEsc);

//! MESTO project ch.2

//! Объявление переменных
// Открытие и закрытие попапа
const placePopup = document.querySelector('.popup_place');
const placePopupOpenButton = profile.querySelector('.profile__add-button');
const placePopupCloseButton = placePopup.querySelector('.popup__close-button');
const placePopupTitleInput = placePopup.querySelector(
  '.popup__input_type_title'
);
const placePopupUrlInput = placePopup.querySelector('.popup__input_type_url');

// Список карточек
const placesList = document.querySelector('.places');

// Темплейт формы карточки
const placeTemplate = document.querySelector('.place__template');

// Попап с выбранной картинкой
const imagePopup = document.querySelector('.popup_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupPlacePhoto = imagePopup.querySelector('.popup__photo');
const imagePopupPlaceTitle = imagePopup.querySelector('.popup__place-title');

//! Функция создания исходного массива карточек
function createCard(name, link) {
  const placeElement = placeTemplate.content.cloneNode(true);
  const likeButton = placeElement.querySelector('.place__like-button');
  const placeImage = placeElement.querySelector('.place__image');

  placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__image').src = link;

  placeElement
    .querySelector('.place__remove-button')
    .addEventListener('click', (event) => {
      const place = event.target.closest('.place');

      if (place) {
        place.remove();
      }
    });

  // Лайк
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('place__like-button_active');
  });

  // Функция открытия попапа с картинкой
  function openImagePopup(event) {
    imagePopup.classList.add('popup_opened');
    imagePopupPlacePhoto.src = event.target.src;
    imagePopupPlaceTitle.textContent = name;
  }
  placeImage.addEventListener('click', openImagePopup);

  placesList.prepend(placeElement);
}

initialCards.forEach((card) => createCard(card.name, card.link));

//! Функция открытия попапа добавления нового места
function openPlacePopup() {
  placePopup.classList.add('popup_opened');
  placePopupTitleInput.value = '';
  placePopupUrlInput.value = '';
}

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();

  const placeTitle = placePopup.querySelector('.popup__input_type_title').value;
  const placeUrl = placePopup.querySelector('.popup__input_type_url').value;

  createCard(placeTitle, placeUrl);
  closePlacePopup();
}

//? Закрытие попапа нового места
function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

function closePlacePopupOnEsc(event) {
  if (event.key === 'Escape') {
    closePlacePopup();
  }
}

function closePlacePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup_place')) {
    closePlacePopup();
  }
}

//? Закрытие попапа с картинкой
function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
}

function closeImagePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup_image')) {
    closeImagePopup();
  }
}

function closeImagePopupOnEsc(event) {
  if (event.key === 'Escape') {
    closeImagePopup();
  }
}

//! Эвентлисенеры

// Открытие попапа добавления нового места
placePopupOpenButton.addEventListener('click', openPlacePopup);

// Сабмит попапа нового места
placePopup.addEventListener('submit', createCustomCard);

// Закрытие попапа добавления нового места
placePopupCloseButton.addEventListener('click', closePlacePopup);
placePopup.addEventListener('mousedown', closePlacePopupOnWindowClick);
window.addEventListener('keydown', closePlacePopupOnEsc);

// Закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', closeImagePopup);
imagePopup.addEventListener('mousedown', closeImagePopupOnWindowClick);
window.addEventListener('keydown', closeImagePopupOnEsc);
