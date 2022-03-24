/* |блок объявления переменных| */
/* кнопки */
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileCloseButton = document.querySelector(".popup__close-btn_profile");
const elementAddButton = document.querySelector(".profile__add-btn");
const cardCloseButton = document.querySelector(".popup__close-btn_card");
/* профиль */
const profilePopup = document.querySelector(".popup_type_profile-editor");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
/* поля формы для редактирования */
const formProfile = document.querySelector(".form_profile");
const formCard = document.querySelector(".form_card");
const profileInputName = document.querySelector(".form__item_input_name");
const profileInputAbout = document.querySelector(".form__item_input_job");
const cardInputName = document.querySelector(".form__item_input_description");
const cardInputLink = document.querySelector(".form__item_input_link");
/* элементы(карточки) */
const elementList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#template").content;
const cardPopup = document.querySelector(".popup_type_card-editor");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImageWindow = document.querySelector(".popup_type_image-window");
const imageCloseButton = document.querySelector(".popup__close-btn_image");

initialCards.forEach((element) => {
  renderCard(element.name, element.link);
}); // заполнение начальными карточками
/* |блок функций| */
function createCard(name, link) {
  // объявление переменных внутри template
  const elementCard = elementTemplate.cloneNode(true);
  const elementlikeButton = elementCard.querySelector(".element__like-btn");
  const elementImage = elementCard.querySelector(".element__image");
  const cardDeleteButton = elementCard.querySelector(".element__delete-btn");
  // присваивание данных
  elementImage.src = link;
  elementImage.alt = name;
  elementCard.querySelector(".element__title").textContent = name;
  // кнопки внутри карточки
  elementlikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like-btn_active");
  });
  imageCloseButton.addEventListener("click", () => {
    popupImageWindow.classList.remove("popup_opened");
  });
  cardDeleteButton.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  elementImage.addEventListener("click", (evt) => {
    openPopup(popupImageWindow);
    popupImage.src = evt.target.src;
    popupImageTitle.textContent = evt.target.alt;
  });
  return elementCard;
}

function renderCard(name, link) {
  elementList.prepend(createCard(name, link));
}

function openPopup(type) {
  type.classList.add("popup_opened");
}

function closePopup(type) {
  type.classList.remove("popup_opened");
}

function openProfilePopup() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
} // open profile popup

function closeProfilePopup() {
  closePopup(profilePopup);
}

function openCardPopup() {
  openPopup(cardPopup);
} // open card popup

function closeCardPopup() {
  closePopup(cardPopup);
} // close card popup

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closePopup(profilePopup);
} // submit name and job info from edit form into the profile holder
function formSubmitCard(evt) {
  evt.preventDefault();
  renderCard(cardInputName.value, cardInputLink.value);
  closePopup(cardPopup);
}
/* |блок слушателей| */
formProfile.addEventListener("submit", formSubmitProfile);
formCard.addEventListener("submit", formSubmitCard);
profileEditButton.addEventListener("click", openProfilePopup);
elementAddButton.addEventListener("click", openCardPopup);
cardCloseButton.addEventListener("click", closeCardPopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
