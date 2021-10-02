// @ts-check
"use-strict";

const player = {
  name: "Nathan",
  chips: 200
}
let cards = [];
let sum = 0;
let isAlive = false;
let hasBlackJack = false;
const blackJack = 21;
const messageElement = document.querySelector("#message-element");
const cardsElement = document.querySelector("#cards-element");
const sumElement = document.querySelector("#sum-element");
const playerElement = document.querySelector("#player-element");

playerElement.textContent = `${player.name}: $${player.chips}`;

/**
 * Gets a random card when the game starts or a new random card when needed.
 * 
 * @returns a randomly selected card
 */
function getRandomCard() {
  let maxCardValue = 13;
  let jackOrQueenOrKing = 10;
  let firstAceValue = 1;
  let secondAceValue = 11;
  let card = Math.floor(Math.random() * maxCardValue) + 1;
  
  if (card > jackOrQueenOrKing) {
    return jackOrQueenOrKing;
  } else if (card === firstAceValue) {
      return secondAceValue;
  } else {
      return card;
  }
}

/**
 * Starts a new game when the corresponding start button is clicked on the webpage.
 * 
 * A new game can only be started once the current game (if applicable) is finished.
 */
function startGame() {
  if (isAlive === false && hasBlackJack === false && sum < blackJack) {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    continueGame();
  } // else, the game is over, doNothing();
}

/**
 * Handles the steps of the game until one of the possible outcomes occurs. 
 * 
 * There are three possible outcomes:
 * the user is still in the game and can draw a new card, 
 * the user has reached a Blackjack and wins the game, 
 * or the user loses and is out of the game.
 */
function continueGame() {
  cardsElement.textContent = "Cards: ";
  for (let index = 0; index < cards.length; index++) {
    cardsElement.textContent = `${cardsElement?.textContent} ${cards[index]}`;
  }

  sumElement.textContent = `Sum: ${sum}`;
  let message = "";
  if (sum <= blackJack - 1) {
    message = "Do you want to draw another card?";
  } else if (sum === blackJack) {
    hasBlackJack = true;
    message = "You've got Blackjack!";
  } else {
    isAlive = false;
    message = "You're out of the game!";
  }  
  messageElement.textContent = message;
}

/**
 * gets a new card when the corresponding new card button is clicked on the webpage.
 * 
 * The user can select a new card if they are still in the game or until a Blackjack
 * is reached. A new game must be started for the user to draw any more cards.
 */
function getNewCard() {
  if (isAlive === true && hasBlackJack === false && sum < blackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    continueGame();
  } // else, the game is over, doNothing();
}

/**
 * Resets the game back to the default state when the corresponding clear button is
 * clicked on the webpage.
 * 
 * This is the only way to reset the game besides a page refresh.
 */
function restoreGame() {
  hasBlackJack = false;
  isAlive = false;
  messageElement.textContent = "Want to play a round?"
  cards = [];
  cardsElement.textContent = "Cards: ";
  sum = 0;
  sumElement.textContent = "Sum: ";
}
