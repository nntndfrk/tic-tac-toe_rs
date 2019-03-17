export class GameView {
  constructor(DOMElements) {
    this.DOMElements = DOMElements;
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
            class="square square-${this.size}" 
            data-index="${i}:${j}" 
            title="${i}:${j}"
            style="
                    width: ${parseInt((this.playGroudSize - size * 2) / size)}px; 
                    height: ${parseInt((this.playGroudSize - size * 2) / size)}px;
                    font-size: ${parseInt(this.baseFontSize * this.baseSize / this.size)}px;
                  "
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
        ? `<span class="blue" style="font-size: inherit">
            O
          </span>`
        : `<span class="yellow" style="font-size: inherit">
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
    this.renderEndLine2(winnerResult.line);
  }

  renderEndLine(points) {
    points.forEach(cell => {
      document.querySelector(`[data-index='${cell[0]}:${cell[1]}']`).classList.add('green-bg');
    })
  }

  renderEndLine2(points) {
    const startEndPoints = [];
    points.forEach((point, index, arr) => {
      if (index === 0 || index === arr.length - 1) {
        let cell = document.querySelector(`[data-index='${point[0]}:${point[1]}']`);

        let centerX = cell.offsetLeft + cell.offsetWidth / 2;
        let centerY = cell.offsetTop + cell.offsetHeight / 2;

        startEndPoints.push([centerX, centerY]);
      }
    });
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let game = document.getElementById("game-board");

    svg.setAttribute("id", "svg");
    svg.setAttribute("style", "width: " + this.playGroudSize + "px; height: " + this.playGroudSize + "px;");

    line.setAttribute("x1", startEndPoints[0][0]);
    line.setAttribute("y1", startEndPoints[0][1]);
    line.setAttribute("x2", startEndPoints[1][0]);
    line.setAttribute("y2", startEndPoints[1][1]);
    line.setAttribute("stroke", "rgba(184,141,218,0.81)");
    line.setAttribute("stroke-width", "10");
    line.setAttribute("id", "line");

    this.DOMElements.board.insertBefore(svg, game.firstChild);
    document.getElementById("svg").appendChild(line);
  }
}
