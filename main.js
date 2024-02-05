import { pieces } from "./pieces"
import { getRandomHexColor } from "./randomColor"

const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)
let color = getRandomHexColor()
let board = createBoard(BOARD_HEIGHT, BOARD_WIDTH)
const piece = {
  shape: getRandomPiece(),
  position: { x: 1 , y:0 }
}

function main() {
  draw()
  window.requestAnimationFrame(main)
}

function createBoard (rows, cols) {
  return Array.from({ length: rows }, () => new Array(cols).fill(0))
}

function moveDown () {
  const { position } = piece
  position.y++
  if(checkCollition()){
    position.y--
    addPieceToBoard()
    return
  }
}

function moveRight() {
  const { position } = piece
  position.x++
  if(checkCollition()) {
    position.x--
    return
  }
}

function moveLeft() {
  const { position } = piece
  position.x--
  if(checkCollition()) {
    position.x++
    return
  }
}

function addPieceToBoard() {
  const { shape, position } = piece
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value){
        if(position.y == 0) {
          board = createBoard(BOARD_HEIGHT, BOARD_WIDTH)
          context.clearRect(0, 0, canvas.width, canvas.height)
          return
        } else {
          board[position.y + y][position.x + x] = 1
        }
      }
    }) 
  })
  piece.shape = getRandomPiece()
  checkCompleteRows()
  position.y = 0
  position.x = 1
}

function checkCompleteRows() {
  board.forEach((row, y) => {
    if(row.every((v) => v == 1)) {
      board.splice(y, 1)
      board.unshift(Array(BOARD_WIDTH).fill(0));
    }
  })
}

function checkCollition () { 
  const { shape, position } = piece
  let collition = false
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value != 0 && board[position.y + y]?.[position.x + x] != 0){  
        collition = true
      }
    }) 
  })

  return collition
}

function getRandomPiece () {
  const N = pieces.length - 1
  const pieceIndex = Math.floor(Math.random() * (N + 1));
  return pieces[pieceIndex]
}


function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  board.forEach((row, i) => {
    row.forEach((value, x) => {
      if(value) {
        context.fillStyle = color
        context.fillRect(x, i, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value) {
        context.fillStyle = color
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })
}

document.addEventListener('keydown', (event) => {
  if(event.key == 'ArrowRight') {
    moveRight()
  }

  if(event.key == 'ArrowLeft') {
    moveLeft()
  }

  if(event.key == 'ArrowDown') {
    moveDown()
  }
})

setInterval(moveDown, 1000);
main()
