const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const winPopup = document.getElementById("winPopup");

const cardsArray = ["🍎","🍌","🍇","🍓","🍎","🍌","🍇","🍓"];

const totalPairs = cardsArray.length / 2;
let matchedPairs = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;


// Shuffle
function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}


// Create Board
function createBoard() {
  gameBoard.innerHTML = "";
  const shuffledCards = shuffleCards([...cardsArray]);

  shuffledCards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    //  UPDATED STRUCTURE (front + back)
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}


// Flip Card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}


// Check Match
function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedPairs++;
    resetTurn();
    checkWin();

  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetTurn();
    }, 800);
  }
}


// Reset Turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


// Win Check
function checkWin() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      showWinMessage();
    }, 300);
  }
}


// Show Win
function showWinMessage() {
  if (!winPopup) {
    console.error("Win popup element not found");
    return;
  }
  winPopup.style.display = "flex";
  document.body.classList.add("celebrate");
}


// Restart Game
function restartGame() {
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  document.body.classList.remove("celebrate");
  if (winPopup) winPopup.style.display = "none";

  createBoard();
}


// Init
document.addEventListener("DOMContentLoaded", () => {
  restartGame();
});

restartBtn.addEventListener("click", restartGame);
