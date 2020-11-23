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

// Очистка ошибок валидации
const errorMessages = document.querySelectorAll('.popup__input-error');
const popupInputs = document.querySelectorAll('.popup__input');

//Очистка инпутов
const popupForm = document.querySelectorAll('.popup__container');

// Тоггл состояния кнопки
const buttons = document.querySelectorAll('.popup__submit-button');

// Переменная для кнопки Escape
const escapeKey = 'Escape';

//! Валидация

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
function createCard(name, link) {
  const placeElement = placeTemplate.content.cloneNode(true);
  const likeButton = placeElement.querySelector('.place__like-button');
  const placeImage = placeElement.querySelector('.place__image');

  placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__image').src = link;

  // Форма карточки
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

//! Перебор исходного массива карточек
initialCards.forEach((card) =>
  placesList.append(createCard(card.name, card.link))
);

//! Функция добавленяи карточки пользователем
function createCustomCard(event) {
  event.preventDefault();

  const placeTitle = placePopup.querySelector('.popup__input_type_title').value;
  const placeUrl = placePopup.querySelector('.popup__input_type_url').value;

  placesList.prepend(createCard(placeTitle, placeUrl));
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
