function deleteFromArray(elem, arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));

  return d;
}

export default function draw(openSet, closedSet, ctx, end, cellSize) {
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
      console.log("Done!");

      return;
    }
    deleteFromArray(current, openSet);
    closedSet.push(current);

    for (let i = 0; i < current.neighbours.length; i++) {
      let neighbour = current.neighbours[i];

      if (!closedSet.includes(neighbour)) {
        let tempG = current.g + 1;

        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
          }
        } else {
          neighbour.g = tempG;
          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          openSet.push(neighbour);
        }
      }
    }

    for (let i = 0; i < openSet.length; i++) {
      openSet[i].draw(ctx, cellSize, "lime");
    }

    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].draw(ctx, cellSize, "red");
    }
  } else {
    console.log("Starting Point Is Required");
  }
}
