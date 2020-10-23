'use strict';

//!Открытие попапа
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');

function popupOpened() {
  popup.classList.add('popup_opened');
}
popupEdit.addEventListener('click', popupOpened);

function popupClosed() {
  popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', popupClosed);

//!Изменение текста

// let profileName = document.querySelector('.profile__name');
// console.log(profileName.textContent);
// let profileOccupation = document.querySelector('.profile__occupation');
// console.log(profileOccupation.textContent);

// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                         // Так мы можем определить свою логику отправки.
//                         // О том, как это делать, расскажем позже.

//     // Находим поля формы в DOM
//     let nameInput = // Воспользуйтесь инструментом .querySelector()
//     let jobInput = // Воспользуйтесь инструментом .querySelector()

//     // Получите значение полей из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);
