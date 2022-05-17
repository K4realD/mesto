import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationSelectors,
  profileEditButton,
  elementAddButton,
  profileInputName,
  profileInputAbout,
  initialCards,
  cardInputTitle,
  cardeInputLink
} from "../utils/constants.js";
import "./index.css";

/* формы */
const profileFormValidator = new FormValidator(
  validationSelectors,
  ".form_profile"
); //объявление формы редактирования профиля
profileFormValidator.enableValidation(); // активация валидации формы редактирования профиля
const cardFormValidator = new FormValidator(validationSelectors, ".form_card"); //объявление формы добавления карточки
cardFormValidator.enableValidation(); // активация валидации формы добавления карточки

const popupImage = new PopupWithImage(".popup_type_image-window");
popupImage.setEventListeners();
const defaultCardList = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  ".elements__list"
);
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (image) => {
        popupImage.open(image);
      },
    },
    "#template"
  );
  const newCard = card.createCard();
  return newCard;
}

defaultCardList.renderItem(); // заполнение карточками

const formNewCard = new PopupWithForm({
  popupSelector: ".popup_type_card-editor",
  submitForm: ({name, link}) => {
    name = cardInputTitle.value;
    link = cardeInputLink.value
    defaultCardList.addItem(createCard({name, link}));
  },
});
formNewCard.setEventListeners()

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
});

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-editor",
  submitForm: ({name, info}) => {
    name = profileInputName.value;
    info = profileInputAbout.value
    userInfo.setUserInfo({name, info});
  },
});
formProfile.setEventListeners()

/* |блок слушателей| */
profileEditButton.addEventListener("click", () => {
  const {name, info} = userInfo.getUserInfo()
  profileInputName.value = name;
  profileInputAbout.value = info;
  formProfile.open();
});
elementAddButton.addEventListener("click", () => {
  cardFormValidator.disableButtonState();
  formNewCard.open();
});
