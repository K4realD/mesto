export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  _handleLike() {
    this._likeBtn.classList.toggle("element__like-btn_active");
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleLike());
    this._deleteBtn.addEventListener("click", () => this._handleDelete());
    this._image.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }
  createCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".element__like-btn");
    this._image = this._element.querySelector(".element__image");
    this._deleteBtn = this._element.querySelector(".element__delete-btn");
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
}
