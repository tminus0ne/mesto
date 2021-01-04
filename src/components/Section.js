'use strict';

export default class Section {
  constructor(data, { items, renderer }, container) {
    this._data = data;
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  // Отрисовка всех карточек
  renderItems() {}

  // Добавление карточки в контейнер
  addItem() {}
}
