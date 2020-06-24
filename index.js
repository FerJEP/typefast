// DOM elements

const DOM = {
  targetWord: document.getElementById('targetWord'),
  targetWrapper: document.getElementsByClassName('targetWord')[0],
  timeleft: document.getElementById('timeleft'),
  score: document.getElementById('score'),
  typingInput: document.getElementById('typingInput'),
  checkBtn: document.getElementById('checkBtn'),
}

// on screen
let targetWord = undefined
let score = 0
let timeleft = 5

let words = []
let isPlaying = false
let timeInterval = undefined

//Init

window.onload = async () => {
  await fetchWords()

  // Enabling the input after the first words fetch
  DOM.typingInput.removeAttribute('disabled')

  // Event Listeners

  DOM.typingInput.addEventListener('keypress', e => {
    if (e.keyCode === 13) return checkWord()
  })

  DOM.checkBtn.addEventListener('click', () => checkWord())
}

//Funtions

function checkWord() {
  const typedWord = DOM.typingInput.value.trim().toLowerCase()

  if (typedWord === targetWord) {
    if (!isPlaying) startInterval()
    DOM.typingInput.value = ''
    score++
    timeleft = 5
    getTargetWord()
  } else if (isPlaying) {
    DOM.typingInput.value = ''
    gameOver()
  }
}

function fetchWords() {
  return new Promise((resolve, reject) => {
    fetch('https://random-word-api.herokuapp.com/word?number=10')
      .then(res => res.json())
      .then(apiWords => {
        words = [...words, ...apiWords]
        // First time it fetches the targetWord will be empty
        if (!targetWord) getTargetWord()
        resolve()
      })
      .catch(err => reject(err))
  })
}

function getTargetWord() {
  targetWord = words.shift().toLowerCase()
  updateScreen()
  if (words.length < 5) fetchWords()
}

function startInterval() {
  timeInterval = setInterval(() => {
    if (!isPlaying) isPlaying = true
    if (timeleft === 0) return gameOver()
    timeleft--
    updateScreen()
  }, 1000)
}

function gameOver() {
  clearInterval(timeInterval)
  DOM.typingInput.value = ''
  timeleft = 5
  score = 0
  isPlaying = false
  getTargetWord()
}

function updateScreen() {
  DOM.targetWord.innerHTML = targetWord
  DOM.timeleft.innerHTML = timeleft
  DOM.score.innerHTML = score
  console.log('SCREEN UPDATED')
}
