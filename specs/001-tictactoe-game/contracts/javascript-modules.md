# Module Contracts: Tic-Tac-Toe Game

**Feature**: 001-tictactoe-game  
**Created**: 2025-11-17  
**Purpose**: Define JavaScript module interfaces and contracts

## Overview

The application is split into three JavaScript modules with clear responsibilities:

1. **game.js** - Game logic and state management
2. **ui.js** - DOM rendering and user interactions
3. **main.js** - Application initialization and coordination

---

## game.js - Game Logic Module

**Responsibility**: Manage game state, enforce rules, detect win/draw conditions

### Exported Functions

#### `initGame()`

Initialize a new game with default state.

**Parameters**: None

**Returns**: `GameState` object
```javascript
{
  board: Array[9],      // ['', '', '', '', '', '', '', '', '']
  currentPlayer: String, // 'X'
  gameActive: Boolean,   // true
  winner: String|null    // null
}
```

**Side Effects**: None (pure function)

**Example**:
```javascript
const state = initGame();
// Returns fresh game state
```

---

#### `makeMove(state, cellIndex)`

Attempt to place current player's mark at the specified cell.

**Parameters**:
- `state`: GameState - Current game state
- `cellIndex`: Number (0-8) - Cell to place mark

**Returns**: `{ success: Boolean, state: GameState, message: String }`

**Return Object**:
```javascript
{
  success: true|false,    // Whether move was valid and made
  state: GameState,       // Updated state (or unchanged if invalid)
  message: String         // Success/error message
}
```

**Validation**:
- Cell index must be 0-8
- Cell must be empty
- Game must be active

**Side Effects**: 
- Updates board with player's mark
- Switches current player
- May end game (sets gameActive to false)
- May set winner

**Example**:
```javascript
const result = makeMove(state, 4);
if (result.success) {
  state = result.state;
  console.log(result.message); // "Player X placed mark"
}
```

---

#### `checkWinner(board)`

Check if there's a winner on the current board.

**Parameters**:
- `board`: Array[9] - Current board state

**Returns**: String|null
- `'X'` if X has won
- `'O'` if O has won
- `null` if no winner

**Logic**: Checks all 8 winning combinations

**Side Effects**: None (pure function)

**Example**:
```javascript
const winner = checkWinner(state.board);
if (winner) {
  console.log(`${winner} wins!`);
}
```

---

#### `checkDraw(board)`

Check if the game is a draw (board full, no winner).

**Parameters**:
- `board`: Array[9] - Current board state

**Returns**: Boolean
- `true` if board is full and no winner
- `false` otherwise

**Side Effects**: None (pure function)

**Example**:
```javascript
if (checkDraw(state.board)) {
  console.log("It's a draw!");
}
```

---

#### `resetGame()`

Create a fresh game state (same as initGame).

**Parameters**: None

**Returns**: GameState object (initial state)

**Side Effects**: None (pure function)

**Example**:
```javascript
state = resetGame();
```

---

#### `getGameState(state)`

Return read-only copy of current state (optional helper).

**Parameters**:
- `state`: GameState

**Returns**: GameState (copy)

**Purpose**: Defensive copying to prevent external mutations

---

### Internal Constants

```javascript
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const PLAYERS = {
  X: 'X',
  O: 'O'
};
```

---

## ui.js - UI Rendering Module

**Responsibility**: Handle DOM manipulation and user interaction

### Exported Functions

#### `renderBoard(board, gameActive)`

Render the current board state to the DOM.

**Parameters**:
- `board`: Array[9] - Current board state
- `gameActive`: Boolean - Whether game is active (for styling)

**Returns**: void

**Side Effects**: 
- Updates all cell textContent
- Updates cell classes (occupied, disabled)
- Updates ARIA labels for accessibility

**DOM Requirements**:
- Grid container with class `game-board`
- 9 cell elements with class `cell` and `data-index` attribute

**Example**:
```javascript
renderBoard(state.board, state.gameActive);
```

---

#### `renderStatus(currentPlayer, winner, gameActive)`

Update the status message display.

**Parameters**:
- `currentPlayer`: String ('X' or 'O')
- `winner`: String|null ('X', 'O', 'draw', or null)
- `gameActive`: Boolean

**Returns**: void

**Side Effects**: Updates status element textContent

**Messages**:
- Active game: "Player X's turn" or "Player O's turn"
- Win: "Player X wins!" or "Player O wins!"
- Draw: "It's a draw!"

**DOM Requirements**:
- Status element with class `game-status`

**Example**:
```javascript
renderStatus(state.currentPlayer, state.winner, state.gameActive);
```

---

#### `bindCellClick(callback)`

Attach click event listener to game board.

**Parameters**:
- `callback`: Function(cellIndex) - Function to call when cell clicked

**Returns**: void

**Side Effects**: Adds event listener to board (event delegation)

**Implementation**: Uses event delegation on board container

**Example**:
```javascript
bindCellClick((cellIndex) => {
  const result = makeMove(state, cellIndex);
  if (result.success) {
    state = result.state;
    render(state);
  }
});
```

---

#### `bindResetClick(callback)`

Attach click event listener to reset button.

**Parameters**:
- `callback`: Function() - Function to call when reset clicked

**Returns**: void

**Side Effects**: Adds event listener to reset button

**DOM Requirements**:
- Reset button with class `reset-button`

**Example**:
```javascript
bindResetClick(() => {
  state = resetGame();
  render(state);
});
```

---

#### `render(state)`

Convenience function to render entire game state.

**Parameters**:
- `state`: GameState - Complete game state

**Returns**: void

**Side Effects**: Calls renderBoard and renderStatus

**Example**:
```javascript
render(state); // Updates entire UI
```

---

### DOM Structure Requirements

```html
<div class="game-container">
  <div class="game-status"></div>
  <div class="game-board">
    <div class="cell" data-index="0"></div>
    <div class="cell" data-index="1"></div>
    <div class="cell" data-index="2"></div>
    <div class="cell" data-index="3"></div>
    <div class="cell" data-index="4"></div>
    <div class="cell" data-index="5"></div>
    <div class="cell" data-index="6"></div>
    <div class="cell" data-index="7"></div>
    <div class="cell" data-index="8"></div>
  </div>
  <button class="reset-button">Reset Game</button>
</div>
```

---

## main.js - Initialization Module

**Responsibility**: Wire together game logic and UI, handle application lifecycle

### Main Function

#### `initApp()`

Initialize the application when DOM is ready.

**Parameters**: None

**Returns**: void

**Side Effects**:
- Creates initial game state
- Binds event listeners
- Renders initial UI

**Flow**:
```javascript
function initApp() {
  // 1. Initialize game state
  let state = initGame();
  
  // 2. Bind cell click handler
  bindCellClick((cellIndex) => {
    const result = makeMove(state, cellIndex);
    if (result.success) {
      state = result.state;
      render(state);
    }
  });
  
  // 3. Bind reset handler
  bindResetClick(() => {
    state = resetGame();
    render(state);
  });
  
  // 4. Initial render
  render(state);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', initApp);
```

**No Exports**: This is the entry point module

---

## Module Dependencies

```
main.js
  ↓
  ├─→ game.js (imports: initGame, makeMove, resetGame)
  │
  └─→ ui.js (imports: render, bindCellClick, bindResetClick)
```

**Import Pattern**:
```javascript
// In main.js
import { initGame, makeMove, resetGame } from './game.js';
import { render, bindCellClick, bindResetClick } from './ui.js';
```

**Note**: For non-module browsers, can use script tags with global objects instead of ES6 modules.

---

## Error Handling

### game.js Errors

- Invalid cell index: Return `{ success: false, message: 'Invalid cell' }`
- Cell occupied: Return `{ success: false, message: 'Cell already occupied' }`
- Game ended: Return `{ success: false, message: 'Game has ended' }`

### ui.js Errors

- Missing DOM elements: Log error to console, fail gracefully
- Invalid parameters: Log warning, skip update

### main.js Errors

- Module load failure: Display error message to user
- Event binding failure: Log error, attempt recovery

---

## Testing Contracts

### Unit Test Requirements

**game.js**:
- Test initGame returns valid state
- Test makeMove with valid/invalid moves
- Test checkWinner with all 8 winning combinations
- Test checkDraw with full/partial boards
- Test resetGame returns initial state

**ui.js**:
- Test renderBoard updates DOM correctly
- Test renderStatus shows correct messages
- Test event bindings call callbacks
- Test render calls both render functions

**main.js**:
- Test initApp binds events and renders
- Integration test: full game flow

---

## Performance Contracts

- `makeMove`: O(1) for board update + O(8) for winner check = O(1)
- `checkWinner`: O(8) iterations = O(1)
- `checkDraw`: O(9) array check = O(1)
- `renderBoard`: O(9) DOM updates = O(1)
- All operations complete in <10ms

---

## Version Compatibility

These contracts are for version 1.0 of the tic-tac-toe game.

**Breaking Changes** (require version bump):
- Changing function signatures
- Changing return value structures
- Removing exported functions
- Changing state object structure

**Non-Breaking Changes**:
- Adding optional parameters
- Adding new exported functions
- Adding internal helper functions
- Improving performance
