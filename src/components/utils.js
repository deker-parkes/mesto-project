const pageContent = document.querySelector('.page'); /* содержимое страницы */
const avatarForm = pageContent.querySelector('#popup-avatar-form');
const photoView = pageContent.querySelector('#popup-image'); /*Выбираем модальное окно с фотографией*/


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = pageContent.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


// функция открытия модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
    pageContent.addEventListener('keydown', closeByEscape);
}

// функция закрытия модальных окон
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    pageContent.removeEventListener('keydown', closeByEscape);

}

// функция удаления сообщений об ошибках при закрытии модального окна
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

function handlePopupClose(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__button')) {
    const popupOpened = pageContent.querySelector('.popup_opened');
    closePopup(popupOpened);
}}


export {openPopup, closePopup, handlePopupClose, deleteErrors, pageContent, avatarForm, photoView};