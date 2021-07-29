let isBlocked = false;

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
