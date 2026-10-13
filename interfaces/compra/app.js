'use strict';

const views = [...document.querySelectorAll('.view')];
const form = document.getElementById('payment-form');
const message = document.getElementById('payment-message');
let hasProduct = false;

function updateCart() {
  document.getElementById('cart-count').textContent = hasProduct ? '1' : '0';
  document.getElementById('cart-filled').hidden = !hasProduct;
  document.getElementById('cart-empty').hidden = hasProduct;
  document.getElementById('keep-shopping').hidden = !hasProduct;
}

function clearPaymentMessages() {
  message.hidden = true;
  message.textContent = '';
}

function showView(name) {
  if (name === 'pago' && !hasProduct) name = 'carrito';
  if (name !== 'pago') {
    form.reset();
    clearPaymentMessages();
  }
  for (const view of views) view.hidden = view.id !== name;
  updateCart();
  const heading = document.querySelector(`#${name} h1`);
  heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

for (const button of document.querySelectorAll('[data-view]')) {
  button.addEventListener('click', () => showView(button.dataset.view));
}

function addProduct() {
  hasProduct = true;
  showView('carrito');
}
document.getElementById('catalog-add').addEventListener('click', addProduct);
document.getElementById('detail-add').addEventListener('click', addProduct);

document.getElementById('remove-item').addEventListener('click', () => {
  hasProduct = false;
  updateCart();
  document.querySelector('#carrito h1').focus({ preventScroll: true });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  clearPaymentMessages();
  const number = document.getElementById('card-number').value.replace(/[ -]/g, '');
  const expiry = document.getElementById('card-expiry').value.trim();
  const cvc = document.getElementById('card-cvc').value.trim();
  if (number !== '4242424242424242' || expiry !== '12/30' || cvc !== '123') {
    message.textContent = 'No se pudo procesar el pago. Revisa la información e intenta nuevamente.';
    message.hidden = false;
    return;
  }
  hasProduct = false;
  form.reset();
  showView('confirmacion');
});

document.getElementById('finish-shopping').addEventListener('click', () => showView('catalogo'));
updateCart();
