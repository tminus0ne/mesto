'use strict';

//! Попап редактирования данных профиля

//! Объявление переменных
// Открытие и закрытие попапа
let profile = document.querySelector('.profile');
let profilePopup = document.querySelector('.popup_profile');

let profilePopupOpenButton = profile.querySelector('.profile__edit-button');
let profilePopupCloseButton = profilePopup.querySelector(
  '.popup__close-button'
);

// Редактирование
let profileFormSubmit = profilePopup.querySelector('.popup__container_profile');
let nameInput = profilePopup.querySelector('.popup__input_type_name');
let jobInput = profilePopup.querySelector('.popup__input_type_occupation');

let profileName = profile.querySelector('.profile__name');
let profileOccupation = profile.querySelector('.profile__occupation');

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

//! Эвентлисенеры попапа редактирования профиля
// Открытие попапа
profilePopupOpenButton.addEventListener('click', openProfilePopup);

// Закрытие попапа по нажатию на крестик
profilePopupCloseButton.addEventListener('click', closeProfilePopup);

// Закрытие папапа по нажатию на любую точку окна
profilePopup.addEventListener('mousedown', closeProfilePopupOnWindowClick);

// Закрытие попапа по нажатию Escape
window.addEventListener('keydown', closeProfilePopupOnEsc);

// Сабмит попапа по нажатию кнопки Сохранить
profileFormSubmit.addEventListener('submit', profileEditFormSubmitHandler);

//! Попап добавления нового места

//! Объявление переменных
// Открытие и закрытие попапа
let placePopup = document.querySelector('.popup_place');

let placePopupOpenButton = profile.querySelector('.profile__add-button');
let placePopupCloseButton = placePopup.querySelector('.popup__close-button');

// Редактирвоание
let placeFormSubmit = placePopup.querySelector('.popup__container_place');

// TODO здесь нужно добавить переменные для полей ввода

//! Функция открытия попапа добавления нового места
function openPlacePopup() {
  placePopup.classList.add('popup_opened');
  // TODO здесь нужно добавить данные из заполненных полей
}

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

//! Функция закрытия окна попапа профиля по нажатию Escape
function closePlacePopupOnEsc(event) {
  if (event.key === 'Escape') {
    closePlacePopup();
  }
}

//! Функция закрытия окна попапа профиля по нажатию на пустое место окна
function closePlacePopupOnWindowClick(event) {
  if (event.target.classList.contains('popup_place')) {
    closePlacePopup();
  }
}

//! Функция сохранения нового места
function placeFormSubmitHandler(event) {
  event.preventDefault();
  // TODO узнать (придумать) куда сабмитить
  closePlacePopup();
}

//! Эвентлисенеры попапа нового места
// Открытие попапа
placePopupOpenButton.addEventListener('click', openPlacePopup);

// Закрытие попапа по нажатию на крестик
placePopupCloseButton.addEventListener('click', closePlacePopup);

// Закрытие папапа по нажатию на любую точку окна
placePopup.addEventListener('mousedown', closePlacePopupOnWindowClick);

// Закрытие попапа по нажатию Escape
window.addEventListener('keydown', closePlacePopupOnEsc);

// Сабмит попапа по нажатию кнопки Сохранить
placeFormSubmit.addEventListener('submit', placeFormSubmitHandler);

//! Функция переключения лайка
// Объявление переменных
let likeButtons = document.querySelectorAll('.place__like-button');

//! Функция переключения лайков
// likeButtons.forEach(function (btn) {
//   btn.addEventListener('click', function () {
//     btn.classList.toggle('place__like-button_active');
//   });
// });

//! Та же функция, но мне кажется, она более читаема
// Решил оставить ее как основную
likeButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    toggleLikeActive(btn);
  });
});

function toggleLikeActive(btn) {
  btn.classList.toggle('place__like-button_active');
}
