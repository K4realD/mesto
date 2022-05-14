import { initialCards } from "./scripts/InitialCards.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import {
  validationSelectors,
  profileEditButton,
  elementAddButton,
  profileInputName,
  profileInputAbout,
} from "./scripts/utils/Constants.js";
import "./pages/index.css";

/* формы */
const profileForm = new FormValidator(validationSelectors, ".form_profile"); //объявление формы редактирования профиля
profileForm.enableValidation(); // активация валидации формы редактирования профиля
const cardForm = new FormValidator(validationSelectors, ".form_card"); //объявление формы добавления карточки
cardForm.enableValidation(); // активация валидации формы добавления карточки
/* отрисовка карточек */
const defaultCardList = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (image) => {
            const popupImage = new PopupWithImage(".popup_type_image-window");
            popupImage.open(image);
            popupImage.setEventListeners();
          },
        },
        "#template"
      );
      const newCard = card.createCard();
      defaultCardList.addItem(newCard);
    },
  },
  ".elements__list"
);

defaultCardList.renderItem();
// заполнение начальными карточками
const formNewCard = new PopupWithForm({
  popupSelector: ".popup_type_card-editor",
  submitForm: (formData) => {
    formData["name"] = formData["image-title"];
    formData["link"] = formData["image-link"];
    const card = new Card(
      {
        data: formData,
        handleCardClick: (image) => {
          const popupImage = new PopupWithImage(".popup_type_image-window");
          popupImage.open(image);
          popupImage.setEventListeners();
        },
      },
      "#template"
    );
    const newCard = card.createCard();
    defaultCardList.addItem(newCard);
    cardForm.disableButtonState();
  },
});
// открытие формы для добавления новой карточки
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
});

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-editor",
  submitForm: () => {
    userInfo.setUserInfo({
      name: profileInputName.value,
      info: profileInputAbout.value,
    });
  },
});

/* |блок слушателей| */
profileEditButton.addEventListener("click", () => {
  profileInputName.value = userInfo.getUserInfo().name;
  profileInputAbout.value = userInfo.getUserInfo().info;
  formProfile.open();
  formProfile.setEventListeners();
});
elementAddButton.addEventListener("click", () => {
  formNewCard.open();
  formNewCard.setEventListeners();
});
