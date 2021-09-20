const Game = {
  selectedVariant: '',
  board: [Array.from(Array(3)), Array.from(Array(3)), Array.from(Array(3))],
  tileList: ['1', '2' , '3', '4', '5', '6', '7', '8', '9']
}

printVariantAndCheckValid = (target) => {
  target.textContent = Game.selectedVariant;
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
    const cells = $table.rows[row];
    for (let cell = 0, noOfCells = cells.length; cell < noOfCells; cell++) {
      cells[cell].textContent = '';
    }
  }
  
  // Add Click event listener on the main
  $table.addEventListener('click', (e) => {
    const { target } = e;
    if (target.tagName === 'TD') {
      console.log(target.parentNode.rowIndex, target.cellIndex);
      printVariantAndCheckValid(target);
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