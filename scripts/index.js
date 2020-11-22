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

// Переменная для кнопки Escape
const escapeKey = 'Escape';

//! Общие функции для открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  toggleButtonActivity();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  clearErrorMessage();
  removeInvalidInputClass();
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
    openPopup(imagePopup);
    imagePopupPlacePhoto.src = event.target.src;
    imagePopupPlaceTitle.textContent = name;
  }
  placeImage.addEventListener('click', openImagePopup);

  return placeElement;
}

initialCards.forEach((card) =>
  placesList.append(createCard(card.name, card.link))
);

//! Функция открытия попапа добавления нового места
function openPlacePopup() {
  openPopup(placePopup);
  placePopupTitleInput.value = '';
  placePopupUrlInput.value = '';
}

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();

  const placeTitle = placePopup.querySelector('.popup__input_type_title').value;
  const placeUrl = placePopup.querySelector('.popup__input_type_url').value;

  placesList.prepend(createCard(placeTitle, placeUrl));
  closePopup(placePopup);
}

//! Эвентлисенеры

// Открытие попапа добавления нового места
placePopupOpenButton.addEventListener('click', openPlacePopup);

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

//! MESTO project ch.3

// Очистка ошибок валидации
const errorMessages = document.querySelectorAll('.popup__input-error');
const popupInputs = document.querySelectorAll('.popup__input');
const buttons = document.querySelectorAll('.popup__submit-button');

//! Функции очистки ошибок валидации
function clearErrorMessage() {
  errorMessages.forEach((event) => {
    event.textContent = '';
  });
}

function removeInvalidInputClass() {
  popupInputs.forEach((event) => {
    event.classList.remove('popup__input_invalid');
  });
}

//! Функция переключения активной кнопки сабмита
function toggleButtonActivity() {
  buttons.forEach((event) => {
    event.classList.add('popup__submit-button_disabled');
    event.disabled = true;
  });
}
