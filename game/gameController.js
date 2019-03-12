export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.resetHandler = () => {
      this.startNewGame();
    };

    this.boardHandler = ({target: button}) => {
      let index = button.getAttribute('data-index');
      if (!index) return;

      let [row, column] = index.split(':');

      let stepValue = this.model.makeStep(row, column);

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
    this.model.resetData();
    this.view.resetView();
    this.view.renderInfo(this.model.isFirstStep, this.model.xIsNext);
  }
}
