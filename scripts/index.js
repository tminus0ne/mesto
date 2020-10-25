'use strict';

//! Объявление переменных
//? Я решил все переменные вынести из своих блоков и объявить одной группой, правильно ли это?
//? Или лучше каждую группу переменных объявлять радом с блоком, где они используются?

//Попап
let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let profileEdit = profile.querySelector('.profile__edit-button');
let popupClose = popup.querySelector('.popup__close-button');

//Редактирование
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_occupation');

let profileName = profile.querySelector('.profile__name');
let profileOccupation = profile.querySelector('.profile__occupation');

nameInput.value = profileName.textContent;
jobInput.value = profileOccupation.textContent;

//! Функция открытия попапа
function popupOpened() {
  popup.classList.add('popup_opened');
}

profileEdit.addEventListener('click', popupOpened);

function popupClosed() {
  popup.classList.remove('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

popupClose.addEventListener('click', popupClosed);

function popupWindowClose(event) {
  if (event.target.classList.contains('popup')) {
    popupClosed();
  }
}

popup.addEventListener('mousedown', popupWindowClose);

//! Функция редактирования профиля

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  popupClosed();
}

formElement.addEventListener('submit', formSubmitHandler);

//! Функция закрытия окна по нажатию Escape
function formSubmitClose(event) {
  if (event.key === 'Escape') {
    popupClosed();
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
  }
}

window.addEventListener('keydown', formSubmitClose);
