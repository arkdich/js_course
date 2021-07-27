import { renderMap, addWorkout } from './mapHandlers';

const mymap = window.L.map('map');

mymap.on('click', addWorkout);

navigator.geolocation.getCurrentPosition(
  (value) => {
    const { latitude, longitude } = value.coords;
    renderMap(mymap, latitude, longitude);
  },
  (error) => console.log(error)
);
