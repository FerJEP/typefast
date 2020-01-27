const game = function(wordAPI_error = false) {
  //Getting DOM elements
  const randomWord = document.querySelector(".random-word");

  if (wordAPI_error) {
    randomWord.innerText = "WORD API ERROR, please reload the page";
    return;
  }

  const inputWord = document.querySelector(".written-word");
  const checkCta = document.querySelector(".check");
  const timeLeft = document.querySelector(".timeleft-value");
  const score = document.querySelector(".score-value");

  const color = {
    gameover: "rgb(255, 187, 187)",
    match: "rgb(154, 240, 175)"
  };
  let time = 5;
  let timer = null;

  resetGame();

  //When ENTER KEY (13) is pressed down...

  inputWord.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      inputWord.value = inputWord.value.toLowerCase();
      checkInputWord();
    }
  });

  //---FUNCTIONS---

  //Checks if the word written match
  function checkInputWord() {
    //If the word written math
    if (inputWord.value == randomWord.innerText) {
      time = 5;
      timeLeft.innerHTML = time;
      clearInterval(timer);
      timer = setInterval(gameTimer, 1000);

      wordMatch();

      //Reset timer each time the word matchs
    } else if (score.innerText != 0) {
      //if word isnt "start"
      gameOver();
    }
  }

  //Resets all the values to default
  function resetGame() {
    //Setting "Start" on screen
    randomWord.innerHTML = word.get();
    score.innerHTML = 0;
    inputWord.value = "";
    time = 5;
    timeLeft.innerHTML = time;
  }

  function wordMatch() {
    //Score up
    score.innerText = Number(score.innerText) + 1;
    //Reset inputWord value to blank && green brackground
    inputWord.style.backgroundColor = color.match;
    setTimeout(() => {
      inputWord.style.backgroundColor = "#fff";
    }, 300);
    inputWord.value = "";

    //Set a new Word on the screen
    randomWord.innerText = word.get();
  }

  function gameOver() {
    //Clear timer
    clearInterval(timer);
    //Sets "YOU LOSE" in red
    randomWord.innerHTML = "YOU LOSE!";
    randomWord.style.color = color.gameover;

    //inputword red background
    inputWord.style.backgroundColor = color.gameover;

    //Resets all after 0.5s
    setTimeout(() => {
      randomWord.style.color = "#fff";
      inputWord.style.backgroundColor = "#fff";
      resetGame();
    }, 1000);
  }
  //Sets the timing

  function gameTimer() {
    timeLeft.innerHTML = time;
    if (time == 0) {
      gameOver();
      time = 5;
    } else {
      time--;
      timeLeft.innerHTML = time;
    }
  }
};
