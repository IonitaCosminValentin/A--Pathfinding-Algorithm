import draw from "./draw.js";
import Cell from "./Cell.js";

export function changeState() {
  isRunning = !isRunning;
  return isRunning;
}

export function reset() {
  end.draw(ctx, cellSize);

  start = undefined;
  end = undefined;

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].draw(ctx, cellSize);
  }

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].draw(ctx, cellSize);
  }

  for (let i = 0; i < walls.length; i++) {
    walls[i].wall = false;
    walls[i].draw(ctx, cellSize);
  }

  openSet = [];
  closedSet = [];
}

export function reSize(size) {
  cells = size;
  initialization();
}

export function setSpeed(n = 5) {
  speed = 0;
  maxSpeed = n;
}

export function clientInput(e) {
  let posX = Math.floor(e.clientX / cellSize);
  let posY = Math.floor(e.clientY / cellSize);

  let gridCell = grid[posX][posY];

  if (start) {
    if (end) {
      if (gridCell === end || gridCell === start) return;

      let wall = gridCell;
      wall.wall = true;

      walls.push(wall);
      wall.draw(ctx, cellSize);
    } else {
      end = gridCell;
      end.draw(ctx, cellSize, "purple");
    }
  } else {
    start = gridCell;
    openSet.push(start);
    start.draw(ctx, cellSize, "orange");
  }
  console.log(start, end);
}

let canvas = document.getElementById("screen");
let screenSize = 700;

canvas.width = screenSize;
canvas.height = screenSize;

let ctx = canvas.getContext("2d");

let isRunning = false;
let walls = [];

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

  start = undefined;
  end = undefined;

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

  //Calculating the neighbours
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      grid[x][y].addNeighbours(grid);
    }
  }
}

initialization();
function gameLoop() {
  if (isRunning) {
    if (speed >= maxSpeed) {
      speed = 0;
      draw(openSet, closedSet, ctx, end, cellSize, start);
    } else speed++;
  }

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
