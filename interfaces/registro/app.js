'use strict';

const form = document.querySelector('#registration-form');
const nameField = document.querySelector('#full-name');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const message = document.querySelector('#form-message');
const passwordGuide = document.querySelector('#password-guide');
let pending = false;

function validPassword(value) {
  return Array.from(value).length >= 8 && /\p{Lu}/u.test(value) && /[0-9]/.test(value);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (pending) return;

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value;
  const nameOk = name.length > 0;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordOk = validPassword(password);

  if (!passwordOk) passwordGuide.hidden = false;
  if (!nameOk || !emailOk || !passwordOk) {
    message.textContent = 'Hay errores en el formulario. Revisa la información ingresada.';
    return;
  }

  pending = true;
  message.textContent = '';
  window.setTimeout(() => {
    document.querySelector('#confirmation-greeting').textContent = `Te damos la bienvenida, ${name}.`;
    document.querySelector('#confirmation-email').textContent = email;
    document.querySelector('#registration-view').hidden = true;
    document.querySelector('#confirmation-view').hidden = false;
    document.querySelector('#confirmation-title').focus();
    pending = false;
  }, 2500);
});
