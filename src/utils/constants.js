import Api from'../components/Api.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: `f3195114-15f7-499c-9881-ff5b27b99807`,
    'Content-Type': 'application/json'
  }
})

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
const cardInputTitle = document.querySelector('.form__item_input_description');
const cardeInputLink = document.querySelector('.form__item_input_link');
const avatarEditButton = document.querySelector('.profile__avatar');
const formConfirm = document.querySelector(".form_confirm");
const formConfirmSbmtBtn = formConfirm.querySelector(".form__submit-btn");


export {
  validationSelectors,
  profileEditButton,
  elementAddButton,
  profileInputName,
  profileInputAbout,
  cardInputTitle,
  cardeInputLink,
  api,
  avatarEditButton,
  formConfirmSbmtBtn
};
