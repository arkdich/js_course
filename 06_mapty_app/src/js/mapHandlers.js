import { renderRunCycling, renderSwimming, renderCustom } from './components';

export function renderMap(map, latitude, longitude) {
  map.setView([latitude, longitude], 13);

  window.L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

export function addWorkout() {
  const wrapper = document.querySelector('.entry-wrapper');

  const newEntry = document.createElement('form');
  newEntry.className = 'entry';
  newEntry.innerHTML = renderRunCycling('running');

  newEntry.addEventListener('change', changeWorkoutType);

  wrapper.prepend(newEntry);
}

function changeWorkoutType(ev) {
  if (!ev.target.matches('.entry__type')) return;

  const select = ev.target;
  const cont = select.closest('.entry');

  [].forEach.call(select.options, (option, index) => {
    if (select.selectedIndex !== index) return;

    switch (option.value) {
      case 'running':
        cont.innerHTML = renderRunCycling('running');
        break;
      case 'swimming':
        cont.innerHTML = renderSwimming();
        break;
      case 'cycling':
        cont.innerHTML = renderRunCycling('cycling');
        break;
      case 'custom':
        cont.innerHTML = renderCustom();
        break;
      default:
        break;
    }
  });
}
