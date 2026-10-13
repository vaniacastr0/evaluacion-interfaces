'use strict';

const appointment = { service: false, day: null, time: null };
const hours = ['09:00', '10:00', '11:30', '15:00', '16:00', '17:30'];
const unavailableHours = new Set(['10:00', '16:00']);
const panels = ['service', 'schedule', 'review', 'success'];
let bookingTimer = null;
let submitting = false;

function formatDate(day) {
  return `${String(day).padStart(2, '0')}/10/26`;
}

function showPanel(name) {
  panels.forEach(panel => {
    document.getElementById(`${panel}-panel`).hidden = panel !== name;
  });
  const current = panels.indexOf(name);
  document.querySelectorAll('.steps li').forEach((item, index) => {
    item.classList.toggle('active', index === current);
    if (index === current) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  document.getElementById('page-title').textContent = name === 'success' ? 'Todo listo para tu sesión' : 'Reserva tu próxima sesión';
  document.getElementById('page-intro').textContent = name === 'success' ? 'Estos son los detalles de tu reserva.' : 'Elige un servicio y encuentra un momento para ti.';
  document.getElementById('page-title').focus();
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  for (let blank = 0; blank < 3; blank++) {
    const spacer = document.createElement('span');
    spacer.setAttribute('aria-hidden', 'true');
    calendar.append(spacer);
  }
  for (let day = 1; day <= 31; day++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day';
    button.textContent = day;
    button.dataset.day = day;
    button.setAttribute('aria-label', formatDate(day));
    button.setAttribute('aria-pressed', 'false');
    button.disabled = day < 12 || day > 16;
    button.addEventListener('click', () => selectDate(day));
    calendar.append(button);
  }
}

function selectDate(day) {
  appointment.day = day;
  appointment.time = null;
  document.querySelectorAll('.day').forEach(button => {
    const selected = Number(button.dataset.day) === day;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.getElementById('date-label').textContent = formatDate(day);
  document.getElementById('slot-message').textContent = '';
  document.getElementById('schedule-next').disabled = true;
  document.getElementById('time-note').hidden = false;
  renderHours();
}

function renderHours() {
  const container = document.getElementById('time-slots');
  container.replaceChildren();
  hours.forEach(time => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'time-slot';
    button.dataset.time = time;
    button.textContent = time;
    button.setAttribute('aria-pressed', String(appointment.time === time));
    button.addEventListener('click', () => selectTime(time));
    container.append(button);
  });
}

function selectTime(time) {
  if (unavailableHours.has(time)) {
    document.getElementById('slot-message').textContent = 'Este horario no está disponible. Selecciona otro horario.';
    return;
  }
  appointment.time = time;
  document.getElementById('slot-message').textContent = '';
  document.querySelectorAll('.time-slot').forEach(button => {
    const selected = button.dataset.time === time;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.getElementById('schedule-next').disabled = false;
}

function openReview() {
  if (!appointment.service || !appointment.day || !appointment.time) return;
  document.getElementById('review-date').textContent = formatDate(appointment.day);
  document.getElementById('review-time').textContent = `${appointment.time} · Santiago`;
  showPanel('review');
}

function returnToSchedule() {
  if (bookingTimer !== null) {
    clearTimeout(bookingTimer);
    bookingTimer = null;
    submitting = false;
  }
  showPanel('schedule');
}

function confirmBooking() {
  if (submitting || !appointment.day || !appointment.time) return;
  submitting = true;
  bookingTimer = setTimeout(() => {
    document.getElementById('success-date').textContent = formatDate(appointment.day);
    document.getElementById('success-time').textContent = `${appointment.time} · Santiago`;
    bookingTimer = null;
    submitting = false;
    showPanel('success');
  }, 2500);
}

document.getElementById('service-choice').addEventListener('change', event => {
  appointment.service = event.target.checked;
  document.getElementById('service-next').disabled = !appointment.service;
});
document.getElementById('service-next').addEventListener('click', () => {
  if (appointment.service) showPanel('schedule');
});
document.getElementById('schedule-back').addEventListener('click', () => showPanel('service'));
document.getElementById('schedule-next').addEventListener('click', openReview);
document.getElementById('review-back').addEventListener('click', returnToSchedule);
document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
renderCalendar();
