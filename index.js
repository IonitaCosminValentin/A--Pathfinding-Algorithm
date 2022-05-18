import draw from "./draw.js";
import Cell from "./Cell.js";

let canvas = document.getElementById("screen");
let screenSize = 700;

canvas.width = screenSize;
canvas.height = screenSize;

let ctx = canvas.getContext("2d");

let isRunning = false;

let grid = [];
let closedSet = [];
let openSet = [];

let cells = 10;
let cellSize;
let start;
let end;

let maxSpeed = 5;
let speed = 0;

function initialization() {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, screenSize, screenSize);
  ctx.fillRect(0, 0, screenSize, screenSize);

  cellSize = screenSize / cells;
  //fill the grid
  for (let x = 0; x < cells; x++) {
    grid[x] = [];
    for (let y = 0; y < cells; y++) {
      grid[x][y] = new Cell(x, y);
      grid[x][y].draw(ctx, cellSize);
    }
  }

  //? Needs some love
  //Calculating the neighbours
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      grid[x][y].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  end = grid[cells - 1][cells - 1];

  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

export function changeState() {
  isRunning = !isRunning;
  return isRunning;
}

export function reset() {
  ctx.fillStyle = "black";

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].draw(ctx, cellSize);
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].draw(ctx, cellSize);
  }

  openSet = [];
  closedSet = [];
  openSet.push(start);
}

export function reSize(size) {
  cells = size;
  initialization();
  reset();
}

export function setSpeed(n = 5) {
  speed = 0;
  maxSpeed = n;
}

initialization();
function gameLoop() {
  if (isRunning) {
    if (speed >= maxSpeed) {
      speed = 0;
      draw(openSet, closedSet, ctx, end, cellSize);
    } else speed++;
  }

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
