import {
  formatDate,
  formatTime,
  formatCurrency,
  getTotalBalance,
} from './formatters.js';

import { showMovements } from './movements.js';
import { showRequests } from './requests.js';

export function toggleUI() {
  document.body.classList.toggle('hidden');
}

export function updateHeaderUI(user) {
  const headerTitle = document.querySelector('.header__title');
  const logLogin = document.querySelector('.header__input_login');
  const logPin = document.querySelector('.header__input_pin');

  logLogin.value = logPin.value = '';
  logPin.blur();

  if (user === undefined) {
    headerTitle.innerText = 'Log in to get started';
    return;
  }

  const userName = user.owner.split(' ')[0];
  headerTitle.innerText = `Welcome back, ${userName}`;
}

export function clearOperationsUI() {
  const trasferLogin = document.querySelector('.operation__transfer_login');
  const transferAmmount = document.querySelector(
    '.operation__transfer_ammount'
  );
  const loanLogin = document.querySelector('.operation__loan_login');
  const loanAmmount = document.querySelector('.operation__loan_ammount');
  const closeLogin = document.querySelector('.operation__close_login');
  const closePin = document.querySelector('.operation__close_pin');

  trasferLogin.value =
    transferAmmount.value =
    loanLogin.value =
    loanAmmount.value =
    closeLogin.value =
    closePin.value =
      '';

  transferAmmount.blur();
  loanAmmount.blur();
  closePin.blur();
}

export function updateUI(user) {
  updateDateAndTime(user);
  updateBalance(user);
  showMovements(user, false);
  showRequests(user);
}

export function updateDateAndTime(user) {
  const labelDate = document.querySelector('.date');

  const currentDate = new Date();

  const dateStr = formatDate(user.locale, currentDate);
  const timeStr = formatTime(user.locale, currentDate);

  labelDate.innerText = `${dateStr}, ${timeStr}`;
}

export function updateBalance(user) {
  const balanceValue = document.querySelector('.balance__value');
  const balanceIn = document.querySelector('.summary__in');
  const balanceOut = document.querySelector('.summary__out');
  const balanceInterest = document.querySelector('.summary__interest');

  let totalIn = 0;
  let totalOut = 0;

  const totalBalance = getTotalBalance(user.movements);

  user.movements.forEach((value) => {
    if (value > 0) {
      totalIn += value;
    } else {
      totalOut += Math.abs(value);
    }
  });

  const totalInterest = (totalIn * user.interestRate) / 100;

  balanceValue.innerText = formatCurrency(
    user.currency,
    totalBalance.toFixed(2)
  );
  balanceIn.innerText = formatCurrency(user.currency, totalIn.toFixed(2));
  balanceOut.innerText = formatCurrency(user.currency, totalOut.toFixed(2));
  balanceInterest.innerText = formatCurrency(
    user.currency,
    totalInterest.toFixed(2)
  );
}
