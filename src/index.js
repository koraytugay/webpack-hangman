import HangmanGame from './hangmanService.js';

import '../resources/style.css';
import img0 from '../resources/images/0.png';
import img1 from '../resources/images/1.png';
import img2 from '../resources/images/2.png';
import img3 from '../resources/images/3.png';
import img4 from '../resources/images/4.png';
import img5 from '../resources/images/5.png';
import img6 from '../resources/images/6.png';
import img7 from '../resources/images/7.png';
import img8 from '../resources/images/8.png';
import img9 from '../resources/images/9.png';
import img10 from '../resources/images/10.png';
import imgYouWin from '../resources/images/youwin.png';

const allowedLetters = 'abcdefghijklmnopqrstuvwxyz';
let hangmanGame;

document.querySelector("#new-game-button").addEventListener('click', () => {
  hangmanGame = new HangmanGame();
  redraw();
});

document.addEventListener('keydown', function({key}) {
  if ([...allowedLetters].includes(key) && !hangmanGame.isNoMoreAttemptsRemaining()) {
    attemptAndRedraw(key);
  }
});

function attemptAndRedraw(letter) {
  hangmanGame.attempt(letter);
  redraw();
}

function createAttemptButton(letter) {
  const letterButton = document.createElement('button');
  letterButton.classList.add('guess-letter');
  Object.assign(letterButton, {
    textContent: letter,
    disabled: hangmanGame.allLettersGuessed() ||
        hangmanGame.isNoMoreAttemptsRemaining() || hangmanGame.attempts.includes(letter)
  });
  letterButton.addEventListener('click', () => attemptAndRedraw(letter));
  return letterButton;
}

function redraw() {
  // clear current divs
  document.querySelector("#letters-container").innerHTML = "";
  document.querySelector("#secret-word-container").innerHTML = "";

  // create attempt buttons
  [...allowedLetters].forEach(letter => {
    document.querySelector("#letters-container").appendChild(createAttemptButton(letter));
  });

  function getImageFor(unsuccessfulAttemptCount) {
    switch (unsuccessfulAttemptCount) {
      case 0:
        return img0;
      case 1:
        return img1;
      case 2:
        return img2;
      case 3:
        return img3;
      case 4:
        return img4;
      case 5:
        return img5;
      case 6:
        return img6;
      case 7:
        return img7;
      case 8:
        return img8;
      case 9:
        return img9;
      case 10:
        return img10;
    }
  }

  // put the correct image based on attempt count
  Object.assign(document.querySelector("#hangman-image"), {
    src: hangmanGame.allLettersGuessed() ? imgYouWin : getImageFor(hangmanGame.unsuccessfulAttemptCount)
  });

  // draw the current state of the secret word
  [...hangmanGame.secretWord].forEach(letter => {
        const targetLetterDiv = document.createElement('div');
        Object.assign(targetLetterDiv, {
          textContent: hangmanGame.attempts.includes(letter) || hangmanGame.isNoMoreAttemptsRemaining() ? letter : '_'
        });
        targetLetterDiv.classList.add('target-letter');
        document.querySelector("#secret-word-container").appendChild(targetLetterDiv);
      }
  );
}

hangmanGame = new HangmanGame();
redraw();
