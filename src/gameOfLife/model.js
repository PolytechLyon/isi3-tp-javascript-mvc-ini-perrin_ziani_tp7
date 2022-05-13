import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
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
      let stateX = [];
      for(let j=0;j<this.height;j++){
        stateX.push(CELL_STATES.NONE);
      }
      this.state.push(stateX);
    }
    // this.state = new Array(this.height).fill(CELL_STATES.NONE).map(() => new Array(this.width).fill(CELL_STATES.NONE));
    // for(let i=0;i<this.width;i++){
    //   for(let j=0;j<this.height;j++){
    //     console.log("state : " + this.state[i][j]);
    //   }
    // }
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  updateGridSize(gridValue) {
    this.stop();
    this.width = gridValue;
    this.height = gridValue;
    updateView(this.width, this.height);
    this.init();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      const updateList = [];
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            // TODO implement Game of life logic
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

  updated() {
    drawGame(this);
  }
}
