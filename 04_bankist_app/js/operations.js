import accounts from './usersData.js';
import { currentUser as user } from './globalVar.js';
import { getTotalBalance } from './formatters.js';
import { updateUI } from './functionsUI.js';

export function transactMoney(callback, timeout, ...args) {
  setTimeout(() => {
    callback(...args);
    updateUI(user);
  }, timeout);
}

export function moneyTransfer(to, ammount) {
  const recipient = accounts.find((r) => r.login === to);

  if (
    recipient === undefined ||
    recipient === user ||
    getTotalBalance(user.movements) - ammount < 0 ||
    ammount < 0 ||
    ammount < 1 ||
    isNaN(ammount)
  )
    return;

  recipient.movements.push(ammount);
  recipient.movementsDates.push(new Date().toISOString());

  user.movements.push(-ammount);
  user.movementsDates.push(new Date().toISOString());
}

export function moneyLoan(from, ammount) {
  const loanFrom = accounts.find((f) => f.login === from);

  if (
    ammount <= 0 ||
    isNaN(ammount) ||
    loanFrom === undefined ||
    loanFrom === user
  )
    return;

  loanFrom.incomingRequests.push({
    from: user.login,
    ammount,
    currency: user.currency,
    date: new Date().toISOString(),
  });

  user.sentRequests.push({
    to: from,
    ammount,
    currency: user.currency,
    date: new Date().toISOString(),
    status: 'Sent',
  });
}

export function closeAccount() {
  const closeLogin = document.querySelector('.operation__close_login').value;
  const closePin = +document.querySelector('.operation__close_pin').value;

  if (closeLogin !== user.login || closePin !== user.pin) return;

  accounts.splice(accounts.indexOf(user), 1);
}
