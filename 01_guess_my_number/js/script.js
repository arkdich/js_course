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
  prevValue = 0;
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
  const currValue = +numInput.value;

  if (!prevValue) {
    if (currValue > secretNumber) {
      gameInfo.innerText = "Too High!";
      decreaseScore();
    } else if (currValue < secretNumber) {
      gameInfo.innerText = "Too Low!";
      decreaseScore();
    } else {
      gameInfo.innerText = "Correct Number!";
      numOutput.innerText = secretNumber;
      localStorage.setItem("_01_highscore", score);

      document.body.classList.add("bg-green");
    }

    prevValue = currValue;
    return;
  }

  if (
    secretNumber - currValue < secretNumber - prevValue &&
    currValue != secretNumber
  ) {
    gameInfo.innerText = "Getting Closer!";
    decreaseScore();
  } else if (
    secretNumber - currValue > secretNumber - prevValue &&
    currValue != secretNumber
  ) {
    gameInfo.innerText = "Cold";
    decreaseScore();
  } else if (currValue == secretNumber) {
    gameInfo.innerText = "Correct Number!";
    numOutput.innerText = secretNumber;
    localStorage.setItem("_01_highscore", score);

    document.body.classList.add("bg-green");
  }

  prevValue = currValue;
}

function decreaseScore() {
  gameScore.innerText = --score;
}
