import { isSorted, currentUser } from './globalVar.js';
import { sortRequests } from './requests.js';
import { showMovements } from './movements.js';
import { clearOperationsUI, updateUI } from './functionsUI.js';
import { acceptRequest, declineRequest } from './requestsControls.js';
import { logInUser, logOutUser } from './userLogging.js';
import {
  transactMoney,
  moneyTransfer,
  moneyLoan,
  closeAccount,
} from './operations.js';

const btnLog = document.querySelector('.btn_header');
const btnTrans = document.querySelector('.btn_trans');
const btnLoan = document.querySelector('.btn_loan');
const btnClose = document.querySelector('.btn_close');
const btnSort = document.querySelector('.btn_sort');

const labelLogOut = document.querySelector('.timer__log-out');

const requestsCont = document.querySelector('.requests_inc');

btnLog.addEventListener('click', () => {
  setTimeout(() => {
    logInUser();
  }, 1000);
});

btnTrans.addEventListener('click', () => {
  const transLogin = document.querySelector('.operation__transfer_login').value;
  const transValue = +document.querySelector('.operation__transfer_amount')
    .value;

  transactMoney(moneyTransfer, transValue * 0.2, transLogin, transValue);
  updateUI(currentUser);
});

btnLoan.addEventListener('click', () => {
  const loanLogin = document.querySelector('.operation__loan_login').value;
  const loanValue = +document.querySelector('.operation__loan_amount').value;

  transactMoney(moneyLoan, loanValue * 0.2, loanLogin, loanValue);
  updateUI(currentUser);
});

btnClose.addEventListener('click', () => {
  setTimeout(() => {
    closeAccount();
  }, 1000);
});

btnSort.addEventListener('click', () => {
  showMovements(currentUser, isSorted !== true);
});

labelLogOut.addEventListener('click', () => {
  setTimeout(() => {
    logOutUser();
  }, 1000);
});

requestsCont.addEventListener('click', (ev) => {
  const requestEntry = ev.target.parentElement.parentElement;

  const entryID = Array.from(requestsCont.children).indexOf(requestEntry);

  const requestObj = sortRequests(currentUser.incomingRequests)[entryID];

  if (requestObj === undefined) return;

  if (ev.target.classList.contains('bg-green')) {
    acceptRequest(currentUser, requestObj, entryID);
  } else {
    declineRequest(currentUser, requestObj, entryID);
    updateUI(currentUser);
    return;
  }

  const { amount, from } = requestObj;

  transactMoney(moneyTransfer, amount * 0.2, from, amount);
});

document.body.addEventListener('keydown', checkKey);

function checkKey(ev) {
  if (ev.key !== 'Enter') return;

  if (ev.target.parentElement.classList.contains('header__form')) {
    btnLog.click();
  } else if (
    ev.target.parentElement.classList.contains('operation__transfer')
  ) {
    btnTrans.click();
  } else if (ev.target.parentElement.classList.contains('operation__loan')) {
    btnLoan.click();
  } else if (ev.target.parentElement.classList.contains('operation__close')) {
    btnClose.click();
  }
}
