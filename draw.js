import { changeState } from "./index.js";

function deleteFromArray(elem, arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}

export default function draw(openSet, closedSet, ctx, end, cellSize, start) {
  if (!start || !end) {
    changeState();
    return alert("Please Select Start and End Cells");
  }

  let path = [];

  if (openSet.length > 0) {
    let bestIndex = 0;

    //TODO Needs to be optimised
    //Check for the best cell
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestIndex].f) {
        bestIndex = i;
      }
    }

    let current = openSet[bestIndex];

    if (current === end) {
      let h1 = document.querySelector("#done");
      h1.textContent = "Done!";
      changeState();
    }

    //TODO Fix this?
    deleteFromArray(current, openSet);

    closedSet.push(current);

    for (let i = 0; i < current.neighbours.length; i++) {
      let neighbour = current.neighbours[i];

      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        let tempG = current.g + 1;

        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            break;
          }
        } else {
          neighbour.g = tempG;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;

          neighbour.previous = current;
          openSet.push(neighbour);
        }
      }
    }

    let temp = current;
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }

    for (let i = 0; i < openSet.length; i++) {
      openSet[i].draw(ctx, cellSize, "lime");
    }

    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].draw(ctx, cellSize, "red");
    }

    for (let i = 0; i < path.length; i++) {
      path[i].draw(ctx, cellSize, "blue");
    }

    start.draw(ctx, cellSize, "yellow");
    end.draw(ctx, cellSize, "purple");
  } else {
    alert("No Available Route");
    changeState();
  }
}
