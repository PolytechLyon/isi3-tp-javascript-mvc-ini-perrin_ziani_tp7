import { GAME_SIZE, CELL_SIZE } from "./constants.js";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const drawCell = (x, y, value) => {
  context.fillStyle = value;
  context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
};

export const initView = () => {
  document.getElementById("game").appendChild(canvas);
  canvas.setAttribute("height", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
  canvas.setAttribute("width", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
};

export const updateView = (w, h) => {
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.setAttribute("height", h * CELL_SIZE + h - 1);
  canvas.setAttribute("width", w * CELL_SIZE + w - 1);
};

export const drawGame = model => {
  model.state.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      drawCell(rowIndex, columnIndex, value);
    });
  });
};

export const startButton = document.getElementById("start");
export const stopButton = document.getElementById("stop");
export const resetButton = document.getElementById("reset");
export const submitButton = document.getElementById("submit");
export const tailleGrille = document.getElementById("tailleGrille");

