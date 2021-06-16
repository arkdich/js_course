import accounts from './usersData.js';
import { currentUser as user } from './globalVar.js';
import { convertCurrency, getTotalBalance } from './formatters.js';
import { updateUI } from './functionsUI.js';

export function transactMoney(callback, timeout, ...args) {
  setTimeout(() => {
    callback(...args).then(() => updateUI(user));
  }, timeout);
}

export async function moneyTransfer(to, amount) {
  const recipient = accounts.find((r) => r.login === to);

  if (
    recipient === undefined ||
    recipient === user ||
    getTotalBalance(user.movements) - amount < 0 ||
    amount < 0 ||
    amount < 1 ||
    isNaN(amount)
  )
    return;

  const amountConverted = await convertCurrency(amount, user.currency);

  recipient.movements.push(amountConverted);
  recipient.movementsDates.push(new Date().toISOString());

  user.movements.push(amount * -1);
  user.movementsDates.push(new Date().toISOString());
}

export async function moneyLoan(from, amount) {
  const loanFrom = accounts.find((f) => f.login === from);

  if (
    amount <= 0 ||
    isNaN(amount) ||
    loanFrom === undefined ||
    loanFrom === user
  )
    return;

  const amountConverted = await convertCurrency(amount, user.currency);

  loanFrom.incomingRequests.push({
    from: user.login,
    amount: amountConverted,
    currency: user.currency,
    date: new Date().toISOString(),
  });

  user.sentRequests.push({
    to: from,
    amount,
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
