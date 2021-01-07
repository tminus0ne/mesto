'use strict';

//! Исходный массив карточек
export const initialCards = [
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

//! Объект с классами карточки
export const cardClassData = {
  cardSelector: '.card',
  cardLikeButtonSelector: '.card__like-button',
  cardActiveLikeClass: 'card__like-button_active',
  cardRmoveButtonSelector: '.card__remove-button',
  cardTitleSelector: '.card__title',
  cardImageSelector: '.card__image',

  popupClass: 'popup',
  imagePopupSelector: '.popup_image',
  imagePopupOpenedClass: 'popup_opened',
  imagePopupPhotoSelector: '.popup__photo',
  imagePopupTitleSelector: '.popup__card-title',
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

// Объект с классами попапов
export const popupSelectorsData = {
  popupClass: 'popup',
  openedPopupClass: 'popup_opened',
  popupCloseButtonSelector: '.popup__close-button',
  inputSelector: '.popup__input',
};
