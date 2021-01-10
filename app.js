const scoreDisplay = document.getElementById('score')
const startButton = document.getElementById('start-button')
const width = 28
let score = 0
let gameOverId
let checkWinId
let leftId
let rightId
let upId
let downId
let dotsLeft
let pelletsLeft
let pelletEaten = 0
let pacmanLifes = 3

let ghosts = []

let times = 12 * 2

let gameStarted = false
let pacmanCurrentIndex
const pacmanDelay = 150
const ghostDelay = pacmanDelay
const grid = document.querySelector('.grid')

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 5, 5, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// 5 - ghost-lair-door

const squares = []

let colors = []

function prepareGame() {
  //only one time
  startButton.addEventListener('click', startGame)
  gameStarted = false
  score = 0
  dotsLeft = 0
  pelletsLeft = 0
  pelletEaten = 0
  colors = [
    'White',
    'Silver',
    'Gray',
    'Black',
    'Red',
    'Maroon',
    'Yellow',
    'Olive',
    'Lime',
    'Green',
    'Aqua',
    'Teal',
    'Blue',
    'Navy',
    'Fuchsia',
    'Purple'
  ]

  createBoard()

  dotsLeft = layout.filter(item => item === 0).length
  pelletsLeft = layout.filter(item => item === 3).length

  //create Characters
  //draw pacman onto the board


}

prepareGame()

function startGame() {
  //everytime start is pressed
  if (gameStarted) return
  clearBoard()
  refreshLifes()
  updateScore()

  times = 12 * 2
  pacmanCurrentIndex = 490
  //squares[pacmanCurrentIndex].style.transform = 'none'
  ghosts = [
    new Ghost('blinky', 348, ghostDelay),
    new Ghost('pinky', 376, ghostDelay),
    new Ghost('inky', 351, ghostDelay),
    new Ghost('clyde', 379, ghostDelay)
  ]

  //draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })
  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
  goRight()
  checkWinId = setInterval(checkForWin, 50)
  gameOverId = setInterval(checkForGameOver, 50)

  gameStarted = true

  squares[pacmanCurrentIndex].classList.add('pac-man')
  squares[pacmanCurrentIndex].classList.add('pac-man-right')

}

function clearBoard() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {

      if (squares[i].classList.contains('pac-man')) {
        removePacman()
      }

      if (squares[i].classList.contains('ghost')) {
        squares[i].classList.remove('ghost')
      }
      squares[i].classList.remove('blinky')
      squares[i].classList.remove('pinky')
      squares[i].classList.remove('inky')
      squares[i].classList.remove('clyde')
    }
  }
}
//create your board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    //add layout to the board
    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot')
      squares[i].innerHTML = '.'
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    } else if (layout[i] === 5) {
      squares[i].classList.add('ghost-lair-door')
      squares[i].innerHTML = '.'
    }
  }
}

function refreshLifes() {
  const lifes = document.querySelector('.lifes')
  lifes.textContent = ''
  for (let i = 0; i < pacmanLifes; i++) {
    const life = document.createElement('div')
    life.classList.add('life')
    lifes.appendChild(life)
  }
}

function flashingBoard() {
  let c = colors[Math.floor(Math.random() * colors.length)]
  document.body.style.background = c;
}

function removePacman() {
  squares[pacmanCurrentIndex].classList.remove('pac-man')
  squares[pacmanCurrentIndex].classList.remove('pac-man-right')
  squares[pacmanCurrentIndex].classList.remove('pac-man-left')
  squares[pacmanCurrentIndex].classList.remove('pac-man-down')
  squares[pacmanCurrentIndex].classList.remove('pac-man-up')

}

function clearPacmanMoves() {
  clearInterval(rightId)
  clearInterval(leftId)
  clearInterval(downId)
  clearInterval(upId)
  rightId = 0
  leftId = 0
  downId = 0
  upId = 0
}

function goLeft() {
  if (leftId) return

  squares[pacmanCurrentIndex].classList.add('pac-man-left')
  clearPacmanMoves()
  leftId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex - 1].classList.contains('wall')
      //||      squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
    ) {
      clearInterval(leftId)
    } else {
      removePacman()
      pacmanCurrentIndex -= 1
      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-left')
  }, pacmanDelay)
}

function goRight() {
  if (rightId) return

  squares[pacmanCurrentIndex].classList.add('pac-man-right')
  clearPacmanMoves()
  rightId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex + 1].classList.contains('wall')
      //||
      //squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
    ) {
      clearInterval(rightId)
    } else {
      removePacman()
      pacmanCurrentIndex += 1
      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364
      }
      pacDotEaten()
      powerPelletEaten()
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    squares[pacmanCurrentIndex].classList.add('pac-man-right')
  }, pacmanDelay)
}



function goUp() {
  if (upId) return

  squares[pacmanCurrentIndex].classList.add('pac-man-up')
  clearPacmanMoves()
  upId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex - width].classList.contains('wall')
      //||
      //squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
    ) {
      clearInterval(upId)
    } else {
      removePacman()
      pacmanCurrentIndex -= width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-up')
      pacDotEaten()
      powerPelletEaten()
    }
  }, pacmanDelay)
}

function goDown() {
  if (downId) return

  squares[pacmanCurrentIndex].classList.add('pac-man-down')
  clearPacmanMoves()
  downId = setInterval(function () {
    if (
      squares[pacmanCurrentIndex + width].classList.contains('wall')
      //||
      //squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
    ) {
      clearInterval(downId)
    } else {
      removePacman()
      pacmanCurrentIndex += width
      squares[pacmanCurrentIndex].classList.add('pac-man')
      squares[pacmanCurrentIndex].classList.add('pac-man-down')
      pacDotEaten()
      powerPelletEaten()
    }
  }, pacmanDelay)
}

//move pacman
function movePacman(e) {
  //console.log('move '+e.keyCode)
  switch (e.keyCode) {
    case 37:
      goLeft()
      break
    case 38:
      goUp()
      break
    case 39:
      goRight()
      break
    case 40:
      goDown()
      break
  }
}

function moveGhostByPlayer(e) {
  //console.log('move '+e.keyCode)
  switch (e.keyCode) {
    case 37:
      goLeft()
      break
    case 38:
      goUp()
      break
    case 39:
      goRight()
      break
    case 40:
      goDown()
      break
  }
}


function updateScore() {
  scoreDisplay.innerHTML = score
}

// what happens when you eat a pac-dot
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    dotsLeft--
    updateScore()
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    squares[pacmanCurrentIndex].innerHTML = ''
  }
}

//what happens when you eat a power-pellet
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    pelletEaten++
    score += 10
    pelletsLeft--
    ghosts.forEach(ghost => {
      ghost.isScared = true
      ghost.speed = ghostDelay * 3
      clearInterval(ghost.timerId)
    })
    ghosts.forEach(ghost => moveGhost(ghost))
    setTimeout(unScareGhosts, 10000)
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
  }
}

//make the ghosts stop flashing
function unScareGhosts() {
  pelletEaten--
  if (pelletEaten > 0) return

  ghosts.forEach(ghost => {
    ghost.isScared = false
    ghost.speed = ghostDelay
    clearInterval(ghost.timerId)
  })

  ghosts.forEach(ghost => moveGhost(ghost))
}

//create ghosts using Constructors
class Ghost {
  constructor(className, startIndex, speed, mode='robot') {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
    this.mode = mode  //robot or player  
  }
}




function moveGhost(ghost) {
  const directions = [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function () {
    //if the next square your ghost is going to go to does not have a ghost and does not have a wall
    if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall')) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
      //move into that space
      ghost.currentIndex += direction
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction to go in
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is currently scared and pacman is on it
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      ghost.isScared = false
      score += 100
      updateScore()
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
  }, ghost.speed)
}


function killPacman() {
  gameStarted = false
  setTimeout(() => {
    if (times <= 0) {
      squares[pacmanCurrentIndex].style.transform = 'none'
      pacmanLifes--

      if (pacmanLifes == 0) {
        scoreDisplay.innerHTML = 'GAME OVER'
        let btn = document.getElementById('start-button')
        btn.style.display = 'none'
      }
      return
    }

    //console.log('rotates '+ times)
    squares[pacmanCurrentIndex].style.transform = 'rotate(' + -30 * times + 'deg)'
    //squares[pacmanCurrentIndex].style.transform  = 'scale('+ 0.5  +')'
    times--
    killPacman()
  }
    , 100)
}

//check for a game over
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    document.removeEventListener('keyup', movePacman)
    clearPacmanMoves()

    killPacman()


    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    scoreDisplay.innerHTML = 'YOU LOSE!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
  }
}

//check for a win 
function checkForWin() {
  if (pelletsLeft === 0 && dotsLeft === 0) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    clearPacmanMoves()
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU WIN!'
    clearInterval(gameOverId)
    clearInterval(checkWinId)
    setInterval(flashingBoard, 300)
    gameStarted = false
  } 
}


