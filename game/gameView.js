export class GameView {
  constructor(DOMElements) {
    this.DOMElements = DOMElements;
    this.oldLineIndex = null;
  }

  resetView() {
    // this.DOMElements.line.style.display = 'none';
    // this.DOMElements.line.classList.remove(`axis-line__${this.oldLineIndex}`);

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
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < size; i++) {
      let boardRow = document.createElement('div');
      boardRow.classList.add('board-row');
      for (let j = 0; j < size; j++) {
        boardRow.innerHTML += `<span class="square" data-index="${i}:${j}" title="${i}:${j}"></span>`
      }
      fragment.appendChild(boardRow)
    }
    this.DOMElements.board.innerHTML = '';
    this.DOMElements.board.appendChild(fragment);
  }

   renderPressedSquare(row, column, value) {
    document.querySelector(`[data-index='${row}:${column}']`).innerHTML =
      value === "O"
        ? `<span class="blue"><i class="far fa-circle"></i></span>`
        : `<span class="yellow"><i class="fas fa-times"></i></span>`;
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
  //   let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  //   let svgLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  //   svg.setAttribute("id","svg");
  //   svg.setAttribute("style", "width: " + 100 + "px; height: " + 100 + "px;");
  //   svgLine.setAttribute("x1", startEndPoints[0][0]);
  //   svgLine.setAttribute("y1", startEndPoints[0][1]);
  //   svgLine.setAttribute("x2", startEndPoints[1][0]);
  //   svgLine.setAttribute("y2", startEndPoints[1][1]);
  //   svgLine.setAttribute("stroke","blue");
  //   svgLine.setAttribute("id", "line");
  //   // this.DOMElements.board.insertBefore(svg, this.DOMElements.board.firstChild);
  //   document.body.insertBefore(svg, document.body.firstChild);
  //   document.getElementById("svg").appendChild(svgLine);
  //   // this.DOMElements.line.innerHTML = `<line x1="${startEndPoints[0][0]}" y1="${startEndPoints[0][1]}" x2="${startEndPoints[1][0]}"
  //   //                     y2="${startEndPoints[1][1]}"  style="stroke:rgb(255,0,0);stroke-width:2" />`;
  //
  //   // this.DOMElements.line.innerHTML = `<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />`;
  //
  //
  // }
}
