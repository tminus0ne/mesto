'use strict';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._data.profileNameSelector = this._name.textContent;
    this._data.profileOccupationSelector = this._job.textContent;
    return {
      name: profileName,
      job: profileOccupation,
    };
  }

  setUserInfo() {
    this._name.textContent = profileName;
    this._job.textContent = profileOccupation;
  }
}
