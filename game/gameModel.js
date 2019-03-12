export class GameModel {
  constructor() {
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
    this.gameData = null;
    this.isFirstStep = true;
    this.xIsNext = null;
    this.isGameFinished = false;
  }

  resetData() {
    this.gameData = [
      Array(3).fill(null),
      Array(3).fill(null),
      Array(3).fill(null),
    ];

    this.xIsNext = true;
    this.isFirstStep = true;
    this.isGameFinished = false;
  }

  makeStep(row, column) {
    if (this.isFirstStep) this.isFirstStep = false;

    if (this.gameData[row][column] || this.isGameFinished === true) return;

    this.gameData[row][column] = this.xIsNext ? 'X' : 'O';

    this.xIsNext = !this.xIsNext;

    return this.gameData[row][column];
  }

  checkWinner() {
    let winnerCheck;

    for (let winnerLine of this.winnerMatrix) {
      let valueList = [];
      for (let [y, x] of winnerLine) {
        valueList.push(this.gameData[y][x]);
      }

      if (valueList.every(value => value === 'X')) {
        winnerCheck = {
          winner: 1,
          line: this.winnerMatrix.indexOf(winnerLine)
        };
      } else if (valueList.every(value => value === 'O')) {
        winnerCheck = {
          winner: 2,
          line: this.winnerMatrix.indexOf(winnerLine)
        };
      }
    }

    if (this.gameData.flat().every(sq => sq)) {
      winnerCheck = {
        winner: 3
      };
    }

    if (winnerCheck) {
      this.isGameFinished = true;
    }
    return winnerCheck;
  }
}
