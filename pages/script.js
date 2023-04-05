// функция открытия и закрытия модальных окон
function operatePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// функция, заполняющая поля формы редактирования профиля значениями со страницы
function fieldsFill(popup) {
    popup.querySelector('.popup__field[name="name"]').value = document.querySelector('.profile__username').textContent;
    popup.querySelector('.popup__field[name="about"]').value = document.querySelector('.profile__user-info').textContent;
}

// функция, очищающая поля формы редактирования профиля после отправки формы
function fieldsClear(popup) {
    popup.querySelector('.popup__field[name="name"]').value = "";
    popup.querySelector('.popup__field[name="about"]').value = "";
}

// функция, добавляющая информацию о пользователе на страницу

function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__username').textContent = popupUser.querySelector('.popup__field[name="name"]').value;
    document.querySelector('.profile__user-info').textContent = popupUser.querySelector('.popup__field[name="about"]').value;
}

//функция создания карточки из шаблона

function creationCard(nameOfPlace, placePic, placeAlt) {
    const cardTemplate = document.querySelector('#card').content;
    let newCard = cardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__name').textContent = nameOfPlace; /* даём название карточке */
    newCard.querySelector('.element__photo').src = placePic; /* добавляем ссылку на фотографию */
    newCard.querySelector('.element__photo').alt = placeAlt; /* даём описание фотографии */
    newCard.querySelector('.element__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__heart_active');
    }); /* даёт возможность ставить лайк */
    newCard.querySelector('.element__recycle-bin').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    newCard.querySelector('.element__photo').addEventListener('click', () =>operatePopup(popupImage));
    newCard.querySelector('.element__photo').addEventListener('click', function (evt) {
        popupImagePicture.src = evt.target.src
        popupImagePicture.alt = evt.target.alt
        popupImageHeading.textContent = nameOfPlace;
    });
    return newCard;
}

// функция, добавляющая новую карточку на страницу

function addCard(evt) {
    evt.preventDefault();
    const places = document.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/
    places.prepend(creationCard(placeName.value, imageSource.value, placeName.value)); /* добавляем карточку на страницу */
}

// открытие и закрытие окна редактирования профиля пользователя

const editButton = document.querySelector('.profile__edit-button'); /* выбираем кнопку редактирования профиля*/
const popupUser = document.querySelector('#popup-user'); /*Выбираем модальное окно редактирования профиля*/
const popupUserCloseButton = popupUser.querySelector('.popup__close-button'); /* выбираем кнопку закрытия окна редактирования профиля*/
editButton.addEventListener('click', ()=>operatePopup(popupUser)); /* отслеживание нажатия на кнопку редактирования профиля*/
popupUserCloseButton.addEventListener('click', ()=>operatePopup(popupUser)); /* отслеживание нажатия на кнопку закрытия окна редактирования профиля*/
editButton.addEventListener('click', ()=>fieldsFill(popupUser)); /* заполняем поля формы значениями со страницы */


// открытие и закрытие окна добавления карточки

const addButton = document.querySelector('.profile__add-button'); /*Выбираем кнопку добавления карточки*/
const popupPlace = document.querySelector('#popup-image-form'); /*Выбираем модальное окно добавления картчоки*/
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button'); /*Выбираем кнопку закрытия окна добавления карточки*/
addButton.addEventListener('click', ()=>operatePopup(popupPlace)); /* отслеживание нажатия кнопки открытия окна добавления карточки */
popupPlaceCloseButton.addEventListener('click', ()=>operatePopup(popupPlace)); /* отслеживание нажатия кнопки закрытия окна карточки */


// добавление информации о пользователе на страницу

popupUser.addEventListener('submit', handleFormSubmit); /* отслеживания нажатия кнопки отправки формы */
popupUser.addEventListener('submit', ()=>fieldsClear(popupUser));
popupUser.addEventListener('submit', ()=>operatePopup(popupUser));


//добавление новой карточки на страницу

popupPlace.addEventListener('submit', addCard); /* отслеживание нажатия кнопки отправки формы */
popupPlace.addEventListener('submit', ()=>operatePopup(popupPlace)); /* закрываем окно добавления карточки */
const placeName = document.querySelector('.popup__field[name="place-name"]'); /*Выбираем поле названия места*/
const imageSource = document.querySelector('.popup__field[name="place-link"]'); /*Выбираем поле ссылки на фото*/


// добавление карточек "из коробки"

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

initialCards.forEach(element => {
    const placesForCards = document.querySelector('.elements'); /*Выбираем элемент в который будет добавлена карточка*/
    placesForCards.append(creationCard(element.name, element.link, element.name)); /* добавляем карточку на страницу */

});

//открытие и закрытие модального окна с фотографией

const popupImage = document.querySelector('#popup-image'); /*Выбираем модальное окно с фотографией*/
let popupImagePicture = popupImage.querySelector('.popup__big-image'); /*Выбираем большое фото*/
let popupImageHeading = popupImage.querySelector('.popup__big-image-heading'); /*Выбираем подпись к фото*/
const popupImageCloseButton = popupImage.querySelector('.popup__close-button');
popupImageCloseButton.addEventListener('click', ()=>operatePopup(popupImage));