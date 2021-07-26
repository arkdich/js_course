const { L } = window;

const coords = navigator.geolocation.getCurrentPosition(
  (value) => {
    const { latitude, longitude } = value.coords;
    renderMap(latitude, longitude);
  },
  () => console.log('pizda')
);

function renderMap(x, y) {
  const mymap = L.map('map').setView([x, y], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
}

// function renderMap(x, y) {
//   const mymap = L.map('map').setView([x, y], 13);

//   L.tileLayer(
//     'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
//     {
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//       maxZoom: 18,
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken:
//         'pk.eyJ1IjoiYXJrZGljaCIsImEiOiJja3JnZGpodDkyaXZjMnVwOHQ0MGRhcW82In0.ABlfmC7EwQRX9JSDrfaT-A',
//     }
//   ).addTo(mymap);
// }
