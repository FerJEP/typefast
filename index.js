// DOM elements

const $targetWord = document.getElementById('targetWord')
const $timeleft = document.getElementById('timeleft')
const $score = document.getElementById('score')
const $inputText = document.getElementById('inputText')
const $checkBtn = document.getElementById('checkBtn')

// on screen
let targetWord = null
let score = 0
let timeleft = 5

let interval = null

//Init

window.onload = async () => {
  getWord()

  // Enabling the input after the first words fetch
  $inputText.removeAttribute('disabled')

  // Event Listeners

  $inputText.addEventListener('keypress', e => {
    if (e.key === 'Enter') checkWord()
  })

  $checkBtn.addEventListener('click', () => checkWord())
}

//Funtions

function checkWord() {
  const wordTyped = $inputText.value.trim().toLowerCase()

  if (wordTyped === targetWord) {
    if (!interval) startInterval()
    $inputText.value = ''
    score++
    timeleft = 5
    getWord()
  } else if (interval) {
    $inputText.value = ''
    gameOver()
  }
}

function getWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  targetWord = words[randomIndex]
  updateScreen()
}

function startInterval() {
  interval = setInterval(() => {
    if (!interval) interval = true
    if (timeleft === 0) return gameOver()
    timeleft--
    updateScreen()
  }, 1000)
}

function gameOver() {
  clearInterval(interval)
  $inputText.value = ''
  timeleft = 5
  score = 0
  interval = false
  getWord()
}

function updateScreen() {
  $targetWord.textContent = targetWord
  $timeleft.textContent = timeleft
  $score.textContent = score
  console.log('SCREEN UPDATED')
}
