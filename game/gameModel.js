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
    for (let i = 0; i<this.size; i++) {
        let outerArr = [];
        for (let j = 0; j<this.size; j++) {
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
    // console.log(this.gameData);
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
        // console.log(winnerLine);
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

  // calculateWinnerMaterix(size) {
  //   let outArr = [];
  //   let innerArr = [];
  //
  //   for (let i = 0; i<size; i++) {
  //     // horizontal combinations
  //     innerArr = [];
  //     for (let j = 0; j<size; j++) {
  //       innerArr.push([i, j]);
  //     }
  //     outArr.push(innerArr);
  //   }
  //
  //   // vertical combinations
  //   for (let i = 0; i<size; i++) {
  //     innerArr = [];
  //     for (let j = 0; j<size; j++) {
  //       innerArr.push([j, i]);
  //     }
  //     outArr.push(innerArr);
  //   }
  //
  //   // diagonal combinations
  //   for (let i = 0; i<size; i++) {
  //     innerArr = [];
  //     for (let j = 0; j<size; j++) {
  //       if (i === j || i !== j) {
  //         innerArr.push([j, i]);
  //       }
  //     }
  //     outArr.push(innerArr);
  //   }
  //
  //   return outArr;
  // }


}
