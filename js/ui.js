/**
 * ui.js - UI Rendering Module
 * 
 * Handles DOM manipulation, rendering game state, and user interactions.
 * Coordinates between user actions and game logic.
 */

/**
 * Render the game board with current state
 * @param {Array} board - Current board state
 * @param {boolean} gameActive - Whether game is active
 */
function renderBoard(board, gameActive) {
  const cells = document.querySelectorAll('.cell');
  
  cells.forEach((cell, index) => {
    const mark = board[index];
    cell.textContent = mark;
    
    // Update ARIA label
    const cellNumber = index + 1;
    const cellState = mark || 'empty';
    cell.setAttribute('aria-label', `Cell ${cellNumber}, ${cellState}`);
    
    // Update classes
    if (mark) {
      cell.classList.add('occupied');
    } else {
      cell.classList.remove('occupied');
    }
    
    if (!gameActive) {
      cell.classList.add('disabled');
      cell.setAttribute('aria-disabled', 'true');
    } else {
      cell.classList.remove('disabled');
      cell.removeAttribute('aria-disabled');
    }
  });
}

/**
 * Render the game status message
 * @param {string} currentPlayer - Current player ('X' or 'O')
 * @param {string|null} winner - Winner ('X', 'O', 'draw', or null)
 * @param {boolean} gameActive - Whether game is active
 */
function renderStatus(currentPlayer, winner, gameActive) {
  const statusElement = document.querySelector('.game-status');
  
  if (!gameActive) {
    if (winner === 'draw') {
      statusElement.textContent = "It's a draw!";
      statusElement.className = 'game-status draw';
    } else {
      statusElement.textContent = `Player ${winner} wins!`;
      statusElement.className = `game-status winner winner-${winner}`;
    }
  } else {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
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
  renderBoard(state.board, state.gameActive);
  renderStatus(state.currentPlayer, state.winner, state.gameActive);
}
