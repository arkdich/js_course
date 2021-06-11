"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
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
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  login: "jess",
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

let isSorted = false;
const user = accounts[0];

const btnLog = document.querySelector(".btn_header");
const btnTrans = document.querySelector(".btn_trans");
const btnLoan = document.querySelector(".btn_loan");
const btnClose = document.querySelector(".btn_close");
const btnSort = document.querySelector(".btn_sort");

logUser();

document.body.addEventListener("keydown", checkKey);

btnLog.addEventListener("click", logUser);
btnSort.addEventListener("click", () => showMovements(user));

function logUser() {
  // const userLogin = document.querySelector(".header__input_login").value;
  // const userPin = +document.querySelector(".header__input_pin").value;

  // const user = accounts.find(
  //   (entry) => entry.login === userLogin && entry.pin === userPin
  // );

  if (user == null) return;

  showUi(user);
  updateUI(user);
  updateDateAndTime(user);
  updateBalance(user);
  showMovements(user);
}

function showUi(user) {
  const wrapper = document.querySelector(".wrapper");

  wrapper.classList.remove("hidden");
}

function updateUI(user) {
  const headerTitle = document.querySelector(".header__title");
  const inputLogin = document.querySelector(".header__input_login");
  const inputPin = document.querySelector(".header__input_pin");

  const userName = user.owner.split(" ")[0];
  headerTitle.innerText = `Welcome back, ${userName}`;

  inputLogin.value = inputPin.value = "";
  inputPin.blur();
}

function updateDateAndTime(user) {
  let dateStr;

  const dateTag = document.querySelector(".date");

  const currentDate = new Date();

  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

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

  const timeStr = updateTime(user, currentDate);

  dateTag.innerText = `${dateStr}, ${timeStr}`;
}

function updateTime(user, date) {
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

  let totalBalance;
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
  return user.locale == "en-US" ? `$${sum}` : `${sum}€`;
}

function showMovements(user) {
  const movementsWrapper = document.querySelector(".movements");

  movementsWrapper.innerHTML = "";

  const movementsMap = new Map();

  for (let i = 0; i < user.movements.length; i++) {
    movementsMap.set(user.movementsDates[i], user.movements[i]);
  }

  const sortedMov = sortMovements(Array.from(movementsMap));

  sortedMov.forEach((entry, index) => {
    const movementEntry = document.createElement("div");

    movementEntry.className = "movements__entry";
    movementEntry.innerHTML = `
    <p class="movements__type ${entry[1] > 0 ? "bg-green" : "bg-red"}">
    ${index + 1} ${entry[1] > 0 ? "Deposit" : "Withdrawal"}</p>
    <p class="movements__date">${entry[0].substr(0, 10)}</p>
    <p class="movements__value">${addCurrency(user.locale, entry[1])}</p>`;

    movementsWrapper.append(movementEntry);
  });
}

function sortMovements(movements) {
  if (!isSorted) {
    isSorted = true;
    movements.sort((a, b) => {
      return new Date(b[0]) - new Date(a[0]);
    });
  } else {
    isSorted = false;
    movements.sort((a, b) => {
      return b[1] - a[1];
    });
  }

  return movements;
}

function checkKey(ev) {
  if (ev.key !== "Enter") return;

  if (ev.target.parentElement.classList.contains("header__form")) {
    logUser();
  }
}

function moneyTransfer(to, ammount) {}
