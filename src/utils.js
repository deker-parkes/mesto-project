const pageContent = document.querySelector('.page'); /* содержимое страницы */
const avatarForm = pageContent.querySelector('#popup-avatar-form');
const photoView = pageContent.querySelector('#popup-image'); /*Выбираем модальное окно с фотографией*/




// функция открытия модального окна
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

export {openPopup, closePopup, pageContent, avatarForm, photoView};