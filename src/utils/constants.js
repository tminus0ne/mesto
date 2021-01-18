'use strict';

//! Объект с классами карточки
export const cardClassData = {
  cardSelector: '.card',
  cardLikeButtonSelector: '.card__like-button',
  cardActiveLikeClass: 'card__like-button_active',
  cardRmoveButtonSelector: '.card__remove-button',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',
  cardLikesCount: '.card__like-count',
};

//! Объект с классами форм
export const formValidationData = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputInvalidClass: 'popup__input_invalid',
  inputErrorSelector: '.popup__input-error',
};

// Открытие и закрытие попапа профиля
export const profile = document.querySelector('.profile');
export const profilePopup = document.querySelector('.popup_profile');

export const profilePopupOpenButton = profile.querySelector(
  '.profile__edit-button',
);

// Редактирование
export const nameInput = profilePopup.querySelector('.popup__input_type_name');
export const jobInput = profilePopup.querySelector(
  '.popup__input_type_occupation',
);

// Открытие попапа нового места
export const cardAddPopupOpenButton = profile.querySelector(
  '.profile__add-button',
);

// Открытие попапа смены аватара
export const avatarEditPopupOpenButton = profile.querySelector(
  '.profile__avatar-edit',
);

// Список карточек
export const cardsList = document.querySelector('.cards');

// Формы попапов для валидации
export const profileEditForm = document.querySelector(
  '.popup__container_profile',
);
export const cardAddForm = document.querySelector('.popup__container_card');
export const avatarEditForm = document.querySelector(
  '.popup__container_avatar',
);
