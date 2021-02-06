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
let cherryAdded
let cherryEaten

let ghosts = []


let times = 12 * 2

let gameStarted = false
let pacmanCurrentIndex
const pacmanDelay = 150
const ghostDelay = pacmanDelay
const grid = document.querySelector('.grid')

let isMobile = false

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('you are on mobile')
  isMobile = true
} else {
  console.log('you are on desktop')
}


var start = {};
var end = {};
var tracking = false;
var thresholdTime = 500;
var thresholdDistance = 100;
let o = document.getElementsByTagName('output')[0];

window.addEventListener('load', function () {


  gestureStart = function (e) {
    o.innerHTML = '';
    if (e.touches.length > 1) {
      tracking = false;
      return;
    } else {
      tracking = true;
      /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
      start.t = new Date().getTime();
      start.x = e.targetTouches[0].clientX;
      start.y = e.targetTouches[0].clientY;
    }
    console.dir(start);
  };

  gestureMove = function (e) {
    if (tracking) {
      e.preventDefault();
      end.x = e.targetTouches[0].clientX;
      end.y = e.targetTouches[0].clientY;
    }
  }
  gestureEnd = function (e) {
    tracking = false;
    var now = new Date().getTime();
    var deltaTime = now - start.t;
    var deltaX = end.x - start.x;
    var deltaY = end.y - start.y;
    /* work out what the movement was */
    if (deltaTime > thresholdTime) {
      /* gesture too slow */
      return;
    } else {
      if ((deltaX > thresholdDistance) && (Math.abs(deltaY) < thresholdDistance)) {
        o.innerHTML = 'derecha';
        goRight()
      } else if ((-deltaX > thresholdDistance) && (Math.abs(deltaY) < thresholdDistance)) {
        o.innerHTML = 'izquierda';
        goLeft()
      } else if ((deltaY > thresholdDistance) && (Math.abs(deltaX) < thresholdDistance)) {
        o.innerHTML = 'abajo';
        goDown()
      } else if ((-deltaY > thresholdDistance) && (Math.abs(deltaX) < thresholdDistance)) {
        o.innerHTML = 'arriba';
        goUp()
      } else {
        o.innerHTML = '';
      }
    }
  }

  o.addEventListener('touchstart', gestureStart, false);
  o.addEventListener('touchmove', gestureMove, false);
  o.addEventListener('touchend', gestureEnd, false);

}, false);


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
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 4, 1, 4, 4, 1, 4, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
    new Ghost('blinky', 348, ghostDelay, 'player1'),
    new Ghost('pinky', 376, ghostDelay),
    new Ghost('inky', 351, ghostDelay),
    new Ghost('clyde', 379, ghostDelay, 'player2')
  ]

  //draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
    ghost.ghostCommands = []
  })
  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
  document.addEventListener('keyup', moveGhostByPlayer1)
  document.addEventListener('keyup', moveGhostByPlayer2)

  goRight()
  checkWinId = setInterval(checkForWin, 50)
  gameOverId = setInterval(checkForGameOver, 50)

  gameStarted = true
  

  squares[pacmanCurrentIndex].classList.add('pac-man')
  squares[pacmanCurrentIndex].classList.add('pac-man-right')

}

function clearBoard() {

  clearTimeout(killPacmanTimeOutId)

  let g1 = getGhostPlayer1()
  if (g1 && g1.interValId) {
    clearInterval(g1.interValId)
  }

  let g2 = getGhostPlayer2()
  if (g2 && g2.interValId) {
    clearInterval(g2.interValId)
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {

      if (squares[i].classList.contains('pac-man')) {
        removePacman()
      }

      squares[i].classList.remove('ghost')
      squares[i].classList.remove('scared-ghost')
      squares[i].classList.remove('blinky')
      squares[i].classList.remove('pinky')
      squares[i].classList.remove('inky')
      squares[i].classList.remove('clyde')
      squares[i].style.transform = null
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

function addCherry() {

  squares[350].classList.add('cherry')
  cherryAdded = true

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
      if (pacmanCurrentIndex === 364) {
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
      if (pacmanCurrentIndex === 391) {
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

function moveGhostByPlayer1(e) {
  //console.log('move '+e.keyCode)
  let g = getGhostPlayer1()
  switch (e.key.toLowerCase()) {
    case 'a':
      moveGhostLeft(g)
      break
    case 'w':
      moveGhostUp(g)
      break
    case 'd':
      moveGhostRight(g)
      break
    case 's':
      moveGhostDown(g)
      break
  }
}

function moveGhostByPlayer2(e) {
  //console.log('move '+e.keyCode)
  let g = getGhostPlayer2()
  switch (e.key.toLowerCase()) {
    case 'j':
      moveGhostLeft(g)
      break
    case 'i':
      moveGhostUp(g)
      break
    case 'l':
      moveGhostRight(g)
      break
    case 'k':
      moveGhostDown(g)
      break
  }
}

function getGhostPlayer1() {
  return ghosts.find(ghost => {
    return ghost.mode === 'player1'
  })
}

function getGhostPlayer2() {
  return ghosts.find(ghost => {
    return ghost.mode === 'player2'
  })
}

function moveGhostPlayer(ghost, direction, index) {


  let g = ghost
  if (!g) return

  g.ghostCommands.push(direction)
  if (g.interValId) {
    clearInterval(g.interValId)
  }

  g.interValId = setInterval(() => {
    moveGhostOneStep(g, index)

    if (g.ghostCommands.length > 1) {
      g.ghostCommands.shift()
    }
  }, g.speed)

}

function moveGhostLeft(ghost) {
  moveGhostPlayer(ghost,'left', 0)
}

function moveGhostRight(ghost) {
  moveGhostPlayer(ghost,'right', 1)
}

function moveGhostUp(ghost) {
  moveGhostPlayer(ghost,'up', 3)
}

function moveGhostDown(ghost) {
  moveGhostPlayer(ghost, 'down', 2)
}


function moveGhostOneStep(ghost, _dir) {
  if (!ghost.mode.includes('player')) return
  if (!gameStarted) return



  const directions = [-1, +1, width, -width]

  function pickDirection(_dir) {
    return directions[_dir]
  }

  let direction = pickDirection(_dir)

  //console.log('ghost is at ', getCoordinates(ghost.currentIndex))


  /*
  if (Math.abs(deltaX) < Math.abs(deltaY) ) {
    console.log('Move on X')
  } else {
    console.log('Move on Y')
  }
  */


  //console.log('pacman is at ',getCoordinates(pacmanCurrentIndex))

  //if the next square your ghost is going to go to does not have a ghost and does not have a wall
  if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
    !squares[ghost.currentIndex + direction].classList.contains('wall')) {
    //remove the ghosts classes
    squares[ghost.currentIndex].classList.remove(ghost.className)
    squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
    //move into that space
    ghost.currentIndex += direction

    if (ghost.currentIndex === 391) {
      ghost.currentIndex = 365
    } else if (ghost.currentIndex === 364) {
      ghost.currentIndex = 390
    }

    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

  }

  //if the ghost is currently scared
  if (ghost.isScared) {
    squares[ghost.currentIndex].classList.add('scared-ghost')
  }

  //if the ghost is currently scared and pacman is on it
  if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
    ghost.currentIndex = ghost.startIndex
    clearInterval(ghost.interValId)
    ghost.isScared = false
    ghost.speed = ghostDelay
    score += 100
    updateScore()
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
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

  if (squares[pacmanCurrentIndex].classList.contains('cherry')) {
    scrore=score+50
    updateScore()
    squares[pacmanCurrentIndex].classList.remove('cherry')
    squares[pacmanCurrentIndex].innerHTML = ''
    cherryEaten = true
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
  constructor(className, startIndex, speed, mode = 'robot') {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
    this.mode = mode  //robot or player  
  }
}


//get the coordinates of pacman or blinky on the grid with X and Y axis
function getCoordinates(index) {
  return [index % width, Math.floor(index / width)]
}


function moveGhost(ghost) {
  if (ghost.mode.includes('player')) return


  const directions = [-1,  width, +1, -width]



  /*
  function pickDirection() {
    return directions[Math.floor(Math.random() * directions.length)]
  }
  */

  function pickDirection90deg(oldDirection) {
    //console.log('oldDirection ' +oldDirection)
    if (!oldDirection) {
      return directions[Math.floor(Math.random() * directions.length)]
    }

    let newDirection
    let i=0;
    do {
      i++
      newDirection = directions[Math.floor(Math.random() * directions.length)]
      //console.log('newDirection ' +newDirection)
    } while (Math.abs(newDirection)==Math.abs(oldDirection))
   // console.log('iteraciones ' + i)
    return newDirection
  }

  let direction = pickDirection90deg(ghost.currentDirection)
  ghost.currentDirection = direction
  ghost.timerId = setInterval(function () {


/*
    if (!squares[ghost.currentIndex + direction].classList.contains('wall')) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove('blinky')
      //move into that space

      const [blinkyX, blinkyY] = getCoordinates(ghost.currentIndex)
      const [pacManX, pacManY] = getCoordinates(pacmanCurrentIndex)
      const [blinkyNextX, blinkyNextY] = getCoordinates(ghost.currentIndex + direction)

      function isXCoordCloser() {
        if ((blinkyNextX - pacManX) > (blinkyX - pacManX)) {
          return true
        } else return false
      }

      function isYCoordCloser() {
        if ((blinkyNextY - pacManY) > (blinkyY - pacManY)) {
          return true
        } else return false
      }
      if (isXCoordCloser() || isYCoordCloser()) {
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add('blinky')

      } else {
        squares[ghost.currentIndex].classList.add('blinky')
        direction = pickDirection()
      }
      squares[ghost.currentIndex].classList.add('blinky')
    } else { 
      direction = pickDirection()
    }
    */
    
    //if the next square your ghost is going to go to does not have a ghost and does not have a wall
    if (  !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall')) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
      //move into that space
      ghost.currentIndex += direction

      if (ghost.currentIndex === 391) {
        ghost.currentIndex = 365
      } else if (ghost.currentIndex === 364) {
        ghost.currentIndex = 390
      }

      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction to go in
    } else {
      direction = pickDirection90deg(ghost.currentDirection)
      ghost.currentDirection = direction

      let ghostPosition = getCoordinates(ghost.currentIndex)
      let pacmanPosition = getCoordinates(pacmanCurrentIndex)
    
      let deltaX = ghostPosition[0] - pacmanPosition[0]
      let deltaY = ghostPosition[1] - pacmanPosition[1]
    
      console.log('Distance on X' + Math.abs(deltaX))
      console.log('Distance on Y' + Math.abs(deltaY))
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
      ghost.speed = ghostDelay
      score += 100
      updateScore()
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      clearInterval(ghost.timerId)
      moveGhost(ghost)
    }
  }, ghost.speed)
}

let killPacmanTimeOutId
function killPacman() {
  gameStarted = false
  killPacmanTimeOutId = setTimeout(() => {
    if (times <= 0) {
      squares[pacmanCurrentIndex].style.transform = 'none'
      pacmanLifes--

      if (pacmanLifes == 0) {
        scoreDisplay.innerHTML = 'GAME OVER - PRESS F5 TO PLAY AGAIN'
        let btn = document.getElementById('start-button')
        btn.style.display = 'none'
        ghosts.forEach(ghost => clearInterval(ghost.timerId))

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
  // if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
  //   !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {

  let pacmanIsDead = false
  ghosts.forEach(g => {
    if (g.currentIndex === pacmanCurrentIndex && !g.isScared) {
      pacmanIsDead = true
    }
  })

  if (pacmanIsDead) {

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
  if (pelletsLeft === 0 && dotsLeft === 0 && !cherryAdded) {
    addCherry() 
  }

  if (cherryEaten) {
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


