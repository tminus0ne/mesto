'use strict';

export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Заполнение инпутов попапа при открытии из полей профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  // Заполнение полей профиля при сабмите формы
  setUserInfo(profileName, profileOccupation) {
    this._name.textContent = profileName;
    this._job.textContent = profileOccupation;
  }

  setUserAvatar(profileAvatar) {
    this._avatar.src = profileAvatar;
  }
}
