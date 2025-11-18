/**
 * game.js - Game Logic Module
 * 
 * Manages game state, enforces rules, and detects win/draw conditions.
 * All functions are pure or clearly document side effects.
 */

/**
 * Create an empty board of given size (NxN) as a flat array
 * @param {number} size
 * @returns {string[]}
 */
function createEmptyBoard(size) {
  return Array(size * size).fill('');
}

/**
 * Convert row/col coordinates to flat index
 * @param {number} row
 * @param {number} col
 * @param {number} size
 * @returns {number}
 */
function toIndex(row, col, size) {
  return row * size + col;
}

/**
 * Generate all possible 3-cell lines (rows, columns, diagonals) for given board size
 * @param {number} size
 * @returns {number[][]}
 */
function getLines(size) {
  const lines = [];
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // down-right
    [1, -1]   // down-left
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      for (const [dr, dc] of directions) {
        const cells = [];
        let r = row;
        let c = col;
        for (let k = 0; k < 3; k++) {
          if (r < 0 || r >= size || c < 0 || c >= size) {
            cells.length = 0;
            break;
          }
          cells.push(toIndex(r, c, size));
          r += dr;
          c += dc;
        }
        if (cells.length === 3) {
          lines.push(cells);
        }
      }
    }
  }

  return lines;
}

/**
 * Initialize a new game with default state
 * @returns {Object} Fresh game state
 */
function initGame() {
  const boardSize = 3;

  return {
    board: createEmptyBoard(boardSize),
    boardSize: boardSize,
    currentPlayer: 'X',
    gameActive: true,
    winner: null,
    lastWinningCombination: null,
    isExpanding: false
  };
}

/**
 * Get a copy of the current game state
 * @param {Object} state - Current game state
 * @returns {Object} Copy of game state
 */
function getGameState(state) {
  return {
    ...state,
    board: [...state.board],
    lastWinningCombination: state.lastWinningCombination
      ? [...state.lastWinningCombination]
      : null
  };
}

/**
 * Attempt to make a move at the specified cell
 * @param {Object} state - Current game state
 * @param {number} cellIndex - Cell index (0-8)
 * @returns {Object} Result with success flag, updated state, and message
 */
function makeMove(state, cellIndex) {
  if (state.isExpanding) {
    return {
      success: false,
      state: state,
      message: 'Board is expanding'
    };
  }

  // Validation
  if (!state.gameActive) {
    console.error('Attempted move on inactive game');
    return {
      success: false,
      state: state,
      message: 'Game has ended'
    };
  }

  if (cellIndex < 0 || cellIndex >= state.board.length || !Number.isInteger(cellIndex)) {
    console.error(`Invalid cell index: ${cellIndex}`);
    return {
      success: false,
      state: state,
      message: 'Invalid cell index'
    };
  }

  if (state.board[cellIndex] !== '') {
    console.warn(`Attempted move on occupied cell: ${cellIndex}`);
    return {
      success: false,
      state: state,
      message: 'Cell already occupied'
    };
  }

  // Make the move
  const newState = getGameState(state);
  newState.board[cellIndex] = state.currentPlayer;

  // Check for winner
  const winnerResult = checkWinnerDynamic(newState.board, newState.boardSize);
  if (winnerResult.winner) {
    newState.gameActive = false;
    newState.winner = winnerResult.winner;
    newState.lastWinningCombination = winnerResult.combo;
    newState.isExpanding = true;
    return {
      success: true,
      state: newState,
      message: `Player ${winnerResult.winner} wins!`
    };
  }

  // Check for draw
  if (checkDrawDynamic(newState.board)) {
    newState.gameActive = false;
    newState.winner = 'draw';
    newState.lastWinningCombination = null;
    newState.isExpanding = true;
    return {
      success: true,
      state: newState,
      message: "It's a draw!"
    };
  }

  // Switch player
  newState.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

  return {
    success: true,
    state: newState,
    message: `Player ${state.currentPlayer} placed mark`
  };
}

/**
 * Check if there's a winner on the board for any size (3-in-a-row)
 * @param {Array} board - Current board state
 * @param {number} size - Board dimension
 * @returns {{winner: string|null, combo: number[]|null}}
 */
function checkWinnerDynamic(board, size) {
  const lines = getLines(size);

  for (const combination of lines) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: combination };
    }
  }

  return { winner: null, combo: null };
}

/**
 * Check if the game is a draw (board full, no winner)
 * @param {Array} board - Current board state
 * @returns {boolean} True if draw, false otherwise
 */
function checkDrawDynamic(board) {
  return board.every(cell => cell !== '');
}

/**
 * Expand the board after a win or draw
 * @param {Object} state - Current game state
 * @returns {Object} New expanded state
 */
function expandBoard(state) {
  const currentSize = state.boardSize;

  if (currentSize >= 10) {
    return {
      ...state,
      isExpanding: false,
      gameActive: true,
      winner: null,
      lastWinningCombination: null
    };
  }

  const newSize = currentSize + 1;
  const newBoard = createEmptyBoard(newSize);

  for (let row = 0; row < currentSize; row++) {
    for (let col = 0; col < currentSize; col++) {
      const oldIndex = toIndex(row, col, currentSize);
      const newIndex = toIndex(row, col, newSize);
      newBoard[newIndex] = state.board[oldIndex];
    }
  }

  const nextPlayer = state.winner && state.winner !== 'draw'
    ? state.winner
    : state.currentPlayer === 'X'
      ? 'O'
      : 'X';

  return {
    ...state,
    board: newBoard,
    boardSize: newSize,
    currentPlayer: nextPlayer,
    gameActive: true,
    winner: null,
    lastWinningCombination: null,
    isExpanding: false
  };
}

/**
 * Reset game to initial state
 * @returns {Object} Fresh game state
 */
function resetGame() {
  return initGame();
}
