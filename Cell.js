export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.neighbours = [];
  }

  draw(ctx, size, col = "rgb(255,255,255)") {
    ctx.fillStyle = col;
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

    // //corner neighbours
    // if (grid[this.x - 1]) {
    //   if (grid[this.x - 1][this.y - 1])
    //     this.neighbours.push(grid[this.x - 1][this.y - 1]);
    // }
    // if (grid[this.x - 1]) {
    //   if (grid[this.x - 1][this.y + 1])
    //     this.neighbours.push(grid[this.x - 1][this.y + 1]);
    // }

    // if (grid[this.x + 1]) {
    //   if (grid[this.x + 1][this.y - 1])
    //     this.neighbours.push(grid[this.x + 1][this.y - 1]);
    // }
    // if (grid[this.x + 1]) {
    //   if (grid[this.x + 1][this.y + 1])
    //     this.neighbours.push(grid[this.x + 1][this.y + 1]);
    // }
  }
}
