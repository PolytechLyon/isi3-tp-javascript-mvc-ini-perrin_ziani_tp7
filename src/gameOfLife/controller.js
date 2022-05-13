import { startButton, stopButton, resetButton, submitButton, tailleGrille } from "./view.js";

export const controller = model => {
  startButton.onclick = () => { model.run(); };
  stopButton.onclick = () => { model.stop(); };
  resetButton.onclick = () => { model.reset(); };
  submitButton.onclick = () => { 
    model.updateGridSize(tailleGrille.value);
  }
};
