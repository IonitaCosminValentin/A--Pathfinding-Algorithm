import { changeState, reset, reSize, setSpeed, clientInput } from "./index.js";

let canvas = document.getElementById("screen");
let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");
let cells = document.getElementById("select");
let speed = document.getElementById("number");

let size = [5, 10, 20, 50, 100];

for (let i = 0; i < size.length; i++) {
  let option = document.createElement("option");
  option.value = size[i];
  option.text = size[i];

  if (size[i] === 10) {
    option.setAttribute("selected", "selected");
  }

  cells.appendChild(option);
}

startButton.addEventListener("click", () => {
  let isRunning = changeState();

  if (!isRunning) {
    start.textContent = "Start";
  } else start.textContent = "Pause";
});

resetButton.addEventListener("click", reset);

cells.addEventListener("change", () => reSize(select.value));

speed.addEventListener("change", () => setSpeed(speed.value));

canvas.addEventListener("click", (e) => {
  clientInput(e);
});
