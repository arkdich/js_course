export const mymap = window.L.map('map');
export const leaflet = window.L;

export const formMarker = {
  get() {
    return this._marker;
  },

  set(value) {
    if (value instanceof leaflet.Marker) this._marker = value;
  },
};

export const formBlock = {
  _flag: false,

  get() {
    return this._flag;
  },

  set(value) {
    if (typeof value === 'boolean') this._flag = value;
  },
};

export const workoutArray = {
  _workouts: JSON.parse(localStorage.getItem('workouts')) ?? [],

  get() {
    return this._workouts;
  },

  set(value) {
    if (!(value instanceof Array)) return;

    localStorage.setItem('workouts', JSON.stringify(value));
    this._workouts = value;
  },
};

export function toStartsWithUpper(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

export function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

export function focusEntryPoint() {
  document.getElementById('duration').focus();
}
