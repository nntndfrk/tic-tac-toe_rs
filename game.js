/**
 * @typedef {{winner?: number, winnerLine?: Array}
 */
var WinnerResult;

export class Game {
  /**
   * Creates an instance of Game
   *
   * @constructor
   * @param {Element} board - listens to the mouse for the game move
   * @param {Element} gameInfo - output for summary information
   * @param {Element} restartButton - listens to the mouse to restart the game
   */
  constructor(board, gameInfo, restartButton) {
    this.board = board;
    this.gameInfo = gameInfo;
    this.restartButton = restartButton;
    this.xIsNext = null;
    this.squares = null;
    this.boardHandler = null;
    this.resetHandler = null;
    this.isGameFinished = null;

    this.winnerMatrix = [
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ],
    ];

    // init Game
    this.initListeners();
    this.startNewGame();
  }

  /**
   * Initialize event handlers.
   */
  initListeners() {

    /**
     * Playground event listener.
     * 
     * @param {Event}
     */
    this.boardHandler = ({
      target: button
    }) => {
      // Check if event target has a data-attribute data-index
      let index = button.getAttribute('data-index');
      if (!index) return;

      // Calculate pressed element row and column from data-index
      let [row, column] = index.split(':');

      // Setup game-step state
      if (this.squares[row][column] || this.isGameFinished === true) return;
      this.squares[row][column] = this.xIsNext ? 'X' : 'O';
      this.xIsNext = !this.xIsNext;

      // Render game step result view
      this.renderPressedSquare(row, column);
      this.renderGameInfo();

      // Check if there is a winner
      this.checkWinner();
    };

    this.resetHandler = () => {
      this.startNewGame();
    };
    this.board.addEventListener('click', this.boardHandler);
    this.restartButton.addEventListener('click', this.resetHandler);
  }

  /**
   * Initialize new game.
   */
  startNewGame() {
    this.squares = [
      Array(3).fill(null),
      Array(3).fill(null),
      Array(3).fill(null),
    ];
    this.xIsNext = true;
    this.isGameFinished = false;
    this.initAllSquares();
    this.clearEndLines();
    this.renderGameInfo();
  }

  /**
   * Clear view for all previous moves on the playground
   */
  initAllSquares() {
    [...this.board.children].forEach(boardRow => {
      [...boardRow.children].forEach(button => {
        button.innerText = '';
      })
    });
  }

  /**
   * Clear view for all previous result through-lines
   */
  clearEndLines() {
    document.querySelectorAll('.axis-line').forEach(line => {
      line.style.visibility = 'hidden';
    })
  }

  /**
   * Render actual game info
   */
  renderGameInfo() {
    this.gameInfo.innerHTML = this.xIsNext ?
      'Next player: <span class="player">X</span>' :
      'Next player: <span class="player">O</span>';
  }

  /**
   * Render game step on the playground
   *
   * @param {number} row Number of pressed element row
   * @param {number} column Number of pressed element column
   */
  renderPressedSquare(row, column) {
    let pressedSquare = document.querySelector(`[data-index='${row}:${column}']`);
    let pressedSquareValue = this.squares[row][column];
    if (pressedSquareValue === 'O') {
      pressedSquare.innerHTML = `<span class="blue"><i class="far fa-circle"></i></span>`;
    } else {
      pressedSquare.innerHTML = `<span class="yellow"><i class="fas fa-times"></i></span>`;
    }
  }

  /**
   * Calculate the winner according to the winner-matrix.
   *
   * @returns {(WinnerResult|Object)} Current winner result
   */
  calculateWinner() {

    //  Compare current Game-data with winner-matrix
    for (let winnerLine of this.winnerMatrix) {
      let valueList = [];
      for (let [y, x] of winnerLine) {
        valueList.push(this.squares[y][x]);
      }

      if (valueList.every(value => value === 'X')) {
        return {
          winner: 1,
          winnerLine
        };
      } else if (valueList.every(value => value === 'O')) {
        return {
          winner: 2,
          winnerLine
        };
      }
    }

    //  Check if all squares clicked and Game finished without winner
    if (this.squares.flat().every(sq => sq)) {
      return {
        winner: 3
      };
    }
    return {};
  }

  /**
   * Render winner result in view
   * 
   * @param {number} winner Number of winner result
   */
  renderWinner(winner) {
    switch (winner) {
      case 1:
        this.gameInfo.innerHTML = '<span>Winner: <span class="player">X</span></span>';
        break;
      case 2:
        this.gameInfo.innerHTML = '<span>Winner: <span class="player">O</span></span>';
        break;
      case 3:
        this.gameInfo.innerHTML = '<span>It\'s <span class="player draw">a draw</span></span>';
    }
  }

  /**
   * Render winner result in view
   * 
   * @param {Array} winnerLine Winner combination result in winner-matrix
   */
  renderEndLine(winnerLine) {
    let winCombinationIdx = this.winnerMatrix.indexOf(winnerLine);
    document.querySelector(`.axis-line__${winCombinationIdx}`)
      .style.visibility = 'visible';
  }

  /**
   * Calculate the winner and render
   */
  checkWinner() {
    let {
      winner,
      winnerLine
    } = this.calculateWinner();

    if (winner) {
      this.renderWinner(winner);
      this.isGameFinished = true;
    }

    if (winnerLine) {
      this.renderEndLine(winnerLine)
    }
  }


}