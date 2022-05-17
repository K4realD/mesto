const validationSelectors = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
  fieldsetSelector: ".form__container",
};

const profileEditButton = document.querySelector(".profile__edit-btn");
const elementAddButton = document.querySelector(".profile__add-btn");
const profileInputName = document.querySelector(".form__item_input_name");
const profileInputAbout = document.querySelector(".form__item_input_job");
const cardInputTitle = document.querySelector('.form__item_input_description')
const cardeInputLink = document.querySelector('.form__item_input_link')

/* |массив начальных карточек| */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  validationSelectors,
  profileEditButton,
  elementAddButton,
  profileInputName,
  profileInputAbout,
  initialCards,
  cardInputTitle,
  cardeInputLink
};
