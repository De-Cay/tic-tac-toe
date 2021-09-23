const Game = {
  selectedVariant: '',
  $table: document.querySelector('table'),
  $dialog: document.querySelector('dialog')
}

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

checkDiagonal = (cellIndex, rowIndex) => {
  return false;
}

checkTheWinner = (cellIndex, rowIndex) => {
  const totalRows = Game.$table.rows;
  const $clickedRowCells = totalRows.item(rowIndex).cells;
  const totalLength = $clickedRowCells.length;

  if (checkRow($clickedRowCells, totalLength)) {
    return true;
  } else if(checkColumn(totalRows, cellIndex, totalLength)) {
    return true;
  } else if (checkDiagonal(cellIndex, rowIndex)) {
    return true;
  }
  return false;
}

printVariantAndCheckValid = (target) => {
  target.textContent = Game.selectedVariant;
  const { cellIndex } = target;
  const { rowIndex } = target.parentNode;
  const isPlayerWon = checkTheWinner(cellIndex, rowIndex);
  if(isPlayerWon) {
    return setTimeout(() => {
      startGame();
      alert('You Won');
    }, 100);
  }

  // Computer play logic
  //......
  //.....

  // const isComputerWon = checkTheWinner(cellIndex, rowIndex);
  // if(isComputerWon) {
  //   return setTimeout(() => {
  //     startGame();
  //     alert('You Won');
  //   }, 100);
  // }
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