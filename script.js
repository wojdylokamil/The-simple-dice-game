'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceGIF = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, currentPlayer, playing;

const start = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceGIF.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnNew.classList.add('btn');
  document.getElementById(`won--0`).classList.add('hidden');
  document.getElementById(`won--1`).classList.add('hidden');
  btnNew.classList.remove('btn-after-win');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

};
start();

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};


btnRoll.addEventListener('click', function () {
  if (playing) {

    const dice = Math.trunc(Math.random() * 6) + 1;


    diceGIF.classList.remove('hidden');
    diceGIF.src = `dice-${dice}.gif`;

    if (dice !== 1) {

      currentScore += dice;
      document.getElementById(
        `current--${currentPlayer}`
      ).textContent = currentScore;
    } else {

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {

    scores[currentPlayer] += currentScore;

    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // Check ending game
    if (scores[currentPlayer] >= 1) {
      playing = false;
      diceGIF.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      document.getElementById(`won--${currentPlayer}`).classList.remove('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');

      currentScore0.textContent = 0;
      currentScore1.textContent = 0;
      btnNew.classList.add('btn-after-win');
    } else {

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', start);