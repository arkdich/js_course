import { setFormBlock } from './utilities';

let initialFire = true;

export function renderMap(map, latitude, longitude) {
  map.setView([latitude, longitude], 12);

  window.L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

export function stretchMap() {
  if (initialFire) {
    initialFire = false;
    return;
  }

  fullscreenMap(true);

  document.forms[0]?.remove();
  setFormBlock(false);
}

export function fullscreenMap(bool) {
  const map = document.getElementById('map');

  if (bool) map.classList.add('map-body_fullsize');
  else map.classList.remove('map-body_fullsize');
}

export function setupDeletionHint() {
  if (document.cookie.includes('hideDeletePopup')) return;

  const map = document.getElementById('map');
  const popup = document.createElement('div');

  popup.className = 'mapPopup';
  popup.innerHTML = `
    <p class="mapPopup__text">
      You can delete workout <br> by double tapping it
    </p>
    <button class="mapPopup__close">&times;</button>`;

  popup.addEventListener('click', hintConfirm);

  map.append(popup);
}

function hintConfirm(ev) {
  ev.stopPropagation();

  if (!ev.target.matches('.mapPopup__close')) return;

  const date = new Date();
  date.setMonth(date.getMonth() + 6);

  document.cookie = `hideDeletePopup=true; path=/; expires=${date.toUTCString()}`;

  ev.target.closest('.mapPopup').remove();
}
