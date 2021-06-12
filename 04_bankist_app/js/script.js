"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  login: "jonas",
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, -150, -790, -1000, 8500, -30],
  interestRate: 1.5,
  login: "jess",
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

let user;
let totalBalance;
let isSorted = false;
let timerIntId;

const btnLog = document.querySelector(".btn_header");
const btnTrans = document.querySelector(".btn_trans");
const btnLoan = document.querySelector(".btn_loan");
const btnClose = document.querySelector(".btn_close");
const btnSort = document.querySelector(".btn_sort");

const labelLogOut = document.querySelector(".timer__log-out");

document.body.addEventListener("keydown", checkKey);

btnLog.addEventListener("click", () => {
  setTimeout(() => {
    logInUser();
  }, 1000);
});

btnTrans.addEventListener("click", () => {
  const transLogin = document.querySelector(".operation__transfer_login").value;
  const transValue = +document.querySelector(".operation__transfer_ammount")
    .value;

  transactMoney(moneyTransfer, transValue * 0.2, transLogin, transValue);
  clearOperationsUI();
});

btnLoan.addEventListener("click", () => {
  const loanValue = +document.querySelector(".operation__loan_ammount").value;

  transactMoney(moneyLoan, loanValue * 0.25, loanValue);
  clearOperationsUI();
});

btnClose.addEventListener("click", closeAccount);

btnSort.addEventListener("click", () => {
  if (isSorted) {
    showMovements(user, false);
  } else {
    showMovements(user, true);
  }
});

labelLogOut.addEventListener("click", () => {
  setTimeout(() => {
    logOutUser();
  }, 1000);
});

function logInUser() {
  const userLogin = document.querySelector(".header__input_login").value;
  const userPin = +document.querySelector(".header__input_pin").value;

  user = accounts.find(
    (entry) => entry.login === userLogin && entry.pin === userPin
  );

  if (user == undefined) return;

  toggleUI();
  updateHeaderUI();
  updateUI(user);
  setLogOutTimer(9, 59);
}

function toggleUI() {
  document.body.classList.toggle("hidden");
}

function updateHeaderUI() {
  const headerTitle = document.querySelector(".header__title");
  const logLogin = document.querySelector(".header__input_login");
  const logPin = document.querySelector(".header__input_pin");

  logLogin.value = logPin.value = "";
  logPin.blur();

  if (user == undefined) {
    headerTitle.innerText = "Log in to get started";
    return;
  }

  const userName = user.owner.split(" ")[0];
  headerTitle.innerText = `Welcome back, ${userName}`;
}

function clearOperationsUI() {
  const trasferLogin = document.querySelector(".operation__transfer_login");
  const transferAmmount = document.querySelector(
    ".operation__transfer_ammount"
  );
  const loanAmmount = document.querySelector(".operation__loan_ammount");
  const closeLogin = document.querySelector(".operation__close_login");
  const closePin = document.querySelector(".operation__close_pin");

  trasferLogin.value =
    transferAmmount.value =
    loanAmmount.value =
    closeLogin.value =
    closePin.value =
      "";

  transferAmmount.blur();
  loanAmmount.blur();
  closePin.blur();
}

function updateUI(user) {
  updateDateAndTime(user);
  updateBalance(user);
  showMovements(user, false);
}

function updateDateAndTime(user) {
  const dateTag = document.querySelector(".date");

  const currentDate = new Date();

  const dateStr = formatDate(user, currentDate);
  const timeStr = formatTime(user, currentDate);

  dateTag.innerText = `${dateStr}, ${timeStr}`;
}

function formatDate(user, currDate) {
  const date = currDate.getDate();
  const month = currDate.getMonth() + 1;
  const year = currDate.getFullYear();

  let dateStr;

  const dateAndMonth = [
    date < 10 ? "0" + date : date,
    month + 1 < 10 ? "0" + month : month,
  ];

  if (user.locale !== "en-US") {
    dateStr = dateAndMonth[0] + "/" + dateAndMonth[1];
  } else {
    dateStr = dateAndMonth[1] + "/" + dateAndMonth[0];
  }

  dateStr += `/${year}`;

  return dateStr;
}

function formatTime(user, date) {
  let timeStr;

  const dateHours = date.getHours();
  const dateMins = date.getMinutes();

  if (user.locale != "en-US") {
    timeStr = `${dateHours < 10 ? "0" + dateHours : dateHours}`;
  } else {
    timeStr = `${dateHours % 12}`;
  }

  timeStr += `:${dateMins < 10 ? "0" + dateMins : dateMins}`;

  if (user.locale == "en-US") {
    timeStr += dateHours < 12 ? " AM" : " PM";
  }

  return timeStr;
}

function updateBalance(user) {
  const balanceValue = document.querySelector(".balance__value");
  const balanceIn = document.querySelector(".summary__in");
  const balanceOut = document.querySelector(".summary__out");
  const balanceInterest = document.querySelector(".summary__interest");

  let totalIn = 0;
  let totalOut = 0;
  let totalInterest;

  totalBalance = user.movements.reduce((prev, curr) => {
    prev += curr;
    return prev;
  });

  user.movements.forEach((value) => {
    if (value > 0) {
      totalIn += value;
    } else {
      totalOut += Math.abs(value);
    }
  });

  totalInterest = (totalIn * user.interestRate) / 100;

  balanceValue.innerText = addCurrency(user, totalBalance.toFixed(2));
  balanceIn.innerText = addCurrency(user, totalIn.toFixed(2));
  balanceOut.innerText = addCurrency(user, totalOut.toFixed(2));
  balanceInterest.innerText = addCurrency(user, totalInterest.toFixed(2));
}

function addCurrency(user, sum) {
  if (user.locale == "en-US") {
    return sum > 0 ? `$${sum}` : `-$${Math.abs(sum)}`;
  } else {
    return `${sum}€`;
  }
}

function showMovements(user, descending) {
  const movementsWrapper = document.querySelector(".movements");

  movementsWrapper.innerHTML = "";

  const movementsMap = new Map();

  for (let i = 0; i < user.movements.length; i++) {
    movementsMap.set(user.movementsDates[i], user.movements[i]);
  }

  const sortedMov = sortMovements(Array.from(movementsMap), descending);

  sortedMov.forEach((entry, index) => {
    const movementEntry = document.createElement("div");

    movementEntry.className = "movements__entry";
    movementEntry.innerHTML = `
    <p class="movements__type ${entry[1] > 0 ? "bg-green" : "bg-red"}">
    ${index + 1} ${entry[1] > 0 ? "Deposit" : "Withdrawal"}</p>
    <p class="movements__date">${formatDate(user, new Date(entry[0]))}</p>
    <p class="movements__value">${addCurrency(user, entry[1])}</p>`;

    movementsWrapper.append(movementEntry);
  });
}

function sortMovements(movements, descending) {
  if (!descending) {
    isSorted = false;
    movements.sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
    });
  } else {
    isSorted = true;
    movements.sort((a, b) => {
      return b[1] - a[1];
    });
  }

  return movements;
}

function checkKey(ev) {
  if (ev.key !== "Enter") return;

  if (ev.target.parentElement.classList.contains("header__form")) {
    btnLog.click();
  } else if (
    ev.target.parentElement.classList.contains("operation__transfer")
  ) {
    btnTrans.click();
  } else if (ev.target.parentElement.classList.contains("operation__loan")) {
    btnLoan.click();
  } else if (ev.target.parentElement.classList.contains("operation__close")) {
    btnClose.click();
  }
}

function moneyTransfer(to, ammount) {
  const recipient = accounts.find((r) => r.login === to);

  if (
    recipient === undefined ||
    recipient === user ||
    totalBalance - ammount < 0 ||
    ammount < 0 ||
    ammount < 1 ||
    isNaN(ammount)
  )
    return;

  recipient.movements.push(ammount);
  recipient.movementsDates.push(new Date().toISOString());

  user.movements.push(-ammount);
  user.movementsDates.push(new Date().toISOString());

  updateUI(user);
}

function moneyLoan(ammount) {
  if (ammount > 50_000 || ammount <= 0 || ammount < 1000 || isNaN(ammount))
    return;

  user.movements.push(ammount);
  user.movementsDates.push(new Date().toISOString());

  updateUI(user);
}

function closeAccount() {
  const closeLogin = document.querySelector(".operation__close_login").value;
  const closePin = +document.querySelector(".operation__close_pin").value;

  if (closeLogin !== user.login || closePin !== user.pin) return;

  accounts.splice(accounts.indexOf(user), 1);
  logOutUser();
}

function setLogOutTimer(timeMin, timeSec) {
  const labelTime = document.querySelector(".timer__time");

  labelTime.innerText = `${timeMin < 10 ? "0" + timeMin : timeMin}:${
    timeSec < 10 ? "0" + timeSec : timeSec
  }`;

  timerIntId = setInterval(() => {
    if (timeMin == 0 && timeSec == 0) {
      logOutUser();
      return;
    }

    if (timeSec === 0) {
      timeSec = 59;
      timeMin -= 1;
    } else {
      timeSec -= 1;
    }

    labelTime.innerText = `${timeMin < 10 ? "0" + timeMin : timeMin}:${
      timeSec < 10 ? "0" + timeSec : timeSec
    }`;
  }, 1000);
}

function logOutUser() {
  clearInterval(timerIntId);
  user = undefined;
  toggleUI();
  updateHeaderUI();
}

function transactMoney(callback, timeout, ...args) {
  setTimeout(() => {
    callback(...args);
    updateUI(user);
  }, timeout);
}
