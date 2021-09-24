const Game = {
  selectedVariant: '',
  totalVariant: ['x', 'o'],
  computerSelected: '',
  $table: document.querySelector('table'),
  $dialog: document.querySelector('dialog'),
  diagonalIndeces: {
    mainDiagonal: [[0, 0], [1, 1], [2, 2]],
    antiDiagonal: [[0, 2], [1, 1], [2, 0]]
  }
};

checkRow = ($clickedRowCells, totalLength) => {
  let ii = 1;
  while(ii < totalLength) {
    if ($clickedRowCells[ii].textContent !== $clickedRowCells[ii - 1].textContent) {
      return false;
    }
    ii++;
  }
  return true;
}

checkColumn = (totalRows, cellIndex, totalLength) => {
  let jj = 1;
  while(jj < totalLength) {
    if (totalRows.item(jj).cells[cellIndex].textContent !==  (totalRows.item(jj - 1).cells[cellIndex].textContent)) {
      return false;
    }
    jj++;
  }
  return true;
}

checkDiagonal = (totalRows, varient) => {
  const { 
    diagonalIndeces: {
      mainDiagonal,
      antiDiagonal
    }
  } = Game;

  const isMainDiagonalWin = mainDiagonal.reduce((acm, indeces) => {
    return acm && (varient === totalRows.item(indeces[0]).cells[indeces[1]].textContent);
  }, true);

  const isAntiDiagonalWin = antiDiagonal.reduce((acm, indeces) => {
    return acm && (varient === totalRows.item(indeces[0]).cells[indeces[1]].textContent);
  }, true);

  return isMainDiagonalWin || isAntiDiagonalWin; 
}

checkTheWinner = (cellIndex, rowIndex, varient) => {
  const totalRows = Game.$table.rows;
  const $clickedRowCells = totalRows.item(rowIndex).cells;
  const totalLength = $clickedRowCells.length;

  if (checkRow($clickedRowCells, totalLength)) {
    return true;
  } else if(checkColumn(totalRows, cellIndex, totalLength)) {
    return true;
  } else if (checkDiagonal(totalRows, varient)) {
    return true;
  }
  return false;
}

botPlay = () => {
  const { $table } = Game;
  for(let row = 0, noOfRows = $table.rows.length; row < noOfRows; row++) {
    const cells = $table.rows.item(row).cells;
    for (let cell = 0, noOfCells = cells.length; cell < noOfCells; cell++) {
      if(!cells[cell].textContent) {
        cells[cell].textContent = Game.computerSelected;
        return {row, cell};
      }
    }
  }
}

printVariantAndCheckValid = (target) => {
  target.textContent = Game.selectedVariant;
  const { cellIndex } = target;
  const { rowIndex } = target.parentNode;
  const isPlayerWon = checkTheWinner(cellIndex, rowIndex, Game.selectedVariant);
  if(isPlayerWon) {
    return setTimeout(() => {
      alert('You Won');
      startGame();
    }, 200);
  }
 
  const botIndeces = botPlay();

  const isComputerWon = checkTheWinner(botIndeces.cell, botIndeces.row, Game.computerSelected);
  if(isComputerWon) {
    return setTimeout(() => {
      alert('You Loose');
      startGame();
    }, 200);
  }
}

const startGame = () => {
  // prompt the user to choose
  Game.$dialog.show();

  // Empty the game board
  const { $table } = Game;
  for(let row = 0, noOfRows = $table.rows.length; row < noOfRows; row++) {
    const cells = $table.rows.item(row).cells;
    for (let cell = 0, noOfCells = cells.length; cell < noOfCells; cell++) {
      cells[cell].textContent = '';
    }
  }
}

const initializeGame = () => {
  // Add Click event listener on the dilog
  Game.$dialog.addEventListener('click', (e) => {
    const { target } = e;
    const selection = target.getAttribute('data-selection');
    if (selection) {
      Game.$dialog.close();
      Game.selectedVariant = selection;
      Game.computerSelected = Game.totalVariant.find(val => val !== selection);
    }
  }, false);

  // Add Click event listener on the main
  Game.$table.addEventListener('click', (e) => {
    const { target } = e;
    if (target.tagName === 'TD') {
      printVariantAndCheckValid(target);
    }
  }, false);

  startGame();
}

document.addEventListener('DOMContentLoaded', initializeGame, false);