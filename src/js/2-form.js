'use strict';
import iziToast from 'izitoast';

const formData = { email: '', message: '' };
const localStorageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function inputHandler(event) {
  const inputEl = event.target;

  const name = inputEl.name;
  const value = inputEl.value;

  formData[name] = value;
  updateLocalStorage();
}

function submitHandler(event) {
  event.preventDefault();

  const formDataValues = Object.values(formData);

  if (formDataValues.some(el => el === '')) {
    console.warn('Fill please all fields');
    iziToast.warning({
      title: 'Warning',
      position: 'topRight',
      message: 'Fill please all fields',
    });

    return;
  }
  console.log(formData);
  iziToast.success({
    title: 'Success',
    position: 'topRight',
    message: `email: ${formData.email}, Message: ${formData.message}`,
  });

  event.currentTarget.reset();
  formData.email = '';
  formData.message = '';
  localStorage.removeItem('feedback-form-state');
}

function updateLocalStorage() {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', function (event) {
  const dataLocalStorage = localStorage.getItem(localStorageKey);
  try {
    const formDataObject = JSON.parse(dataLocalStorage);

    const formDataFromLSKeys = Object.keys(formDataObject);

    formDataFromLSKeys.forEach(key => {
      form.elements[key].value = formDataObject[key];
      formData[key] = formDataObject[key];
    });
  } catch (error) {}
});

form.addEventListener('change', inputHandler);
form.addEventListener('submit', submitHandler);
