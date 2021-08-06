import {
  centerMap,
  fullscreenMap,
  renderMap,
  setupDeletionHint,
} from './mapHandlers';
import { addForm } from './formHandlers';
import { isMobile, mymap } from './utilities';

navigator.geolocation.getCurrentPosition(
  (value) => {
    const { latitude, longitude } = value.coords;
    renderMap(mymap, latitude, longitude);
    setupDeletionHint();
  },
  (error) => alert(error.message)
);

mymap.on('click', (ev) => {
  if (document.getElementById('map').matches('.map-body_fullsize')) {
    fullscreenMap(false);

    const { latlng, _zoom } = ev;
    centerMap(latlng, _zoom);

    setTimeout(() => {
      addForm(ev);
    }, 650);
    return;
  }

  addForm(ev);
});

if (isMobile()) {
  mymap
    .getContainer()
    .insertAdjacentHTML('beforeend', `<button class="map-toggle"></button>`);
}
