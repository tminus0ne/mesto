'use strict';

export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  // Отрисовка всех карточек
  renderItems() {}

  // Добавление карточки в контейнер
  addItem() {}
}
