export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isGameStarted = false;

    this.resetHandler = () => {
      this.startNewGame();
    };

    this.boardHandler = ({target: button}) => {
      let index = button.getAttribute('data-index');
      if (!index) return;

      let [row, column] = index.split(':');

      let stepValue = this.model.makeStep(parseInt(row), parseInt(column));

      if (!stepValue) return;

      this.view.renderPressedSquare(row, column, stepValue);
      this.view.renderInfo(this.model.isFirstStep, this.model.xIsNext);

      let winnerResult = this.model.checkWinner();

      if (!winnerResult) return;

      this.view.renderWinner(winnerResult);
    };
  }

  init() {
    this.startNewGame();
    this.initListeners();
  }

  initListeners() {
    this.view.DOMElements.restartButton.addEventListener('click', this.resetHandler);
    this.view.DOMElements.board.addEventListener('click', this.boardHandler);
  }

  startNewGame() {
    if (!this.isGameStarted) {
      this.isGameStarted = true;
      this.view.renderGameBoard(this.model.size);
    }
    this.model.resetData();
    this.view.resetView();
    this.view.renderInfo(this.model.isFirstStep, this.model.xIsNext);
  }
}
