import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__item"));
    this._submitForm = submitForm;
  }
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}
