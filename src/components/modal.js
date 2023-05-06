import {pageContent, avatarForm, closePopup, deleteErrors} from './utils.js';
import {profileForm} from './script.js';


const profileUserName = pageContent.querySelector('.profile__username');
const profileUserInfo = pageContent.querySelector('.profile__user-info');
const profileFormUserName = pageContent.querySelector('.popup__field[name="name"]');
const profileFormUserInfo = pageContent.querySelector('.popup__field[name="about"]');
const avatarFormLink = avatarForm.querySelector('.popup__field[name="avatar-link"]');
const avatar = pageContent.querySelector('.profile__avatar');



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
    closePopup(profileForm);
}

//функция, добавляющая новый аватар

function handleAvatarFormSubmit(evt) {
    const popupButton = avatarForm.querySelector('.popup__button');
    evt.preventDefault();
    avatar.src = avatarFormLink.value;
    closePopup(avatarForm);
    evt.target.reset();
    popupButton.classList.add('popup__button_disabled');
    popupButton.disabled = true;

}

export {fillProfileInputs, handleProfileFormSubmit, handleAvatarFormSubmit};