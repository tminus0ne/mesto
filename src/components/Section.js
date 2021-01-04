'use strict';

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Отрисовка всех карточек
  renderItems() {
    this._items.forEach((card) => {
      this._renderer(card);
    });
  }

  // Добавление карточки в контейнер
  addItem(card) {
    this._container.append(card);
  }

  // Добавление карточки пользователем
  addCustomItem(card) {
    this._container.prepend(card);
  }
}
