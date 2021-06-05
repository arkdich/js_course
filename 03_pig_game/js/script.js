document.querySelector(".btn_new").addEventListener("click", startNew);

document
  .querySelector(".btn_roll")
  .addEventListener("click", () => checkAndDo(rollDice));
document
  .querySelector(".btn_hold")
  .addEventListener("click", () => checkAndDo(holdTurn));

const player1 = { current: 0, total: 0 };
const player2 = { current: 0, total: 0 };

let currentPlayer = 0;

function startNew() {
  player1.current =
    player1.total =
    player2.current =
    player2.total =
    currentPlayer =
      0;

  resetGame();
}

function resetGame() {
  const currents = document.querySelectorAll(".game-body__current");
  const totals = document.querySelectorAll(".game-body__total");

  currents.forEach((c) => (c.innerText = "0"));
  totals.forEach((t) => (t.innerText = "0"));

  const cols = document.querySelectorAll(".game-body__col");
  cols[0].classList.add("active");
  cols[1].classList.remove("active");
}

function checkAndDo(callback) {
  currentPlayer == 0 ? callback(player1) : callback(player2);
}

function rollDice(thisArg) {
  roll.apply(thisArg);

  function roll() {
    let dice = Math.ceil(Math.random() * 6);

    if (dice == 1) {
      this.current = 0;
      updateStats.apply(thisArg);
      switchPlayer();
      return;
    }

    this.current += dice;
    updateStats.apply(thisArg);
  }
}

function holdTurn(thisArg) {
  hold.apply(thisArg);

  function hold() {
    this.total += this.current;
    this.current = 0;
    updateStats.apply(thisArg);
    switchPlayer();
  }
}

function updateStats() {
  const currentStats = document.querySelector(".active .game-body__current");
  const totalStats = document.querySelector(".active .game-body__total");

  currentStats.innerText = this.current;
  totalStats.innerText = this.total;
}

function switchPlayer() {
  document
    .querySelectorAll(".game-body__col")
    .forEach((col) => col.classList.toggle("active"));

  currentPlayer = currentPlayer === 0 ? 1 : 0;
}
