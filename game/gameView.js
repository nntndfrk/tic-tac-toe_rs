export class GameView {
  constructor(DOMElements) {
    this.DOMElements = DOMElements;
    this.oldLineIndex = null;
  }

  resetView() {
    this.DOMElements.line.style.display = 'none';
    this.DOMElements.line.classList.remove(`axis-line__${this.oldLineIndex}`);

    [...this.DOMElements.board.children].forEach(boardRow => {
      [...boardRow.children].forEach(button => {
        button.innerText = "";
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

  renderPressedSquare = (row, column, value) => {
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

  renderEndLine(lineIndex) {
    if (lineIndex) {
      this.oldLineIndex = lineIndex;
      this.DOMElements.line.style.display = 'block';
      this.DOMElements.line.classList.add(`axis-line__${lineIndex}`);
    }
  }
}
