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
let isPlayable = true;

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

  updateImg(-1);
  isPlayable = true;

  const cols = document.querySelectorAll(".game-body__col");
  cols[0].classList.add("active");
  cols[0].classList.remove("game-body_win-state");
  cols[1].classList.remove("active", "game-body_win-state");
}

function checkAndDo(callback) {
  currentPlayer == 0 ? callback(player1) : callback(player2);
}

function rollDice(thisArg) {
  if (isPlayable) {
    roll.apply(thisArg);
  }

  function roll() {
    let dice = Math.ceil(Math.random() * 6);
    updateImg(dice);

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
  if (isPlayable) {
    hold.apply(thisArg);
  }

  function hold() {
    this.total += this.current;
    this.current = 0;
    updateStats.apply(thisArg);

    if (this.total >= 100) {
      gameWinState();
      return;
    }

    switchPlayer();
  }
}

function updateStats() {
  const currentStats = document.querySelector(".active .game-body__current");
  const totalStats = document.querySelector(".active .game-body__total");

  currentStats.innerText = this.current;
  totalStats.innerText = this.total;
}

function updateImg(diceNum) {
  const rollImg = document.querySelector(".dice img");

  if (diceNum < 1) {
    rollImg.src = "";
    return;
  }

  rollImg.src = `imgs/dice-${diceNum}.png`;
}

function switchPlayer() {
  document
    .querySelectorAll(".game-body__col")
    .forEach((col) => col.classList.toggle("active"));

  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

function gameWinState() {
  const winner = document.querySelector(".active");
  winner.classList.add("game-body_win-state");

  isPlayable = false;
}
