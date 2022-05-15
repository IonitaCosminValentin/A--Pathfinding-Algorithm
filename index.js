import draw from "./draw.js";
import Cell from "./Cell.js";

let canvas = document.getElementById("screen");
let screenSize = 400;

canvas.width = screenSize;
canvas.height = screenSize;

let ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, screenSize, screenSize);

let grid = [];
let closedSet = [];
let openSet = [];

let cells = 5;
let cellSize = screenSize / cells;

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

let start = grid[0][0];
let end = grid[cells - 1][cells - 1];

openSet.push(start);

function gameLoop() {
  draw(openSet, closedSet, ctx, end, cellSize);

  window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
