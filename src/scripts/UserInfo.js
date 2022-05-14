export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    this._inputValues = {};
    this._inputValues.name = this._name.textContent;
    this._inputValues.info = this._info.textContent;
    return this._inputValues;
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
