import { startButton, stopButton, resetButton, submitButton, tailleGrilleX, tailleGrilleY } from "./view.js";

export const controller = model => {
  startButton.onclick = () => { model.run(); };
  stopButton.onclick = () => { model.stop(); };
  resetButton.onclick = () => { model.reset(); };
  submitButton.onclick = () => { 
    let canvasX = tailleGrilleX.value;
    let canvasY = tailleGrilleY.value;
    if(canvasX !== '' && canvasY !== ''){
      model.updateGridSize(canvasX, canvasY);
    }
  }
};
