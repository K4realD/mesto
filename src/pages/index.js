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
  api,
  avatarEditButton,
  formConfirmSbmtBtn,
} from "../utils/constants.js";
import "./index.css";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

/* формы */
const profileFormValidator = new FormValidator(
  validationSelectors,
  ".form_profile"
); //объявление формы редактирования профиля
profileFormValidator.enableValidation(); // активация валидации формы редактирования профиля
const cardFormValidator = new FormValidator(validationSelectors, ".form_card"); //объявление формы добавления карточки
cardFormValidator.enableValidation(); // активация валидации формы добавления карточки
const avatarFormValidator = new FormValidator(validationSelectors, ".form_avatar");
avatarFormValidator.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image-window");
popupImage.setEventListeners();

const defaultCardList = new Section(
  {
    renderer: (item) => {
      defaultCardList.addItem(createNewCard(item));
    },
  },
  ".elements__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
  avatarSelector: ".profile__image",
});

function createNewCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (image) => {
        popupImage.open(image);
      },
      handleLike: () => {
        if (card.isLiked) {
          api
            .dislikeCard(card.getId())
            .then((data) => {
              card.removeLike();
              card.updateLikes(data.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .likeCard(card.getId())
            .then((data) => {
              card.setLike();
              card.updateLikes(data.likes);
            })
            .catch((err) => console.log(err));
        }
      },
      handleDelete: (card) => {
        formDeleteCard.open();
        formDeleteCard.changeSubmitHandler(() => {
          formConfirmSbmtBtn.textContent = "Сохранение...";
          api
            .deleteCard(card.getId())
            .then(() => {
              card.deleteCard();
              formDeleteCard.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              formConfirmSbmtBtn.textContent = "Да";
            });
        });
      },
      userId: userInfo.getUserId(),
    },
    "#template"
  );

  return card.createCard();
}

const formNewCard = new PopupWithForm({
  popupSelector: ".popup_type_card-editor",
  submitForm: (evt) => {
    evt.preventDefault();
    formNewCard.renderLoading(true);
    const formValues = formNewCard.formInputValues();
    const item = { name: formValues.title, link: formValues.link };
    api
      .postNewCard(item)
      .then((res) => {
        const cardElement = createNewCard(res);
        defaultCardList.addItem(cardElement);
        formNewCard.close();
      })
      .catch((err) => {
        console.log("Не удалось загрузить карточку:", err);
      })
      .finally(() => {
        formNewCard.renderLoading(false);
      });
  },
});
formNewCard.setEventListeners();

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile-editor",
  submitForm: (evt) => {
    evt.preventDefault();
    formProfile.renderLoading(true);
    const formValues = formProfile.formInputValues();
    const item = { name: formValues.name, about: formValues.info };
    api
      .patchProfile(item)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          info: res.about,
        });
        formProfile.close();
      })
      .catch((err) => {
        console.log("Не удалось обновить профиль:", err);
      })
      .finally(() => {
        formProfile.renderLoading(false);
      });
  },
});
formProfile.setEventListeners();

const formAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitForm: (evt) => {
    evt.preventDefault();
    formAvatar.renderLoading(true);
    const inputFormValue = formAvatar.formInputValues();
    api
      .patchAvatar({ avatar: inputFormValue.avatar })
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        formAvatar.close();
      })
      .catch((err) => {
        console.log("Аватар загрузить не удалось:", err);
      })
      .finally(() => {
        formAvatar.renderLoading(false);
      });
  },
});
formAvatar.setEventListeners();

const formDeleteCard = new PopupWithSubmit(".popup_type_confirm");

formDeleteCard.setEventListeners();

/* |блок слушателей| */
profileEditButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputAbout.value = info;
  formProfile.open();
});
elementAddButton.addEventListener("click", () => {
  cardFormValidator.disableButtonState();
  formNewCard.open();
});
avatarEditButton.addEventListener("click", () => {
  formAvatar.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()]).then((res) => {
  userInfo.setUserInfo({name: res[0].name, info: res[0].about});
  userInfo.setUserAvatar(res[0].avatar);
  userInfo.setUserId(res[0]._id);
  defaultCardList.renderItem(res[1].reverse());
});
