const Game = {
  selectedVariant: '',
}

printVariantAndCheckValid = (target) => {
  target.textContent = Game.selectedVariant;
}

const restartGame = ($dialog, $main, $tiles, tileList) => {
  // Empty the game board
  for (let ele of $tiles) {
    ele.textContent = ''
  }

  // prompt the user to choose
  $dialog.show();

  // Add Click event listener on the main
  $main.addEventListener('click', (e) => {
    const { target } = e;
    const tileNum = target.getAttribute('data-tile');
    if (tileList.includes(tileNum)) {
      printVariantAndCheckValid(target);
    }
  }, false);
  
  // Add Click event listener on the dilog
  $dialog.addEventListener('click', (e) => {
    const { target } = e;
    const selection = target.getAttribute('data-selection');
    if (selection) {
      $dialog.close();
      Game.selectedVariant = selection;
    }
  }, false);
}

const initializeGame = () => {
  const $main = document.querySelector('main');
  const $tiles = document.getElementsByClassName('tile');
  const $dialog = document.querySelector('dialog');
  const tileList = ['1', '2' , '3', '4', '5', '6', '7', '8', '9'];

  restartGame($dialog, $main, $tiles, tileList);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeGame();
}, false);