const Game = {
  selectedVariant: '',
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

checkTheWinner = (target, $table) => {
  const { cellIndex } = target;
  const { rowIndex } = target.parentNode;
  const totalRows = $table.rows;
  const $clickedRowCells = totalRows.item(rowIndex).cells;
  let ii = 1;
  const totalLength = $clickedRowCells.length;
  // Check the row
  while(ii < totalLength) {
    if ($clickedRowCells[ii].textContent !== $clickedRowCells[ii - 1].textContent) {
      // Check the column
      if (checkColumn(totalRows, cellIndex, totalLength)) {
        return true;
      }
      return false;
    }
    ii++;
  }
  return true;
}

printVariantAndCheckValid = (target, $table) => {
  target.textContent = Game.selectedVariant;
  const isPlayerWon = checkTheWinner(target, $table);
  if(isPlayerWon) {
    setTimeout(() => {
      alert('You Won');
      initializeGame();
    }, 500)
    return;
  }

  // // Computer play logic
  // //
  // //
  // const isComputerWon = checkTheWinner(target);
  // if(isComputerWon) {
  //   alert('Computer Won');
  //   initializeGame();
  //   return;
  // }
}

const restartGame = ($table, $dialog) => {
  // prompt the user to choose
  $dialog.show();

  // Add Click event listener on the dilog
  $dialog.addEventListener('click', (e) => {
    const { target } = e;
    const selection = target.getAttribute('data-selection');
    if (selection) {
      $dialog.close();
      Game.selectedVariant = selection;
    }
  }, false);

  // Empty the game board
  for(let row = 0, noOfRows = $table.rows.length; row < noOfRows; row++) {
    const cells = $table.rows.item(row).cells;
    for (let cell = 0, noOfCells = cells.length; cell < noOfCells; cell++) {
      cells[cell].textContent = '';
    }
  }
  
  // Add Click event listener on the main
  $table.addEventListener('click', (e) => {
    const { target } = e;
    if (target.tagName === 'TD') {
      printVariantAndCheckValid(target, $table);
    }
  }, false);
}

const initializeGame = () => {
  const $table = document.querySelector('table');
  const $dialog = document.querySelector('dialog');
  restartGame($table, $dialog);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
}, false);