let isBlocked = false;

export const mymap = window.L.map('map');

export const formMarker = {
  set(value) {
    if (value instanceof window.L.Marker) this._marker = value;
  },
  get() {
    return this._marker;
  },
};

export function setFormBlock(bool) {
  isBlocked = bool;
}

export function getFormBlock() {
  return isBlocked;
}

export function getWorkouts() {
  return JSON.parse(localStorage.getItem('workouts')) ?? [];
}

export function setWorkouts(workouts) {
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

export function toStartsWithUpper(str) {
  return str.replace(str[0], str[0].toUpperCase());
}

export function isMobile() {
  return 'ontouchstart' in document.documentElement;
}

export function focusEntryPoint() {
  document.getElementById('duration').focus();
}
