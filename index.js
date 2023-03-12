import draw from './draw.js'
import Cell from './Cell.js'

export function changeState () {
  if (closedSet.includes(end) && !isRunning) return
  isRunning = !isRunning
  return isRunning
}

export function reset () {
  document.getElementById('done').textContent = ''
  document.getElementById('start').textContent = 'Start'

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].draw(ctx, cellSize)
    openSet[i].previous = undefined
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].draw(ctx, cellSize)
    closedSet[i].previous = undefined
  }

  for (let i = 0; i < walls.length; i++) {
    walls[i].wall = false
    walls[i].draw(ctx, cellSize)
  }

  if (end) end.draw(ctx, cellSize)

  isRunning = false
  start = undefined
  end = undefined
  openSet = []
  closedSet = []
}

export function reSize (size) {
  cells = size
  initialization()
}

export function setSpeed (n) {
  speed = 0
  maxSpeed = n
}

export function clientInput (e) {
  let posX = Math.floor(e.offsetX / cellSize)
  let posY = Math.floor(e.offsetY / cellSize)

  let gridCell = grid[posX][posY]

  if (start) {
    if (end) {
      if (gridCell === end || gridCell === start || isRunning) return

      if (gridCell.wall) gridCell.wall = false
      else {
        gridCell.wall = true
        walls.push(gridCell)
      }

      gridCell.draw(ctx, cellSize)
    } else {
      if (gridCell === start) return
      end = gridCell
      end.draw(ctx, cellSize, 'purple')
    }
  } else {
    start = gridCell
    openSet.push(start)
    start.draw(ctx, cellSize, 'yellow')
  }
}

let canvas = document.getElementById('screen')
let screenSize = 700

canvas.width = screenSize
canvas.height = screenSize

let ctx = canvas.getContext('2d')

let isRunning = false

let grid = []
let closedSet = []
let openSet = []

let cells = 10
let cellSize
let start
let end

let walls = []

let maxSpeed = 0
let speed = 0

function initialization () {
  ctx.fillStyle = 'black'

  let h1 = document.getElementById('done')
  h1.textContent = ''

  isRunning = false
  start = undefined
  end = undefined
  openSet = []
  closedSet = []

  ctx.clearRect(0, 0, screenSize, screenSize)
  ctx.fillRect(0, 0, screenSize, screenSize)

  cellSize = screenSize / cells
  //fill the grid
  for (let x = 0; x < cells; x++) {
    grid[x] = []
    for (let y = 0; y < cells; y++) {
      grid[x][y] = new Cell(x, y)
      grid[x][y].draw(ctx, cellSize)
    }
  }

  //Calculating the neighbours
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      grid[x][y].addNeighbours(grid)
    }
  }
}

initialization()
function gameLoop () {
  if (isRunning) {
    if (speed >= maxSpeed) {
      speed = 0
      draw(openSet, closedSet, ctx, end, cellSize, start)
    } else speed++
  }

  window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)
