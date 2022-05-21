import { startButton, stopButton, resetButton, submitButton, canvas, tailleGrilleX, tailleGrilleY } from "./view.js";

export const controller = model => {
  // Traite les clics sur le canvas (la grille)
  canvas.onclick = (event) => { 
    let bound = canvas.getBoundingClientRect();

    let x = event.clientX - bound.left - canvas.clientLeft;
    let y = event.clientY - bound.top - canvas.clientTop;

    model.updateCell(x, y);
  };
  startButton.onclick = () => { model.run(); };
  stopButton.onclick = () => { model.stop(); };
  resetButton.onclick = () => { model.reset(); };
  submitButton.onclick = () => { 
    let canvasX = tailleGrilleX.value;
    let canvasY = tailleGrilleY.value;
    // On vérifie que des valeurs sont passées en entrée
    if(canvasX !== '' && canvasY !== ''){
        // On redimensionne la grille
        model.updateGridSize(canvasX, canvasY);
    }
  }
};
