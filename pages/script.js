const pageContent = document.querySelector('.page'); /* содержимое страницы */

const profileEditButton = pageContent.querySelector('.profile__edit-button'); /* кнопка редактирования профиля*/
const profileUserName = pageContent.querySelector('.profile__username');
const profileUserInfo = pageContent.querySelector('.profile__user-info');

const profileAvatarEditButton = pageContent.querySelector('.profile__avatar-overlay');
const avatarForm = pageContent.querySelector('#popup-avatar-form');
const avatarFormLink = avatarForm.querySelector('.popup__field[name="avatar-link"]');
const avatar = pageContent.querySelector('.profile__avatar');

const profileForm = pageContent.querySelector('#popup-user'); /*модальное окно редактирования профиля*/

const profileFormUserName = pageContent.querySelector('.popup__field[name="name"]');
const profileFormUserInfo = pageContent.querySelector('.popup__field[name="about"]');
const newCardAddButton = pageContent.querySelector('.profile__add-button'); /* кнопка добавления карточки*/
const newCardForm = pageContent.querySelector('#popup-image-form'); /* модальное окно добавления картчоки*/
const newCardFormNameField = pageContent.querySelector('.popup__field[name="place-name"]'); /*Выбираем поле названия места*/
const newCardFormlinkField = pageContent.querySelector('.popup__field[name="place-link"]'); /*Выбираем поле ссылки на фото*/
const placeForNewCard = pageContent.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/
const photoView = pageContent.querySelector('#popup-image'); /*Выбираем модальное окно с фотографией*/
const photoViewPicture = photoView.querySelector('.popup__big-image'); /*Выбираем большое фото*/
const photoViewHeading = photoView.querySelector('.popup__big-image-heading'); /*Выбираем подпись к фото*/
const cardTemplate = pageContent.querySelector('#card').content;

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


// функция открытия
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// функция закрытия модальных окон
function closePopup(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__button') || (evt.key === "Escape")) {
    popup.classList.remove('popup_opened');
    deleteErrors(popup);
  }
}

// функция, заполняющая поля формы редактирования профиля значениями со страницы
function fillProfileInputs() {
    profileFormUserName.value = profileUserName.textContent;
    profileFormUserInfo.value = profileUserInfo.textContent;
}

// функция, добавляющая информацию о пользователе на страницу

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUserName.textContent = profileFormUserName.value;
    profileUserInfo.textContent = profileFormUserInfo.value;
    closePopup(evt, profileForm);
    evt.target.reset();
}

//функция, добавляющая новый аватар

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    avatar.src = avatarFormLink.value;
    closePopup(evt, avatarForm);
    evt.target.reset();
}

//функция создания карточки из шаблона

function createCard(nameOfPlace, placePic, placeAlt) {
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const newCardName = newCard.querySelector('.element__name');
    const newCardPhoto = newCard.querySelector('.element__photo');
    const newCardLike = newCard.querySelector('.element__heart');
    const newCardRecycleBin = newCard.querySelector('.element__recycle-bin');
    newCardName.textContent = nameOfPlace; /* даём название карточке */
    newCardPhoto.src = placePic; /* добавляем ссылку на фотографию */
    newCardPhoto.alt = placeAlt; /* даём описание фотографии */
    newCardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__heart_active');
    }); /* даёт возможность ставить лайк */
    newCardRecycleBin.addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    newCardPhoto.addEventListener('click', function (evt) {
        photoViewPicture.src = evt.target.src
        photoViewPicture.alt = evt.target.alt
        photoViewHeading.textContent = nameOfPlace;
        openPopup(photoView)
    });
    return newCard;
}

// функция, добавляющая новую карточку на страницу

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placeForNewCard.prepend(createCard(newCardFormNameField.value, newCardFormlinkField.value, newCardFormNameField.value)); /* добавляем карточку на страницу */
    closePopup(evt, newCardForm);
    evt.target.reset();
}

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


function deleteErrors(popup) {
  const fieldsList = Array.from(popup.querySelectorAll('.popup__field'));
  const errorMessagesList = Array.from(popup.querySelectorAll('.popup__input-error'));

  fieldsList.forEach((element) => {
    element.classList.remove('popup__field_error');
  });

  errorMessagesList.forEach((element) => {
    element.classList.remove('popup__input-error_active');
  });

}



// валидация полей


function showInputError(form, element, message, settings) {
  const errorMessage = form.querySelector(`.${settings.inputErrorSelector}[id=${element.name}]`);
  element.classList.add(settings.errorFieldClass);
  errorMessage.classList.add(settings.errorClass);
  errorMessage.textContent = message;
}

function hideInputError(form, element, settings) {
  const errorMessage = form.querySelector(`.${settings.inputErrorSelector}[id=${element.name}]`);
  element.classList.remove(settings.errorFieldClass);
  errorMessage.classList.remove(settings.errorClass);
  errorMessage.textContent = "";
}

function isValid(form, field, settings) {
  if (field.validity.patternMismatch){
    field.setCustomValidity(field.dataset.errorMessage);
  } else {
    field.setCustomValidity("");
  }

  if (!field.validity.valid) {
    showInputError(form, field, field.validationMessage, settings);
  } else {
    hideInputError(form, field, settings);
  }
}

function hasInvalidInput(form) {
  return form.some((field) => {
    return !field.validity.valid;
  });
}


function toggleButtonState(form, buttonElement, settings) {
  if (hasInvalidInput(form)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}


function setEventListeners(form, settings) {
  const fieldList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(fieldList, buttonElement, settings);
  fieldList.forEach((field) => {
    field.addEventListener('input', () => {
      isValid(form, field, settings);
      toggleButtonState(fieldList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((element) => {
    setEventListeners(element, settings);
  });
}


enableValidation({
  formSelector: '.popup__form',  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorSelector: 'popup__input-error',
  errorFieldClass: 'popup__field_error',
  errorClass: 'popup__input-error_active'
});