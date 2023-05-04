import { enableValidation } from "./validate.js";
import { createCard, handleCardFormSubmit } from "./card.js";
import { fillProfileInputs, handleProfileFormSubmit, handleAvatarFormSubmit } from "./modal.js";
import { openPopup, closePopup, pageContent, avatarForm, photoView } from "./utils.js";


const profileEditButton = pageContent.querySelector('.profile__edit-button'); /* кнопка редактирования профиля*/

const profileAvatarEditButton = pageContent.querySelector('.profile__avatar-overlay');

const profileForm = pageContent.querySelector('#popup-user'); /*модальное окно редактирования профиля*/

const newCardAddButton = pageContent.querySelector('.profile__add-button'); /* кнопка добавления карточки*/
const newCardForm = pageContent.querySelector('#popup-image-form'); /* модальное окно добавления картчоки*/
const placeForNewCard = pageContent.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {newCardForm, placeForNewCard, profileForm}


// открытие и закрытие окна редактирования профиля пользователя

profileEditButton.addEventListener('click', ()=> {openPopup(profileForm), fillProfileInputs()}); /* отслеживание нажатия на кнопку редактирования профиля*/
profileForm.addEventListener('click', (evt)=>closePopup(evt, profileForm));
pageContent.addEventListener('keydown', (evt)=>closePopup(evt, profileForm));

// открытие и закрытие окна добавления карточки

newCardAddButton.addEventListener('click', ()=>openPopup(newCardForm)); /* отслеживание нажатия кнопки открытия окна добавления карточки */
newCardForm.addEventListener('click', (evt)=>closePopup(evt, newCardForm)); /* отслеживание нажатия кнопки закрытия окна карточки */
pageContent.addEventListener('keydown', (evt)=>closePopup(evt, newCardForm));

// добавление информации о пользователе на страницу

profileForm.addEventListener('submit', handleProfileFormSubmit); /* отслеживания нажатия кнопки отправки формы */

//добавление новой карточки на страницу

newCardForm.addEventListener('submit', handleCardFormSubmit); /* отслеживание нажатия кнопки отправки формы */

// добавление карточек "из коробки"

initialCards.forEach(element => {
  placeForNewCard.append(createCard(element.name, element.link, element.name)); /* добавляем карточку на страницу */
});

//закрытие модального окна с фотографией

photoView.addEventListener('click', (evt)=>closePopup(evt, photoView));
pageContent.addEventListener('keydown', (evt)=>closePopup(evt, photoView));

//открытие и закрытие окна редактирования аватара

profileAvatarEditButton.addEventListener('click', ()=>openPopup(avatarForm));
avatarForm.addEventListener('click', (evt)=>closePopup(evt, avatarForm));
pageContent.addEventListener('keydown', (evt)=>closePopup(evt, avatarForm));

//добавление нового аватара на страницу
avatarForm.addEventListener('submit', (handleAvatarFormSubmit));

// включение валидации
enableValidation({
  formSelector: '.popup__form',  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorSelector: 'popup__input-error',
  errorFieldClass: 'popup__field_error',
  errorClass: 'popup__input-error_active'
});