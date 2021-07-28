import { renderMap } from './mapHandlers';

import { addForm } from './formHandlers';

const mymap = window.L.map('map');

mymap.on('click', addForm);

navigator.geolocation.getCurrentPosition(
  (value) => {
    const { latitude, longitude } = value.coords;
    renderMap(mymap, latitude, longitude);
  },
  (error) => console.log(error)
);
