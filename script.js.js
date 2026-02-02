const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const winPopup = document.getElementById("winPopup");

const cardsArray = ["🍎","🍌","🍇","🍓","🍎","🍌","🍇","🍓"];

const totalPairs = cardsArray.length / 2;
let matchedPairs = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;



function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}



function createBoard() {
  gameBoard.innerHTML = "";
  const shuffledCards = shuffleCards([...cardsArray]);

  shuffledCards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerText = "❓";
    card.style.color = "#ff4d6d";

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.symbol;
  this.style.color = "#fff";

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}


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

      firstCard.innerText = "❓";
      secondCard.innerText = "❓";

      firstCard.style.color = "#ff4d6d";
      secondCard.style.color = "#ff4d6d";

      resetTurn();
    }, 800);
  }
}


function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}


function checkWin() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      showWinMessage();
    }, 300);
  }
}


function showWinMessage() {
 if (!winPopup){
    console.error("Win popup element not found")
    return;
 }
 winPopup.style.display = "flex";
  document.body.classList.add("celebrate");
}


function restartGame() {
  matchedPairs = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  document.body.classList.remove("celebrate");

  createBoard();
}


document.addEventListener("DOMContentLoaded", () => {
  restartGame();
});

restartBtn.addEventListener("click", restartGame);



