// отображение ошибки
function showInputError(form, element, message, settings) {
  const errorMessage = form.querySelector(`.${settings.inputErrorSelector}[id=${element.name}]`);
  element.classList.add(settings.errorFieldClass);
  errorMessage.classList.add(settings.errorClass);
  errorMessage.textContent = message;
}

// скрытие ошибки
function hideInputError(form, element, settings) {
  const errorMessage = form.querySelector(`.${settings.inputErrorSelector}[id=${element.name}]`);
  element.classList.remove(settings.errorFieldClass);
  errorMessage.classList.remove(settings.errorClass);
  errorMessage.textContent = "";
}

// валидация полей
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

// проверка формы
function hasInvalidInput(form) {
  return form.some((field) => {
    return !field.validity.valid;
  });
}

// отображение активной/неактивной кнопки
function toggleButtonState(form, buttonElement, settings) {
  if (hasInvalidInput(form)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// добавление слушальщиков ко всем полям
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

//включение валидации
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((element) => {
    setEventListeners(element, settings);
  });
}

export {enableValidation};