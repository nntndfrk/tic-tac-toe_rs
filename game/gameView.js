export class GameView {
  constructor(DOMElements) {
    this.DOMElements = DOMElements;
    this.oldLineIndex = null;
    this.playGroudSize = 480;
    this.baseSize = 3;
    this.size = 3;
    this.baseFontSize = 140;
  }

  resetView() {
    [...this.DOMElements.board.children].forEach(boardRow => {
      [...boardRow.children].forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('green-bg');
      });
    });
  }

  renderInfo(isFirstStep, xIsNext) {
    if (isFirstStep) {
      this.DOMElements.gameInfo.innerHTML =
        '<span class="player">X</span> makes first step';
      return;
    }

    this.DOMElements.gameInfo.innerHTML = xIsNext
      ? 'Next player: <span class="player">X</span>'
      : 'Next player: <span class="player">O</span>';
  }

  renderGameBoard(size) {
    this.size = size;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < size; i++) {
      let boardRow = document.createElement('div');
      boardRow.classList.add('board-row');
      for (let j = 0; j < size; j++) {
        boardRow.innerHTML +=
          `<span 
            class="square" 
            data-index="${i}:${j}" 
            title="${i}:${j}"
            style="width: ${parseInt((this.playGroudSize - size*2)/size)}px; height: ${parseInt((this.playGroudSize - size*2)/size)}px"
          ></span>`
      }
      fragment.appendChild(boardRow);
    }

    this.DOMElements.board.innerHTML = '';
    this.DOMElements.board.appendChild(fragment);
  }

   renderPressedSquare(row, column, value) {
    document.querySelector(`[data-index='${row}:${column}']`).innerHTML =
      value === "O"
        // ? `<span class="blue"><i class="far fa-circle"></i></span>`
        // : `<span class="yellow"><i class="fas fa-times"></i></span>`;
        ? `<span class="blue" style="font-size: ${parseInt(this.baseFontSize * this.baseSize/this.size)}px">
            O
          </span>`
        : `<span class="yellow" style="font-size: ${parseInt(this.baseFontSize * this.baseSize/this.size)}px">
            X
          </span>`;

  };

  renderWinner(winnerResult) {
    switch (winnerResult.winner) {
      case 1:
        this.DOMElements.gameInfo.innerHTML =
          '<span>Winner: <span class="player">X</span></span>';
        break;
      case 2:
        this.DOMElements.gameInfo.innerHTML =
          '<span>Winner: <span class="player">O</span></span>';
        break;
      case 3:
        this.DOMElements.gameInfo.innerHTML =
          '<span>It\'s <span class="player draw">a draw</span></span>';
    }

    this.renderEndLine(winnerResult.line);
  }

  renderEndLine(line) {
    line.forEach(cell => {
      document.querySelector(`[data-index='${cell[0]}:${cell[1]}']`).classList.add('green-bg');
    })
  }

  // renderEndLine(line) {
  //   const startEndPoints = [];
  //   line.forEach((point, index, arr) => {
  //     if (index === 0 || index === arr.length - 1) {
  //       console.log(point);
  //       let cell = document.querySelector(`[data-index='${point[0]}:${point[1]}']`);
  //
  //       let centerX = cell.offsetLeft + cell.offsetWidth / 2;
  //       let centerY = cell.offsetTop + cell.offsetHeight / 2;
  //
  //       console.log(centerX, centerY);
  //
  //       startEndPoints.push([centerX, centerY]);
  //     }
  //   });
  //
  //   const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  //   newLine.setAttribute('id','line2');
  //   newLine.setAttribute('x1', startEndPoints[0][0]);
  //   newLine.setAttribute('y1',startEndPoints[0][0]);
  //   newLine.setAttribute('x2',startEndPoints[0][0]);
  //   newLine.setAttribute('y2',startEndPoints[0][0]);
  //   newLine.setAttribute("stroke", "black");
  //   document.getElementsByTagName('svg')[0].append(newLine);
    // this.DOMElements.board.insertBefore(svg, this.DOMElements.board.firstChild);

    // this.DOMElements.line.innerHTML = `<line x1="${startEndPoints[0][0]}" y1="${startEndPoints[0][1]}" x2="${startEndPoints[1][0]}"
    //                     y2="${startEndPoints[1][1]}"  style="stroke:rgb(255,0,0);stroke-width:2" />`;

    // this.DOMElements.line.innerHTML = `<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />`;


  // }
}
