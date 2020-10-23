'use strict';

//!Открытие попапа
let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let profileEdit = profile.querySelector('.profile__edit-button');
let popupClose = popup.querySelector('.popup__close-button');

function popupOpened() {
  popup.classList.add('popup_opened');
}

profileEdit.addEventListener('click', popupOpened);

function popupClosed() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', popupClosed);

//? Хотел сделать это еще до того, как посмотрел вебинар,
// но немного не мог понять реализацию
function popupWindowClose(event) {
  if (event.target.classList.contains('popup')) {
    popupClosed();
  }
}

popup.addEventListener('mousedown', popupWindowClose);

//!Изменение текста

let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__occupation');

let profileName = profile.querySelector('.profile__name');
let profileOccupation = profile.querySelector('.profile__occupation');

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
