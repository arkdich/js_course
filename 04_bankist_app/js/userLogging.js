import {
  toggleUI,
  updateHeaderUI,
  updateUI,
  clearOperationsUI,
} from './functionsUI.js';
import {
  timerIntId,
  currentUser as user,
  setCurrentUser,
  setTimerId,
} from './globalVar.js';
import accounts from './usersData.js';

export function logInUser() {
  const userLogin = document.querySelector('.header__input_login').value;
  const userPin = +document.querySelector('.header__input_pin').value;

  const acc = accounts.find(
    (entry) => entry.login === userLogin && entry.pin === userPin
  );

  setCurrentUser(acc);

  if (user === undefined) return;

  toggleUI();
  updateHeaderUI(user);
  updateUI(user);
  setLogOutTimer(9, 59);
}

export function setLogOutTimer(min, sec) {
  const labelTime = document.querySelector('.timer__time');

  let timeOutMin = min;
  let timeOutSec = sec;

  labelTime.innerText = `${timeOutMin < 10 ? `0${timeOutMin}` : timeOutMin}:${
    timeOutSec < 10 ? `0${timeOutSec}` : timeOutSec
  }`;

  const timerId = setInterval(() => {
    if (timeOutMin === 0 && timeOutSec === 0) {
      logOutUser(user);
      return;
    }

    if (timeOutSec === 0) {
      timeOutSec = 59;
      timeOutMin -= 1;
    } else {
      timeOutSec -= 1;
    }

    labelTime.innerText = `${timeOutMin < 10 ? `0${timeOutMin}` : timeOutMin}:${
      timeOutSec < 10 ? `0${timeOutSec}` : timeOutSec
    }`;
  }, 1000);

  setTimerId(timerId);
}

export function logOutUser() {
  clearInterval(timerIntId);
  setCurrentUser(undefined);
  toggleUI();
  clearOperationsUI();
  updateHeaderUI(user);
}
