'use strict';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
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
}
