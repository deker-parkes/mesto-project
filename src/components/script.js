import { enableValidation } from "./validate.js";
import { createCard, handleCardFormSubmit } from "./card.js";
import { fillProfileInputs, handleProfileFormSubmit, handleAvatarFormSubmit } from "./modal.js";
import { openPopup, closePopup, pageContent, avatarForm, photoView, handlePopupClose, deleteErrors } from "./utils.js";
import '../pages/index.css';

const photo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const photoTwo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const photoThree = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const photoFour = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const photoFive = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const photoSix = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);



const profileEditButton = pageContent.querySelector('.profile__edit-button'); /* кнопка редактирования профиля*/

const profileAvatarEditButton = pageContent.querySelector('.profile__avatar-overlay');

const profileForm = pageContent.querySelector('#popup-user'); /*модальное окно редактирования профиля*/

const newCardAddButton = pageContent.querySelector('.profile__add-button'); /* кнопка добавления карточки*/
const newCardForm = pageContent.querySelector('#popup-image-form'); /* модальное окно добавления картчоки*/
const placeForNewCard = pageContent.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/

const initialCards = [
  {
    name: 'Архыз',
    link: photo
  },
  {
    name: 'Челябинская область',
    link: photoTwo
  },
  {
    name: 'Иваново',
    link: photoThree
  },
  {
    name: 'Камчатка',
    link: photoFour
  },
  {
    name: 'Холмогорский район',
    link: photoFive
  },
  {
    name: 'Байкал',
    link: photoSix
  }
];

export {newCardForm, placeForNewCard, profileForm}


// открытие и закрытие окна редактирования профиля пользователя

profileEditButton.addEventListener('click', ()=> {openPopup(profileForm), fillProfileInputs(), deleteErrors(profileForm)}); /* отслеживание нажатия на кнопку редактирования профиля*/
profileForm.addEventListener('mousedown', (evt)=>handlePopupClose(evt));

// открытие и закрытие окна добавления карточки

newCardAddButton.addEventListener('click', ()=>openPopup(newCardForm)); /* отслеживание нажатия кнопки открытия окна добавления карточки */
newCardForm.addEventListener('mousedown', (evt)=>handlePopupClose(evt)); /* отслеживание нажатия кнопки закрытия окна карточки */

// добавление информации о пользователе на страницу

profileForm.addEventListener('submit', handleProfileFormSubmit); /* отслеживания нажатия кнопки отправки формы */

//добавление новой карточки на страницу

newCardForm.addEventListener('submit', handleCardFormSubmit); /* отслеживание нажатия кнопки отправки формы */

// добавление карточек "из коробки"

initialCards.forEach(element => {
  placeForNewCard.append(createCard(element.name, element.link, element.name)); /* добавляем карточку на страницу */
});

//закрытие модального окна с фотографией

photoView.addEventListener('mousedown', (evt)=>handlePopupClose(evt));

//открытие и закрытие окна редактирования аватара

profileAvatarEditButton.addEventListener('click', ()=>openPopup(avatarForm));
avatarForm.addEventListener('mousedown', (evt)=>handlePopupClose(evt));

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