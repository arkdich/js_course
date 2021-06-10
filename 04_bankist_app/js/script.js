const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  login: "jonas",
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  login: "jess",
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  login: "steve",
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  login: "sarah",
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const btnLog = document.querySelector(".btn_header");
const btnTrans = document.querySelector(".btn_trans");
const btnLoan = document.querySelector(".btn_loan");
const btnClose = document.querySelector(".btn_close");

document.body.addEventListener("keydown", checkKey);

btnLog.addEventListener("click", logUser);

function logUser() {
  const userLogin = document.querySelector(".header__input_login").value;
  const userPin = +document.querySelector(".header__input_pin").value;

  accounts.forEach((acc) => {
    if (acc.login === userLogin && acc.pin === userPin) {
      showUi(acc);
    }
  });
}

function showUi(user) {
  const wrapper = document.querySelector(".wrapper");

  wrapper.classList.remove("hidden");
}

function checkKey(ev) {
  if (ev.key !== "Enter") return;

  if (ev.target.parentElement.classList.contains("header__form")) {
    logUser();
  }
}
