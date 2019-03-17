export class GameModel {
  constructor(utils, size = 3) {
    this.utils = utils;
    this.size = size;
    this.winnerMatrix = null;
    this.gameData = [];
    this.isFirstStep = true;
    this.xIsNext = null;
    this.isGameFinished = false;
  }

  resetData() {
    this.winnerMatrix = this.utils.getWinnerCombinations(this.size);
    this.gameData = [];
    for (let i = 0; i < this.size; i++) {
      let outerArr = [];
      for (let j = 0; j < this.size; j++) {
        outerArr.push(null)
      }
      this.gameData.push(outerArr);
    }


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
          line: winnerLine
        };
      } else if (valueList.every(value => value === 'O')) {
        console.log(winnerLine);
        winnerCheck = {
          winner: 2,
          line: winnerLine
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
