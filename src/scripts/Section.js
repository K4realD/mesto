export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._renderedItem = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem() {
    this._renderedItem.forEach((item) => {
      this._renderer(item);
    });
  }
}
