const validationSelectors = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
  fieldsetSelector: '.form__container'
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationElement.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationElement.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (formElement, inputElement, errorMessage, validationElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationElement.errorClass);
};

const hideInputError = (formElement, inputElement, validationElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationElement.inputErrorClass);
  errorElement.classList.remove(validationElement.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationElement);
  } else {
    hideInputError(formElement, inputElement, validationElement);
  }
};

const setEventListeners = (formElement, validationElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationElement.inputSelector));
  const buttonElement = formElement.querySelector(validationElement.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, validationElement);
      toggleButtonState(inputList, buttonElement, validationElement);
    });
  });
  toggleButtonState(inputList, buttonElement, validationElement);
};

const enableValidation = (validationElement) => {
  const formList = Array.from(document.querySelectorAll(validationElement.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  const fieldSetList = Array.from(formElement.querySelectorAll(validationElement.fieldsetSelector));
  fieldSetList.forEach((fieldSet) => {
    setEventListeners(fieldSet, validationElement);
  });
  });
};
enableValidation(validationSelectors);
