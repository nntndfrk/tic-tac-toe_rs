import { GameModel } from './game/gameModel.js';
import { GameView } from './game/gameView.js';
import { GameController } from './game/gameController.js';
import { utils } from './game/utils.js';

const DOMElements = {
  gameInfo: document.querySelector("#game-info"),
  board: document.querySelector("#game-board"),
  restartButton: document.querySelector("#game-restart"),
  sizeSelect: document.querySelector('#size'),
  // line: document.querySelector("#line")
};

// const size = ;

const gameModel = new GameModel(utils);
const gameView = new GameView(DOMElements);

const gameController = new GameController(gameModel, gameView);

gameController.init();

// window.onmousemove = function (e) {
//   console.log(e.target.offsetLeft);
// };
