/* |блок объявления переменных| */
/* кнопки */
const profileEditButton = document.querySelector(".profile__edit-btn");
const closeButtonProfile = document.querySelector(".popup__close-btn_profile");
const elementAddButton = document.querySelector(".profile__add-btn");
const closeButtonCard = document.querySelector(".popup__close-btn_card");
/* профиль */
const profilePopup = document.querySelector(".popup_profile-editor");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
/* поля формы для редактирования */
const formProfile = document.querySelector('.form_profile');
const formCard = document.querySelector('.form_card');
let profileInputName = document.querySelector(".form__item_input_name");
let profileInputAbout = document.querySelector(".form__item_input_job");
let cardInputName = document.querySelector(".form__item_input_description");
let cardInputLink = document.querySelector(".form__item_input_link");
/* элементы(карточки) */
const elementList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#template").content;
const cardPopup = document.querySelector(".popup_card-editor");
/* |массивы| */
/*  массив для карточек */
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
/*  наполнение карточек */
function createCards() {
  initialCards.forEach((element) => {
  // объявление переменных внутри template
  const elementCard = elementTemplate.cloneNode(true);
  const likeButton = elementCard.querySelector(".element__like-btn");
  const elementImage = elementCard.querySelector(".element__image");
  const popupImageWindow = document.querySelector(".popup_image-window");
  const closeButtonImage = document.querySelector(".popup__close-btn_image");
  const deleteButton = elementCard.querySelector(".element__delete-btn");

  // присваивание данных из массива
  elementImage.src = element.link;
  elementImage.alt = element.name;
  elementCard.querySelector(".element__title").textContent = element.name;
  // кнопки внутри карточки
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like-btn_active");
  });
  closeButtonImage.addEventListener("click", () => {
    popupImageWindow.classList.remove("popup_opened");
  });
  deleteButton.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  elementImage.addEventListener("click", (evt) => {
    const popupImage = document.querySelector(".popup__image");
    const popupImageTitle = document.querySelector(".popup__image-title");
    const eventTarget = evt.target;
    popupImageWindow.classList.add("popup_opened");
    popupImage.src = eventTarget.src;
    popupImageTitle.textContent = eventTarget.alt;
  });

  elementList.append(elementCard);
});}
createCards();
/* |блок функций| */
function openProfilePopup() {
  profilePopup.classList.add("popup_opened");
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
} // open profile popup

function closeProfilePopup() {
  profilePopup.classList.remove("popup_opened");
} // close profile popup

function openCardPopup() {
  cardPopup.classList.add("popup_opened");
}// open card popup

function closeCardPopup() {
  cardPopup.classList.remove("popup_opened");
}// close card popup

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;
  closeProfilePopup();
} // submit name and job info from edit form into the profile holder
function formSubmitCard(evt) {
  evt.preventDefault();
  initialCards.unshift({name: cardInputName.value, link: cardInputLink.value});
  closeCardPopup();
};
/* |блок слушателей| */
formProfile.addEventListener("submit", formSubmitProfile);
formCard.addEventListener('submit', formSubmitCard)
profileEditButton.addEventListener("click", openProfilePopup);
elementAddButton.addEventListener("click", openCardPopup);
closeButtonCard.addEventListener("click", closeCardPopup);
closeButtonProfile.addEventListener('click', closeProfilePopup);
