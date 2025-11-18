/**
 * game.js - Game Logic Module
 * 
 * Manages game state, enforces rules, and detects win/draw conditions.
 * All functions are pure or clearly document side effects.
 */

// Winning combinations for 3x3 tic-tac-toe grid
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
];

/**
 * Initialize a new game with default state
 * @returns {Object} Fresh game state
 */
function initGame() {
  return {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameActive: true,
    winner: null
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
    board: [...state.board]
  };
}

/**
 * Attempt to make a move at the specified cell
 * @param {Object} state - Current game state
 * @param {number} cellIndex - Cell index (0-8)
 * @returns {Object} Result with success flag, updated state, and message
 */
function makeMove(state, cellIndex) {
  // Validation
  if (!state.gameActive) {
    console.error('Attempted move on inactive game');
    return {
      success: false,
      state: state,
      message: 'Game has ended'
    };
  }

  if (cellIndex < 0 || cellIndex > 8 || !Number.isInteger(cellIndex)) {
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
  const winner = checkWinner(newState.board);
  if (winner) {
    newState.gameActive = false;
    newState.winner = winner;
    return {
      success: true,
      state: newState,
      message: `Player ${winner} wins!`
    };
  }

  // Check for draw
  if (checkDraw(newState.board)) {
    newState.gameActive = false;
    newState.winner = 'draw';
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
 * Check if there's a winner on the board
 * @param {Array} board - Current board state
 * @returns {string|null} 'X', 'O', or null if no winner
 */
function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * Check if the game is a draw (board full, no winner)
 * @param {Array} board - Current board state
 * @returns {boolean} True if draw, false otherwise
 */
function checkDraw(board) {
  return board.every(cell => cell !== '');
}

/**
 * Reset game to initial state
 * @returns {Object} Fresh game state
 */
function resetGame() {
  return initGame();
}
