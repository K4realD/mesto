import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__item"));
    this._submitForm = submitForm;
    this._submitBtn = this._popup.querySelector(".form__submit-btn")
  }
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  formInputValues() {
    return this._getInputValues()
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitBtn.textContent = "Сохранение..."
    } else {
      this._submitBtn.textContent = "Сохранить"
    }
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
    this._submitForm(evt)
    });
    super.setEventListeners();
  }
}
