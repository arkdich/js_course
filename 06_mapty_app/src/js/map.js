import {
  fullscreenMap,
  renderMap,
  setupDeletionHint,
  stretchMap,
} from './mapHandlers';
import { addForm } from './formHandlers';
import { isMobile } from './utilities';

const mymap = window.L.map('map');

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
    setTimeout(() => {
      addForm(ev);
    }, 650);
    return;
  }

  addForm(ev);
});

if (isMobile()) {
  mymap.on('movestart', stretchMap);
}
