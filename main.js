import { GameModel } from './game/gameModel.js';
import { GameView } from './game/gameView.js';
import { GameController } from './game/gameController.js';

const DOMElements = {
  gameInfo: document.querySelector("#game-info"),
  board: document.querySelector("#game-board"),
  restartButton: document.querySelector("#game-restart"),
  line: document.querySelector("#line")
};

const gameModel = new GameModel();
const gameView = new GameView(DOMElements);

const gameController = new GameController(gameModel, gameView);

gameController.init();
