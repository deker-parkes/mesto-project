const pageContent = document.querySelector('.page'); /* содержимое страницы */

const profileEditButton = pageContent.querySelector('.profile__edit-button'); /* кнопка редактирования профиля*/
const profileUserName = pageContent.querySelector('.profile__username');
const profileUserInfo = pageContent.querySelector('.profile__user-info');
const profileForm = pageContent.querySelector('#popup-user'); /*модальное окно редактирования профиля*/
const profileFormCloseButton = profileForm.querySelector('.popup__close-button'); /* кнопка закрытия окна редактирования профиля*/
const profileFormUserName = pageContent.querySelector('.popup__field[name="name"]');
const profileFormUserInfo = pageContent.querySelector('.popup__field[name="about"]');
const newCardAddButton = pageContent.querySelector('.profile__add-button'); /* кнопка добавления карточки*/
const newCardForm = pageContent.querySelector('#popup-image-form'); /* модальное окно добавления картчоки*/
const newCardFormCloseButton = newCardForm.querySelector('.popup__close-button'); /*кнопка закрытия окна добавления карточки*/
const newCardFormNameField = pageContent.querySelector('.popup__field[name="place-name"]'); /*Выбираем поле названия места*/
const newCardFormlinkField = pageContent.querySelector('.popup__field[name="place-link"]'); /*Выбираем поле ссылки на фото*/
const placeForNewCard = pageContent.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/
const photoView = pageContent.querySelector('#popup-image'); /*Выбираем модальное окно с фотографией*/
const photoViewPicture = photoView.querySelector('.popup__big-image'); /*Выбираем большое фото*/
const photoViewHeading = photoView.querySelector('.popup__big-image-heading'); /*Выбираем подпись к фото*/
const photoViewCloseButton = photoView.querySelector('.popup__close-button');
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


// функция открытия и закрытия модальных окон
function operatePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// функция, заполняющая поля формы редактирования профиля значениями со страницы
function fillProfileInputs() {
    profileFormUserName.value = profileUserName.textContent;
    profileFormUserInfo.value = profileUserInfo.textContent;
}

// функция, очищающая поля формы редактирования профиля после отправки формы
function clearFields() {
    profileFormUserName.value = "";
    profileFormUserInfo.value = "";
}

// функция, добавляющая информацию о пользователе на страницу

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUserName.textContent = profileFormUserName.value;
    profileUserInfo.textContent = profileFormUserInfo.value;
    clearFields();
    operatePopup(profileForm);
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
        operatePopup(photoView)
    });
    return newCard;
}

// функция, добавляющая новую карточку на страницу

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    placeForNewCard.prepend(createCard(newCardFormNameField.value, newCardFormlinkField.value, newCardFormNameField.value)); /* добавляем карточку на страницу */
    operatePopup(newCardForm);
    evt.target.reset();
}

// открытие и закрытие окна редактирования профиля пользователя

profileEditButton.addEventListener('click', ()=> {operatePopup(profileForm), fillProfileInputs()}); /* отслеживание нажатия на кнопку редактирования профиля*/
profileFormCloseButton.addEventListener('click', ()=>operatePopup(profileForm)); /* отслеживание нажатия на кнопку закрытия окна редактирования профиля*/

// открытие и закрытие окна добавления карточки

newCardAddButton.addEventListener('click', ()=>operatePopup(newCardForm)); /* отслеживание нажатия кнопки открытия окна добавления карточки */
newCardFormCloseButton.addEventListener('click', ()=>operatePopup(newCardForm)); /* отслеживание нажатия кнопки закрытия окна карточки */

// добавление информации о пользователе на страницу

profileForm.addEventListener('submit', handleProfileFormSubmit); /* отслеживания нажатия кнопки отправки формы */

//добавление новой карточки на страницу

newCardForm.addEventListener('submit', handleCardFormSubmit); /* отслеживание нажатия кнопки отправки формы */

// добавление карточек "из коробки"

initialCards.forEach(element => {
  placeForNewCard.append(createCard(element.name, element.link, element.name)); /* добавляем карточку на страницу */
});

//открытие и закрытие модального окна с фотографией

photoViewCloseButton.addEventListener('click', ()=>operatePopup(photoView));