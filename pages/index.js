
const profileEditButton = document.querySelector('.profile__edit-btn');
const profilePopup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
let profileEditInputs = document.querySelectorAll('.profile-editor__item');
let profileInputName = profileEditInputs[0];
let profileInputAbout = profileEditInputs[1];
const profileSubmitButton = document.querySelector('.profile-editor__submit-btn');

function profilePopupOpen() {
  profilePopup.classList.add('popup_opened')
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
};

function profilePopupClose() {
  profilePopup.classList.remove('popup_opened')
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  profilePopupClose();
}

profileSubmitButton.addEventListener('click', formSubmitHandler);
profileEditButton.addEventListener('click', profilePopupOpen);
popupCloseButton.addEventListener('click', profilePopupClose);

