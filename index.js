import draw from "./draw.js";
import Cell from "./Cell.js";

export function changeState() {
  isRunning = !isRunning;
  return isRunning;
}

export function reset() {
  initialization();
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

function clientInput(e) {
  let posX = Math.floor(e.clientX / cellSize);
  let posY = Math.floor(e.clientY / cellSize);

  console.log(start, end);

  if (!start) {
    start = grid[posX][posY];
    start.wall = false;
    openSet.push(start);
    start.draw(ctx, cellSize, "orange");
    return;
  } else if (!end) {
    end = grid[posX][posY];
    end.wall = false;
    end.draw(ctx, cellSize, "purple");
    return;
  } else {
    let wall = grid[posX][posY];
    wall.wall = true;
    wall.draw(ctx, cellSize);
    canvas.removeEventListener("click", () =>
      console.log("event listner gone")
    );
  }
}

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
  start = null;
  end = null;
  grid = [];
  openSet = [];
  closedSet = [];

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

  //Calculating the neighbours
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      grid[x][y].addNeighbours(grid);
    }
  }

  canvas.addEventListener("click", (e) => {
    clientInput(e);
  });
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
