export default class Card {
  constructor(
    { data, handleCardClick, handleLike, handleDelete, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setLikeState() {
    if (this._checkLikes()) {
      this.setLike();
    } else {
      this.removeLike();
    }
  }

  _checkLikes() {
    return this._likes.some((item) => item._id === this._userId);
  }

  getId() {
    return this._cardId;
  }

  setLike() {
    this._likeBtn.classList.add("element__like-btn_active");
    this.isLiked = true;
  }

  removeLike() {
    this._likeBtn.classList.remove("element__like-btn_active");
    this.isLiked = false;
  }

  updateLikes(data) {
    this._likesNum.textContent = data.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", (evt) => this._handleLike(evt));
    this._deleteBtn.addEventListener("click", () => this._handleDelete(this));
    this._image.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }
  createCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".element__like-btn");
    this._likesNum = this._element.querySelector(".element__like-num");
    this._image = this._element.querySelector(".element__image");
    this._deleteBtn = this._element.querySelector(".element__delete-btn");
    this._likesNum.textContent = this._likes.length;
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    }
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    this._setLikeState();

    return this._element;
  }
}
