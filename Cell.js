export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;

    if (Math.random() < 0) this.wall = true;
  }

  draw(ctx, size, col = "rgb(255,255,255)") {
    ctx.fillStyle = col;
    if (this.wall) ctx.fillStyle = "rgb(10,10,10)";

    ctx.fillRect(this.x * size, this.y * size, size - 1, size - 1);
  }

  //TODO Needs to be optimised
  addNeighbours(grid) {
    if (grid[this.x + 1]) {
      this.neighbours.push(grid[this.x + 1][this.y]);
    }

    if (grid[this.x - 1]) {
      this.neighbours.push(grid[this.x - 1][this.y]);
    }

    if (grid[this.x][this.y + 1]) {
      this.neighbours.push(grid[this.x][this.y + 1]);
    }
    if (grid[this.x][this.y - 1]) {
      this.neighbours.push(grid[this.x][this.y - 1]);
    }

    //   //corner neighbours
    //   if (grid[this.x - 1]) {
    //     if (grid[this.x - 1][this.y - 1])
    //       this.neighbours.push(grid[this.x - 1][this.y - 1]);
    //   }
    //   if (grid[this.x - 1]) {
    //     if (grid[this.x - 1][this.y + 1])
    //       this.neighbours.push(grid[this.x - 1][this.y + 1]);
    //   }

    //   if (grid[this.x + 1]) {
    //     if (grid[this.x + 1][this.y - 1])
    //       this.neighbours.push(grid[this.x + 1][this.y - 1]);
    //   }
    //   if (grid[this.x + 1]) {
    //     if (grid[this.x + 1][this.y + 1])
    //       this.neighbours.push(grid[this.x + 1][this.y + 1]);
    //   }
  }
}
