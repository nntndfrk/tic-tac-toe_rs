export const utils = {
  getWinnerCombinations: function (size) {
    let horizontalCombinations = this._getHorizontal(size);
    let verticalCombinations = this._getVertical(size);
    let diagonalCombinations = this._getDiagonal(size);
    return horizontalCombinations
      .concat(verticalCombinations)
      .concat(diagonalCombinations);
  },
  _computeHorizontal: function (size) {
    let outArr = [];
    let innerArr = [];
    for (let i = 0; i < size; i++) {
      innerArr = [];
      for (let j = 0; j < size; j++) {
        innerArr.push([i, j]);
      }
      outArr.push(innerArr);
    }
    return outArr;
  },
  _computeVertical: function (size) {
    let outArr = [];
    let innerArr = [];
    for (let i = 0; i < size; i++) {
      innerArr = [];
      for (let j = 0; j < size; j++) {
        innerArr.push([j, i]);
      }
      outArr.push(innerArr);
    }
    return outArr;
  },
  _computeDiagonal: function (size, bottomToTop) {
    let innerArr;
    const returnArray = [];
    for (let k = 0; k <= 2 * (size - 1); ++k) {
      innerArr = [];
      for (let y = size - 1; y >= 0; --y) {
        const x = k - (bottomToTop ? size - y : y);
        if (x >= 0 && x < size) {
          innerArr.push([y, x]);
        }
      }
      if (innerArr.length > 0) {
        returnArray.push(innerArr);
      }
    }
    return returnArray;
  },
  _getDiagonal: function (size) {
    const returnArray = [];
    let diagonal = this._computeDiagonal(size).concat(
      this._computeDiagonal(size, true)
    );

    if (size >= 4) {
      diagonal = diagonal.filter(el => el.length >= 4);
    } else {
      diagonal = diagonal.filter(el => el.length >= size);
    }

    if (size > 4) {
      diagonal.forEach(el => {
        if (el.length <= 4) {
          returnArray.push(el);
        } else {
          let i = 0;
          while (true) {
            if (el.slice(i, i + 4).length < 4) break;
            returnArray.push(el.slice(i, i + 4));
            i++;
          }
          i = 0;
          while (true) {
            if (el.reverse().slice(i, i + 4).length < 4) break;
            returnArray.push(el.slice(i, i + 4));
            i++;
          }
        }
      });
      return returnArray;
    }
    return diagonal;
  },
  _getHorizontal: function (size) {
    const returnArray = [];
    let horizontal = this._computeHorizontal(size);
    if (size > 4) {
      horizontal.forEach(el => {
        let i = 0;
        while (true) {
          if (el.slice(i, i + 4).length < 4) break;
          returnArray.push(el.slice(i, i + 4));
          i++;
        }
      });
      return returnArray;
    }
    return horizontal;
  },
  _getVertical: function (size) {
    const returnArray = [];
    let vertical = this._computeVertical(size);
    if (size > 4) {
      vertical.forEach(el => {
        let i = 0;
        while (true) {
          if (el.slice(i, i + 4).length < 4) break;
          returnArray.push(el.slice(i, i + 4));
          i++;
        }
      });
      return returnArray;
    }
    return vertical;
  }
};
