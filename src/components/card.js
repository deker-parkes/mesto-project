import { pageContent, photoView, closePopup } from './utils.js';
import { newCardForm, placeForNewCard} from './script.js';

const cardTemplate = pageContent.querySelector('#card').content;
const newCardFormNameField = pageContent.querySelector('.popup__field[name="place-name"]'); /*Выбираем поле названия места*/
const newCardFormlinkField = pageContent.querySelector('.popup__field[name="place-link"]'); /*Выбираем поле ссылки на фото*/
const photoViewPicture = photoView.querySelector('.popup__big-image'); /*Выбираем большое фото*/
const photoViewHeading = photoView.querySelector('.popup__big-image-heading'); /*Выбираем подпись к фото*/




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

export {createCard, handleCardFormSubmit};