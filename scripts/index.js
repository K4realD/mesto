
/* |блок объявления переменных| */
/* кнопки */
const profileEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close-btn');
/* профиль */
const profilePopup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
/* поля формы для редактирования профиля */
let formElement = document.querySelector('.profile-editor')
let profileInputName = document.querySelector('.profile-editor__item_input_name')
let profileInputAbout = document.querySelector('.profile-editor__item_input_job');
/* |блок функций| */
function openProfilePopup() {
  profilePopup.classList.add('popup_opened')
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}; // open popup

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened')
}; // close popup

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closeProfilePopup();
}; // submit name and job info from edit form into the profile holder
/* |блок слушателей| */
formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', closeProfilePopup);

