# Data Model: Tic-Tac-Toe Game

**Feature**: 001-tictactoe-game  
**Created**: 2025-11-17  
**Purpose**: Define the game state structure and data transformations

## Core Entities

### GameState

Represents the complete state of the game at any point in time.

**Attributes**:
- `board`: Array[9] - Represents the 3x3 grid as a flat array (indices 0-8)
  - Valid values: `''` (empty), `'X'`, `'O'`
  - Index mapping:
    ```
    0 | 1 | 2
    ---------
    3 | 4 | 5
    ---------
    6 | 7 | 8
    ```
- `currentPlayer`: String - Which player's turn it is
  - Valid values: `'X'`, `'O'`
  - Always starts with `'X'`
- `gameActive`: Boolean - Whether the game is in progress
  - `true`: Game is active, moves can be made
  - `false`: Game has ended (win or draw)
- `winner`: String | null - The winner of the game
  - Valid values: `'X'`, `'O'`, `'draw'`, `null`
  - `null` when game is in progress

**Initial State**:
```javascript
{
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  gameActive: true,
  winner: null
}
```

**Example State (Game in Progress)**:
```javascript
{
  board: ['X', 'O', '', 'X', '', '', '', '', ''],
  currentPlayer: 'O',
  gameActive: true,
  winner: null
}
```

**Example State (X Wins)**:
```javascript
{
  board: ['X', 'O', 'O', 'X', 'X', '', '', '', 'X'],
  currentPlayer: 'O',
  gameActive: false,
  winner: 'X'
}
```

**Example State (Draw)**:
```javascript
{
  board: ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'],
  currentPlayer: 'O',
  gameActive: false,
  winner: 'draw'
}
```

---

### Cell

Represents a single position on the game board.

**Attributes**:
- `index`: Number (0-8) - Position in the board array
- `value`: String - Current occupant of the cell
  - Valid values: `''` (empty), `'X'`, `'O'`
- `row`: Number (0-2) - Row position
  - Calculated as: `Math.floor(index / 3)`
- `col`: Number (0-2) - Column position
  - Calculated as: `index % 3`

**Note**: In implementation, cells are represented as strings within the board array. The Cell concept is primarily for UI mapping.

---

## State Transitions

### 1. Initialize Game

**Trigger**: Page load or reset button clicked

**Transformation**:
```
ANY_STATE → INITIAL_STATE
```

**Validation**: None required

**Result**:
- Board cleared (all cells empty)
- Current player set to 'X'
- Game activated
- Winner cleared

---

### 2. Make Move

**Trigger**: Player clicks on a cell

**Preconditions**:
- `gameActive === true`
- `board[cellIndex] === ''` (cell is empty)

**Transformation**:
```javascript
// Before
{ board: ['X', '', '', ...], currentPlayer: 'O', gameActive: true, winner: null }

// After (if valid move)
{ board: ['X', 'O', '', ...], currentPlayer: 'X', gameActive: true, winner: null }
```

**Validation Rules**:
1. Cell index must be 0-8
2. Cell must be empty
3. Game must be active
4. If any validation fails, state remains unchanged

**Side Effects**:
- Board updated at specified index
- Current player switches ('X' ↔ 'O')
- Check for winner/draw (may change `gameActive` and `winner`)

---

### 3. Check Winner

**Trigger**: After every move

**Preconditions**: None (can check at any time)

**Winning Combinations**:
```javascript
[
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal \
  [2, 4, 6]  // Diagonal /
]
```

**Logic**:
```
FOR each winning combination:
  IF all three cells contain the same non-empty mark:
    RETURN that mark ('X' or 'O')
RETURN null (no winner)
```

**Transformation** (if winner found):
```javascript
// Before
{ board: ['X', 'X', 'X', ...], ..., gameActive: true, winner: null }

// After
{ board: ['X', 'X', 'X', ...], ..., gameActive: false, winner: 'X' }
```

---

### 4. Check Draw

**Trigger**: After every move (if no winner found)

**Preconditions**:
- No winner exists
- All 9 cells are filled

**Logic**:
```
IF board contains no empty strings (''):
  Game is a draw
```

**Transformation**:
```javascript
// Before
{ board: ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'], ..., gameActive: true, winner: null }

// After
{ board: ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'], ..., gameActive: false, winner: 'draw' }
```

---

### 5. Reset Game

**Trigger**: Reset button clicked

**Preconditions**: None (can reset at any time)

**Transformation**:
```
ANY_STATE → INITIAL_STATE
```

**Result**: Same as "Initialize Game"

---

## State Validation Rules

### Valid Move Rules

1. **Cell Index**: Must be integer between 0-8 inclusive
2. **Cell Empty**: `board[cellIndex]` must equal `''`
3. **Game Active**: `gameActive` must be `true`
4. **Valid Player**: `currentPlayer` must be `'X'` or `'O'`

### Invariants

Rules that must always be true:

1. **Board Length**: `board.length === 9` always
2. **Cell Values**: Each cell contains only `''`, `'X'`, or `'O'`
3. **Player Values**: `currentPlayer` is only `'X'` or `'O'`
4. **Winner Values**: `winner` is only `'X'`, `'O'`, `'draw'`, or `null`
5. **Game Active Logic**: If `winner !== null`, then `gameActive === false`
6. **Winner Exists**: If `gameActive === false`, then `winner !== null`

---

## State Queries

Functions that read but don't modify state:

### `getCell(state, index)`
Returns the value at a specific cell index.

**Input**: `GameState`, cell index (0-8)  
**Output**: `''`, `'X'`, or `'O'`

### `getCurrentPlayer(state)`
Returns whose turn it is.

**Input**: `GameState`  
**Output**: `'X'` or `'O'`

### `isGameActive(state)`
Returns whether moves can still be made.

**Input**: `GameState`  
**Output**: Boolean

### `getWinner(state)`
Returns the game outcome.

**Input**: `GameState`  
**Output**: `'X'`, `'O'`, `'draw'`, or `null`

### `isValidMove(state, index)`
Checks if a move is legal.

**Input**: `GameState`, cell index (0-8)  
**Output**: Boolean

**Logic**:
```javascript
return (
  state.gameActive &&
  index >= 0 &&
  index <= 8 &&
  state.board[index] === ''
);
```

---

## State Mutations

Functions that create new state (or modify in place):

### `makeMove(state, cellIndex)`
Attempts to place current player's mark.

**Input**: Current state, cell index  
**Output**: New state  
**Side Effects**: May trigger winner/draw check

### `resetGame(state)`
Creates fresh initial state.

**Input**: Current state (ignored)  
**Output**: Initial state

### `checkWinner(state)`
Evaluates board for winning condition.

**Input**: Current state  
**Output**: State with updated `winner` and `gameActive` (if winner found)

### `checkDraw(state)`
Evaluates if board is full without winner.

**Input**: Current state  
**Output**: State with updated `winner` and `gameActive` (if draw)

---

## Data Flow

```
User Click
    ↓
Validate Move (isValidMove)
    ↓
Update Board (makeMove)
    ↓
Check Winner (checkWinner)
    ↓
Check Draw (checkDraw)
    ↓
Switch Player
    ↓
Update UI (renderBoard, renderStatus)
```

---

## Implementation Notes

1. **Immutability**: Consider making state updates immutable (create new objects) for easier debugging and potential undo functionality
2. **State Storage**: State lives in memory only; no persistence between page loads
3. **State History**: Not tracked in v1; could be added later for undo/replay features
4. **Validation First**: Always validate before state changes
5. **Single Source of Truth**: GameState object is the sole source of truth; UI reflects state, never drives it

---

## Future Enhancements (Out of Scope for v1)

- Move history array for undo/redo
- Game statistics (wins, losses, draws)
- Player names/avatars
- Timed moves
- Sound effects state
- Animation states
