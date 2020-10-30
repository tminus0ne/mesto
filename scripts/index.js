'use strict';

//! Объявление переменных

// Попап
let profile = document.querySelector('.profile');
let profilePopup = document.querySelector('.popup');

let profilePopupOpenButton = profile.querySelector('.profile__edit-button');
let profilePopupCloseButton = profilePopup.querySelector(
  '.popup__close-button'
);

// Редактирование
let profileFormSubmit = profilePopup.querySelector('.popup__container');
let nameInput = profilePopup.querySelector('.popup__input_type_name');
let jobInput = profilePopup.querySelector('.popup__input_type_occupation');

let profileName = profile.querySelector('.profile__name');
let profileOccupation = profile.querySelector('.profile__occupation');

// Лайк
let likeButtons = document.querySelectorAll('.place__like-button');

//! Функция открытия попапа
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

//! Функция редактирования профиля
function profileEditFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closeProfilePopup();
}

//! Эвентлисенеры
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

//! Функция переключения лайка
likeButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.classList.toggle('place__like-button_active');
  });
});
