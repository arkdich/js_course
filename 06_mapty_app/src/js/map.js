import { fullscreenMap, renderMap, setupDeletionHint } from './mapHandlers';
import { addForm } from './formHandlers';
import { isMobile } from './utilities';

const mymap = window.L.map('map');

mymap.on('click', addForm);

if (isMobile()) {
  mymap.on('movestart', stretchMap);
}

navigator.geolocation.getCurrentPosition(
  (value) => {
    const { latitude, longitude } = value.coords;
    renderMap(mymap, latitude, longitude);
    setupDeletionHint();
  },
  (error) => alert(error.message)
);

let initialFire = true;

function stretchMap(ev) {
  if (initialFire) {
    initialFire = false;
    return;
  }

  fullscreenMap(true);
}
