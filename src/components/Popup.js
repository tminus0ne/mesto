'use strict';

export default class Popup {
  constructor(data, popupSelector) {
    this._data = data;
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.calssList.add(this._data.openedPopupClass);
    document.addEventListener('keydown', _handleEscClose);
  }

  close() {
    this._popupSelector.calssList.remove(this._data.openedPopupClass);
    document.removeEventListener('keydown', _handleEscClose);
  }

  _handleEscClose() {
    document.addEventListener('keydown', (event) => {
      const escapeKey = 'Escape';
      if (event.key === escapeKey) {
        this.close();
      }
    });
  }

  setEventListeners() {
    const closeButton = this._popupSelector.querySelector(
      this._data.popupCloseButtonSelector,
    );
    closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains(this._data.popupClass)) {
        this.close();
      }
    });
  }
}
