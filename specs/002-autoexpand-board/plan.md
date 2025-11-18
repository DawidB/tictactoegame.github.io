## Technical Implementation Plan: Autoexpanding Board (Feature 002)

**Feature**: Autoexpanding Tic-Tac-Toe Board  
**Branch**: `002-autoexpand-board`  
**Related Spec**: `specs/002-autoexpand-board/spec.md`

This plan describes how to evolve the existing fixed 3x3 tic-tac-toe implementation (Feature 001) into a dynamic NxN board that automatically expands after wins and draws, while preserving all existing behavior and constraints from the constitution.

---

## 1. Current State & Gap Analysis

### 1.1 Existing Implementation (Feature 001)

- **HTML** (`index.html`)
  - Board is a static 3x3 grid with 9 hard-coded `.cell` elements (data-index `0-8`).
  - Status area shows current player or result.
  - Reset button resets the game to initial 3x3 state.
- **CSS** (`css/styles.css`)
  - `.game-board` uses `grid-template-columns: repeat(3, 1fr);` (fixed to 3 columns).
  - `.cell` sized with `aspect-ratio: 1/1` and responsive font sizes.
- **Logic** (`js/game.js`)
  - `WINNING_COMBINATIONS` is a static array of 3-in-a-row combinations for 3x3 only.
  - Game state holds `board` as a fixed 9-element array.
  - `checkWinner` uses `WINNING_COMBINATIONS` only.
  - `checkDraw` checks if all 9 cells are filled.
  - `initGame`, `makeMove`, `resetGame`, `getGameState` assume 3x3.
- **UI** (`js/ui.js`)
  - Assumes exactly 9 `.cell` elements exist in the DOM.
  - `renderBoard` maps `board[index]` to `.cell[data-index="index"]`.
  - No awareness of dynamic board size or re-creation of cells.

### 1.2 Gaps vs. Autoexpanding Spec

- Board must support dynamic size (3x3 → 4x4 → ... up to at least 10x10).
- Win detection must work for any board size (3-in-a-row on NxN).
- Board expansion must preserve all existing marks and positions.
- UI must dynamically render the grid (cells, CSS grid columns, ARIA labels).
- Need visual indication for:
  - Current board size.
  - Winning combination highlighting.
  - Draw message before expansion.
- Reset must return to 3x3 regardless of current size.

---

## 2. Architecture & Module Changes

### 2.2 Updated Game State Shape

Extend existing game state object (in `js/game.js`) to:

- `board`: flat array of length `boardSize * boardSize` (as today but dynamic length).
- `boardSize`: integer (starting at 3, max 10).
- `currentPlayer`: `'X' | 'O'`.
- `gameActive`: boolean.
- `winner`: `null | 'X' | 'O' | 'draw'`.
- `lastWinningCombination`: `null | number[]` (indices of winning cells for highlighting).
- `isExpanding`: boolean (true between win/draw and completion of expansion; used to block clicks).

### 2.3 New / Updated Functions in `game.js`

**New helpers**:

- `createEmptyBoard(size: number): string[]`
  - Returns a flat array of length `size * size` filled with empty strings.

- `getLines(size: number): number[][]`
  - Generates all possible 3-cell lines (rows, columns, diagonals) for a given `size` where 3-in-a-row can occur.
  - For each cell, consider directions: right, down, down-right, down-left, ensuring indices stay within bounds.

- `checkWinnerDynamic(board: string[], size: number): { winner: 'X' | 'O' | null; combo: number[] | null }`
  - Uses `getLines(size)` or on-the-fly traversal to find any 3 identical non-empty marks.
  - Returns winning player and winning combination indices.

- `checkDrawDynamic(board: string[]): boolean`
  - Returns true if all cells are non-empty and `winner` is null.

- `expandBoard(state): GameState`
  - If `state.boardSize >= 10`, do **not** expand (cap at 10x10) – game continues on same board.
  - Else:
    - `newSize = state.boardSize + 1`.
    - Create new board of `newSize * newSize`, initialized with empty strings.
    - Copy existing marks from old board into top-left `size x size` sub-grid of the new board.
    - Update `boardSize`, `board`, clear `lastWinningCombination`, set `winner = null`, `gameActive = true`.
    - For win: `currentPlayer` remains the winner.
    - For draw: `currentPlayer` is toggled from last player.

**Updated public API**:

- `initGame()`
  - Initialize `boardSize = 3` and board via `createEmptyBoard(3)`.
  - Initialize all extra fields (`lastWinningCombination`, `isExpanding`).

- `makeMove(state, index)`
  - If `state.isExpanding` is true, ignore moves.
  - Validate `index` within `board.length` and cell is empty.
  - Place mark and compute:
    - `winnerResult = checkWinnerDynamic(board, boardSize)`.
    - `isDraw = !winnerResult.winner && checkDrawDynamic(board)`.
  - If win:
    - Set `winner`, `lastWinningCombination`, `gameActive = false`, `isExpanding = true`.
  - Else if draw:
    - Set `winner = 'draw'`, `gameActive = false`, `isExpanding = true`.
  - Else:
    - Toggle `currentPlayer` and keep `gameActive = true`.

- `resetGame()`
  - Reset to initial 3x3 state, ignoring previous `boardSize`.

- `getGameState()`
  - Expose `boardSize`, `lastWinningCombination`, `isExpanding` to UI.

> Note: We can keep the existing `WINNING_COMBINATIONS` constant for `boardSize === 3` as an optimization if desired, but the primary path will be `checkWinnerDynamic`.

---

## 3. UI & DOM Changes

### 3.1 Dynamic Board Rendering (`js/ui.js`)

Refactor UI to support dynamic creation of cells based on `boardSize`.

**New responsibilities**:

- `renderBoard(containerElement, board, boardSize, lastWinningCombination)`
  - Clear existing child nodes of `.game-board`.
  - Set an inline CSS variable or style: `style.setProperty('--board-size', boardSize)`.
  - Loop `index` from `0` to `board.length - 1`:
    - Create `.cell` element with `data-index` attribute.
    - Add text content from `board[index]`.
    - Add ARIA label like `"Row r, Column c, X"` or `"empty"`.
    - If `lastWinningCombination` includes `index`, add `cell--winning` class.
  - Append cells to `.game-board`.

- `renderStatus(state)`
  - If `state.isExpanding` is true and `state.winner` is `'X'` or `'O'` → show `"Player X wins! Expanding board..."`.
  - If `state.winner === 'draw'` → `"Draw! Expanding board..."`.
  - Else show `"Player X's turn — Board: NxN"`.

### 3.2 CSS Grid Updates (`css/styles.css`)

- Introduce CSS variable for board size:
  - `.game-board { display: grid; grid-template-columns: repeat(var(--board-size, 3), 1fr); }`.
- Ensure `.cell` sizing remains square via `aspect-ratio: 1 / 1`.
- Add a `.cell--winning` class to highlight winning combination.
- Adjust responsive rules to handle larger boards up to 10x10.

### 3.3 HTML Updates (`index.html`)

- Replace hard-coded 9 `.cell` elements with an empty `.game-board` container.
- Optionally add a dedicated `span` or element for board size indicator inside status area.

---

## 4. Board Expansion Flow & UX

### 4.1 Win Flow

1. Player clicks a cell → `makeMove` updates state with win.
2. State now has `winner = 'X' | 'O'`, `lastWinningCombination` set, `isExpanding = true`, `gameActive = false`.
3. UI `render` call:
   - Highlights winning cells via `cell--winning`.
   - Updates status to show winner + expansion message.
   - Disables clicks by honoring `isExpanding` flag.
4. After ~1 second (using `setTimeout`):
   - Call `expandBoard(state)` from logic module.
   - Update app-level state with expanded board.
   - Set `isExpanding = false` and `gameActive = true`.
5. Re-render board and status for new size.

### 4.2 Draw Flow

Same as win flow, except:

- `winner = 'draw'`, `lastWinningCombination = null`.
- Status shows draw message.
- `expandBoard` toggles `currentPlayer` to the opposite of last mover.

### 4.3 No Further Expansion at Max Size

- If `boardSize` reaches 10:
  - On win: Highlight winning combination but **do not** expand further.
  - On draw: Show draw message but keep board size at 10x10.
  - Clear `isExpanding` after highlight/delay so game can be reset.

---

## 5. Data Model & Index Mapping

### 5.1 Indexing Scheme

- Board is a flat array `board[index]` with `index = row * boardSize + col`.
- For a given `index`:
  - `row = Math.floor(index / boardSize)`
  - `col = index % boardSize`

This scheme is used consistently across:

- Win detection
- Draw detection
- Expansion (copying marks)
- UI ARIA labels

### 5.2 Expansion Copy Logic

- Given `oldSize` and `newSize = oldSize + 1`:
  - For each `row` in `[0, oldSize - 1]`:
    - For each `col` in `[0, oldSize - 1]`:
      - `oldIndex = row * oldSize + col`
      - `newIndex = row * newSize + col`
      - `newBoard[newIndex] = oldBoard[oldIndex]`
  - All other cells in `newBoard` remain empty.

---

## 6. Testing Strategy

### 6.1 Manual Test Scenarios

- Win on 3x3 → expand to 4x4 (X and O cases).
- Win on 4x4 → expand to 5x5, ensure marks preserved.
- Draw on 3x3 and 4x4 → expand, ensure alternating player starts.
- Reset at various sizes returns to 3x3.
- Highlight timing (~1s) before expansion.
- Max size behavior (10x10) with win/draw.

### 6.2 Technical Checks

- Verify board length is always `boardSize * boardSize`.
- Verify `checkWinnerDynamic` finds wins across rows, columns, diagonals.
- Confirm no off-by-one errors at board edges.
- Confirm no clicks are accepted when `isExpanding` is true.

---

## 7. Implementation Phases

### Phase 1 – Logic Refactor (`js/game.js`)

1. Introduce `boardSize` into state and `createEmptyBoard` helper.
2. Implement `getLines` and `checkWinnerDynamic`.
3. Implement `checkDrawDynamic`.
4. Integrate dynamic checks into `makeMove`.
5. Implement `expandBoard` and `isExpanding` handling.
6. Update `resetGame` and `getGameState`.

### Phase 2 – UI & CSS Adjustments

1. Update `index.html` to use empty `.game-board` container (no static cells).
2. Refactor `renderBoard` to dynamically create cells based on `boardSize`.
3. Add `cell--winning` support and highlight logic.
4. Introduce CSS variable `--board-size` and update `.game-board` grid.
5. Add responsive tweaks for larger boards up to 10x10.
6. Add board size display to status.

### Phase 3 – Expansion Flow & Polish

1. Implement highlight + delay + expand flow in `main.js` / UI layer.
2. Wire `isExpanding` flag to disable clicks.
3. Implement cap behavior at boardSize 10.
4. Validate ARIA labels and accessibility after dynamic rendering.
5. Run full manual regression for base 3x3 game.

---

## 8. Risks & Mitigations

- **Win detection performance** on larger boards.  
  Mitigation: keep board ≤10x10 and algorithm simple; performance impact negligible.

- **Visual clutter** on small screens with large boards.  
  Mitigation: scale font size, allow vertical scroll if needed.

- **Off-by-one index bugs** during expansion.  
  Mitigation: centralize mapping logic and test with multiple sizes.

- **User confusion** when board stops expanding at 10x10.  
  Mitigation: indicate max size reached in status message.
