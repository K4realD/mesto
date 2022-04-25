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
/* |настройки селекторов для валидации форм| */
const validationSelectors = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
  fieldsetSelector: '.form__container'
};
/* формы */
const profileForm = new FormValidator(validationSelectors, '.form_profile');//объявление формы редактирования профиля
profileForm.enableValidation();// активация валидации формы редактирования профиля
const cardForm = new FormValidator(validationSelectors, '.form_card');//объявление формы добавления карточки
cardForm.enableValidation();// активация валидации формы добавления карточки
/* элементы(карточки) */
const elementList = document.querySelector(".elements__list");
const cardPopup = document.querySelector(".popup_type_card-editor");
const popupImageWindow = document.querySelector(".popup_type_image-window");
const imageCloseButton = document.querySelector(".popup__close-btn_image");

initialCards.forEach((element) => {
  renderCard(element);
}); // заполнение начальными карточками
/* |блок функций| */
function closePopupByEsc(evt) {
  if(evt.key === 'Escape')
  closePopup(document.querySelector('.popup_opened'))
}; // закрытие попапа при нажатии клавиши Esc

function closePopupByOverlay (evt) {
  if (evt.target === evt.currentTarget)
  closePopup(evt.target);
} // закрытие попапа при нажатии на область вне модального окна попапа

function renderCard(element) {
  elementList.prepend(createNewCard(element));
};

function createNewCard(element) {
  const card = new Card(element, '#template', openImagePopup);
  const newCard = card.createCard();
  return newCard;
}

function openPopup(type) {
  type.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(type) {
  type.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
};

function openProfilePopup() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
}; // open profile popup

function closeProfilePopup() {
  closePopup(profilePopup);
};

function openCardPopup() {
  openPopup(cardPopup);
}; // open card popup

function closeCardPopup() {
  closePopup(cardPopup);
}; // close card popup

function openImagePopup() {
  openPopup(popupImageWindow);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closePopup(profilePopup);
}; // submit name and job info from edit form into the profile holder
function submitCardForm(evt) {
  evt.preventDefault();
  const submitButton = evt.currentTarget.querySelector('.form__submit-btn');
  const newElement = {name: cardInputName.value, link: cardInputLink.value};
  renderCard(newElement);
  closePopup(cardPopup);
  formCard.reset();
  cardForm.disableButtonState();
};

/* |блок слушателей| */
formProfile.addEventListener("submit", submitProfileForm);
formCard.addEventListener("submit", submitCardForm);
profileEditButton.addEventListener("click", openProfilePopup);
elementAddButton.addEventListener("click", openCardPopup);
cardCloseButton.addEventListener("click", closeCardPopup);
profileCloseButton.addEventListener("click", closeProfilePopup);
imageCloseButton.addEventListener("click", () => {
  closePopup(popupImageWindow);
});
profilePopup.addEventListener('click', closePopupByOverlay);
cardPopup.addEventListener('click', closePopupByOverlay);
popupImageWindow.addEventListener('click', closePopupByOverlay);

import {initialCards} from './InitialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
