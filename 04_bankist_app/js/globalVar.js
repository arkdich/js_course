let currentUser;
let isSorted = false;
let timerIntId;

export function setCurrentUser(value) {
  currentUser = value;
}

export function setIsSorted(value) {
  isSorted = value;
}

export function setTimerId(value) {
  timerIntId = value;
}

export { currentUser, isSorted, timerIntId };
