import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL,
  CELL_SIZE
} from "./constants.js";
import { drawGame, updateView } from "./view.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = [];
    for(let i=0;i<this.width;i++){
      let state = [];
      for(let j=0;j<this.height;j++){
        state.push(CELL_STATES.NONE);
      }
      this.state.push(state);
    }
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  // Modifie la taille de la grille
  updateGridSize(canvasX, canvasY) {      
    if(this.resizable(canvasX, canvasY)){
      this.stop();
      this.width = canvasX;
      this.height = canvasY;
      updateView(Number(canvasX), Number(canvasY));
      this.init();
    }
  }

  // Fonction appelée pour mettre à jour une cellule
  updateCell(canvasX, canvasY){
    let w = this.width*(CELL_SIZE + 1);
    let h = this.height*(CELL_SIZE + 1);

    let x = Math.floor((canvasX/w)*this.width);
    let y = Math.floor((canvasY/h)*this.height);

    switch (this.state[x][y]) {
      case CELL_STATES.NONE:
        this.state[x][y] = CELL_STATES.ALIVE;
        break;
      case CELL_STATES.ALIVE:
        this.state[x][y] = CELL_STATES.DEAD;
        break;
      case CELL_STATES.DEAD:
        this.state[x][y] = CELL_STATES.NONE;
        break;
      default:
        break;
    }

    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      const updateList = [];
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
              if(this.isCellAlive(i, j)){
                if(nbAlive < 2 || nbAlive > 3){
                  updateList.push([j, i, CELL_STATES.DEAD]);
                }
              } 
              if(nbAlive == 3){
                updateList.push([j, i, CELL_STATES.ALIVE]);
              }
          }
        }

        updateList.forEach(e => {
          this.state[e[0]][e[1]] = e[2];
        });

        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    // TODO
    this.init();
    console.log("reset");
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.width &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  // Renvoie le nombre de voisins vivants autour de x,y
  aliveNeighbours(x, y) {
    let number = 0;

    for(let i=x-1;i<=x+1;i++){

      for(let j=y-1;j<=y+1;j++){

        if(this.isCellAlive(i, j)){
          //console.log("is alive: " + " i:" + i + " j:" + j);
          if(!((i == x) && (j == y))){
            number++;
          }
        }
      
      }
      
    }
    return number;
  }

  // Renvoie vrai si l'on peut redimensionner la grille , faux sinon
  // On peut redimensionner lorsqu'aucune cellule n'est impactée par le changement
  resizable(x, y){
    for(let i=0;i<this.width;i++){
      for(let j=0;j<this.height;j++){
        if(this.state[i][j] != CELL_STATES.NONE){
            if(i >= x || j >= y) return false;
        }
      }
    }
    return true;
  }

  updated() {
    drawGame(this);
  }
}
