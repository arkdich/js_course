const numOutput = document.querySelector(".game-body__output");
const numInput = document.querySelector(".game-body__input");

numInput.addEventListener("keyup", keyCheck);
document.getElementById("check").addEventListener("click", checkNumber);
document.getElementById("again").addEventListener("click", resetGame);

const gameInfo = document.getElementById("game_info");
const gameScore = document.getElementById("game_score");
const gameRecord = document.getElementById("game_highscore");

let score;
let secretNumber;
let prevValue;

resetGame();

function resetGame() {
  score = 20;
  prevValue = null;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  numOutput.innerText = "?";
  numInput.value = "";

  gameInfo.innerText = "Start guessing...";
  gameRecord.innerText = localStorage.getItem("_01_highscore") ?? 0;
  gameScore.innerText = score;

  document.body.classList.remove("bg-green");
}

function keyCheck(ev) {
  if (ev.code == "Enter" || ev.code == "NumpadEnter") {
    checkNumber();
  }
}

function checkNumber() {
  if (numInput.value === "") {
    return;
  } else if (score === 0) {
    gameInfo.innerText = "You Lost! Try Again";
    return;
  }

  const currValue = +numInput.value;

  const prevDiff = secretNumber - prevValue;
  const currDiff = secretNumber - currValue;

  if (prevValue === null) {
    if (currValue < secretNumber) {
      gameInfo.innerText = "Too Low!";
      decreaseScore();

      prevValue = currValue;
      return;
    }
  }

  if (currValue > secretNumber) {
    gameInfo.innerText = "Too High!";
    decreaseScore();
  } else if (currValue == secretNumber) {
    gameWinState();
  } else if (currDiff < prevDiff) {
    gameInfo.innerText = "Getting Closer!";
    decreaseScore();
  } else if (currDiff > prevDiff || currDiff == prevDiff) {
    gameInfo.innerText = "Cold!";
    decreaseScore();
  }

  prevValue = currValue;
}

function decreaseScore() {
  gameScore.innerText = --score;
}

function gameWinState() {
  gameInfo.innerText = "Correct Number!";
  numOutput.innerText = secretNumber;

  if (+gameScore.innerText > +gameRecord.innerText) {
    localStorage.setItem("_01_highscore", score);
  }

  document.body.classList.add("bg-green");
}
