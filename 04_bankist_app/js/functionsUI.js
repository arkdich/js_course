import {
  formatDateAndTime,
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
  const transferamount = document.querySelector('.operation__transfer_amount');
  const loanLogin = document.querySelector('.operation__loan_login');
  const loanamount = document.querySelector('.operation__loan_amount');
  const closeLogin = document.querySelector('.operation__close_login');
  const closePin = document.querySelector('.operation__close_pin');

  trasferLogin.value =
    transferamount.value =
    loanLogin.value =
    loanamount.value =
    closeLogin.value =
    closePin.value =
      '';

  transferamount.blur();
  loanamount.blur();
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

  labelDate.innerText = formatDateAndTime(user.locale, new Date());
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

  balanceValue.innerText = formatCurrency(user, totalBalance);
  balanceIn.innerText = formatCurrency(user, totalIn);
  balanceOut.innerText = formatCurrency(user, totalOut);
  balanceInterest.innerText = formatCurrency(user, totalInterest);
}
