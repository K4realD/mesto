export default class FormValidator {
  constructor(validationElement, formSelector) {
    this._validationElement = validationElement;
    this._formSelector = formSelector;
    this._form = document.querySelector(formSelector);
    this._submitBtn = this._form.querySelector(this._validationElement.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._validationElement.inputSelector));
}
_hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._submitBtn.classList.add(this._validationElement.inactiveButtonClass);
    this._submitBtn.setAttribute('disabled', true);
  } else {
    this._submitBtn.classList.remove(this._validationElement.inactiveButtonClass);
    this._submitBtn.removeAttribute('disabled');
  }
};

_showInputError(inputElement, errorMessage) {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._validationElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._validationElement.errorClass);
};

_hideInputError(inputElement) {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._validationElement.inputErrorClass);
  errorElement.classList.remove(this._validationElement.errorClass);
  errorElement.textContent = "";
};

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  };
}
_setEventListeners() {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
}

enableValidation() {
  this._setEventListeners();
}
}
