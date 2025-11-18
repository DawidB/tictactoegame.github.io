/**
 * ui.js - UI Rendering Module
 * 
 * Handles DOM manipulation, rendering game state, and user interactions.
 * Coordinates between user actions and game logic.
 */

/**
 * Render the game board with current state
 * @param {Array} board - Current board state
 * @param {number} boardSize - Current board dimension
 * @param {boolean} gameActive - Whether game is active
 * @param {Array<number>|null} lastWinningCombination - Indices of winning cells
 */
function renderBoard(board, boardSize, gameActive, lastWinningCombination) {
  const gameBoard = document.querySelector('.game-board');
  if (!gameBoard) return;

  gameBoard.innerHTML = '';
  gameBoard.style.setProperty('--board-size', String(boardSize));

  const winningSet = new Set(lastWinningCombination || []);

  board.forEach((mark, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('role', 'gridcell');
    cell.dataset.index = String(index);
    cell.textContent = mark;

    const row = Math.floor(index / boardSize) + 1;
    const col = (index % boardSize) + 1;
    const cellState = mark || 'empty';
    cell.setAttribute('aria-label', `Row ${row}, Column ${col}, ${cellState}`);

    if (mark) {
      cell.classList.add('occupied');
    }

    if (winningSet.has(index)) {
      cell.classList.add('cell--winning');
    }

    if (!gameActive) {
      cell.classList.add('disabled');
      cell.setAttribute('aria-disabled', 'true');
    }

    gameBoard.appendChild(cell);
  });
}

/**
 * Render the game status message
 * @param {Object} state - Current game state
 */
function renderStatus(state) {
  const statusElement = document.querySelector('.game-status');
  if (!statusElement) return;

  const { currentPlayer, winner, gameActive, boardSize, isExpanding } = state;
  
  if (!gameActive) {
    if (winner === 'draw') {
      statusElement.textContent = `It's a draw! Expanding board to ${Math.min(boardSize + 1, 10)}×${Math.min(boardSize + 1, 10)}...`;
      statusElement.className = 'game-status draw';
    } else if (winner === 'X' || winner === 'O') {
      statusElement.textContent = `Player ${winner} wins! Expanding board to ${Math.min(boardSize + 1, 10)}×${Math.min(boardSize + 1, 10)}...`;
      statusElement.className = `game-status winner winner-${winner}`;
    } else {
      statusElement.textContent = 'Game over';
      statusElement.className = 'game-status';
    }
  } else if (isExpanding) {
    statusElement.textContent = 'Expanding board...';
    statusElement.className = 'game-status';
  } else {
    statusElement.textContent = `Player ${currentPlayer}'s turn — Board: ${boardSize}×${boardSize}`;
    statusElement.className = 'game-status';
  }
}

/**
 * Bind click event to game board cells
 * @param {Function} callback - Function to call when cell is clicked
 */
function bindCellClick(callback) {
  const gameBoard = document.querySelector('.game-board');
  
  gameBoard.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
      const cellIndex = parseInt(event.target.dataset.index);
      callback(cellIndex);
    }
  });
}

/**
 * Bind click event to reset button
 * @param {Function} callback - Function to call when reset is clicked
 */
function bindResetClick(callback) {
  const resetButton = document.querySelector('.reset-button');
  
  resetButton.addEventListener('click', () => {
    callback();
  });
}

/**
 * Render the complete game state
 * @param {Object} state - Current game state
 */
function render(state) {
  renderBoard(state.board, state.boardSize, state.gameActive, state.lastWinningCombination);
  renderStatus(state);
}
