import {
  getBorderStyle,
  getDistanceStyle,
  getHeader,
} from './componentsHandlers';
import {
  formBlock,
  formMarker,
  leaflet,
  mymap,
  workoutArray,
} from './utilities';

export function renderMap(map, latitude, longitude) {
  map.setView([latitude, longitude], 14);

  leaflet
    .tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    )
    .addTo(map);
}

export function toggleMap(ev) {
  ev.stopPropagation();

  const map = mymap.getContainer();

  if (map.matches('.map-body_fullsize')) fullscreenMap(false);
  else stretchMap();
}

export function stretchMap() {
  fullscreenMap(true);

  document.querySelector('.form')?.remove();
  formBlock.set(false);

  const marker = formMarker.get();

  if (marker) marker.remove();
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

export function renderMarker(map, workout) {
  const { coords, type } = workout;

  const marker = leaflet
    .marker(Object.values(coords), { id: workout.id })
    .addTo(map)
    .bindPopup(
      leaflet.popup({
        className: `map-marker ${getBorderStyle(type)}`,
      })
    )
    .setPopupContent(`${getDistanceStyle(type)} ${getHeader(workout)}`);

  return marker;
}

export function centerOnMarker(ev) {
  const entry = ev.target.closest('.entry_filled');

  if (!entry) return;

  const entryId = Number(entry.dataset.id);
  const workout = workoutArray.get().find((w) => w.id === entryId);

  mymap.eachLayer((layer) => {
    if (layer instanceof leaflet.Marker) {
      if (layer.options.id === entryId) layer.openPopup();
    }
  });

  centerMap(workout.coords, 14);
}

export function centerMap(coords, zoom) {
  mymap.setView(Object.values(coords), zoom, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
}

function hintConfirm(ev) {
  ev.stopPropagation();

  if (!ev.target.matches('.mapPopup__close')) return;

  const date = new Date();
  date.setMonth(date.getMonth() + 6);

  document.cookie = `hideDeletePopup=true; path=/; expires=${date.toUTCString()}`;

  ev.target.closest('.mapPopup').remove();
}
