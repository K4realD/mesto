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

export {
  validationSelectors,
  profileEditButton,
  elementAddButton,
  profileInputName,
  profileInputAbout,
};
