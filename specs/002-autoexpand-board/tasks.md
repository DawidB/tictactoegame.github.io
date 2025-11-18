# Tasks: Feature 002 - Autoexpanding Board

This file breaks down the implementation plan for the autoexpanding tic-tac-toe board into concrete, trackable tasks.

Status legend:
- [ ] Not started
- [·] In progress
- [x] Done

---

## Phase 1 – Logic Refactor (`js/game.js`)

**Goal**: Support dynamic board sizes, wins/draws on any size, and board expansion.

1. [ ] T002-001 – Add `boardSize` to game state returned by `initGame()` and initialize to 3
2. [ ] T002-002 – Implement `createEmptyBoard(size)` helper to produce an empty flat board
3. [ ] T002-003 – Refactor `initGame()` to use `createEmptyBoard(3)` and initialize new fields (`lastWinningCombination`, `isExpanding`)
4. [ ] T002-004 – Introduce indexing helpers (row/col ↔ index) inside `game.js`
5. [ ] T002-005 – Implement `getLines(size)` or equivalent directional scanning for possible 3-in-a-row lines
6. [ ] T002-006 – Implement `checkWinnerDynamic(board, size)` that returns `{ winner, combo }`
7. [ ] T002-007 – Implement `checkDrawDynamic(board)` that works for any board size
8. [ ] T002-008 – Update existing `checkWinner` to delegate to dynamic win detection (keep 3x3 optimization optional)
9. [ ] T002-009 – Update existing `checkDraw` to use dynamic draw detection
10. [ ] T002-010 – Extend `makeMove(state, index)` to:
    - Ignore moves when `state.isExpanding` is true
    - Use `boardSize` in dynamic winner/draw checks
    - Set `winner`, `lastWinningCombination`, `isExpanding`, and `gameActive` correctly
11. [ ] T002-011 – Implement `expandBoard(state)` that:
    - Caps at 10x10 (no further expansion beyond 10)
    - Creates new board with `newSize = boardSize + 1`
    - Copies marks into top-left `size x size` sub-grid
    - Resets `winner`, `lastWinningCombination`, `isExpanding`, `gameActive`
    - Sets `currentPlayer` correctly (winner continues; draw alternates)
12. [ ] T002-012 – Update `resetGame()` to fully reset to 3x3 (all new fields cleared)
13. [ ] T002-013 – Ensure `getGameState()` exposes `boardSize`, `lastWinningCombination`, and `isExpanding`
14. [ ] T002-014 – Add/adjust inline JSDoc-style comments if present in existing code style

---

## Phase 2 – UI & CSS Adjustments (`index.html`, `css/styles.css`, `js/ui.js`)

**Goal**: Render a dynamic grid, display board size, and support highlighting.

15. [ ] T002-015 – Update `index.html` to remove hard-coded 9 `.cell` elements, leaving an empty `.game-board` container
16. [ ] T002-016 – Add markup for board size display (or decide to integrate board size into existing status element)
17. [ ] T002-017 – In `css/styles.css`, introduce `--board-size` CSS variable for `.game-board`
18. [ ] T002-018 – Update `.game-board` to use `grid-template-columns: repeat(var(--board-size, 3), 1fr)`
19. [ ] T002-019 – Add `.cell--winning` class for winning combination highlight (accessible colors)
20. [ ] T002-020 – Review and adjust responsive styles to keep boards up to 10x10 usable on mobile/tablet/desktop
21. [ ] T002-021 – In `js/ui.js`, refactor `renderBoard` to:
    - Clear current `.game-board` content
    - Create cells dynamically based on `board.length` and `boardSize`
    - Set `data-index` and text content
    - Apply `.cell--winning` when `lastWinningCombination` includes index
22. [ ] T002-022 – Update `renderStatus` (or equivalent) to include current board size (e.g., "Board: 4×4")
23. [ ] T002-023 – Ensure ARIA attributes are applied to dynamically created cells (row/column, contents)
24. [ ] T002-024 – Verify `bindCellClick` still works correctly with dynamically created cells

---

## Phase 3 – Expansion Flow & UX (`js/main.js`, integration)

**Goal**: Provide win/draw highlight, timed expansion, and max-size behaviour.

25. [ ] T002-025 – In `main.js`, integrate `lastWinningCombination` and `isExpanding` into the main render flow
26. [ ] T002-026 – Implement highlight → delay → expand flow:
    - On win/draw, render highlight/message
    - Use `setTimeout` (~1 second) to trigger `expandBoard`
    - After expansion, re-render and clear expansion state
27. [ ] T002-027 – Ensure clicks are ignored while `isExpanding` is true (logic + UI guards)
28. [ ] T002-028 – Implement max-size behavior (10x10):
    - Show appropriate status (e.g., "Max board size reached")
    - Do not call `expandBoard` when at max size
29. [ ] T002-029 – Confirm reset works correctly from any board size and any game state (including during/after expansion)
30. [ ] T002-030 – Verify base 3x3 game flow is unchanged in UX (apart from new features)

---

## Phase 4 – Testing & Polish

**Goal**: Validate behaviour against spec and constitution, and tidy up.

31. [ ] T002-031 – Manually test win expansion: X wins on 3x3 → 4x4
32. [ ] T002-032 – Manually test win expansion: O wins on 4x4 → 5x5
33. [ ] T002-033 – Manually test draw expansion: draw on 3x3 → 4x4, turn alternates
34. [ ] T002-034 – Manually test draw expansion: draw on 4x4 → 5x5
35. [ ] T002-035 – Manually verify highlight timing (~1 second) before expansion
36. [ ] T002-036 – Manually test reset from various sizes (4x4, 6x6, 10x10)
37. [ ] T002-037 – Manually test behaviour at max size 10x10 (win/draw, no further expansion)
38. [ ] T002-038 – Manually test responsiveness and usability on small viewport (mobile dev tools)
39. [ ] T002-039 – Run a quick code review pass for readability and consistency with existing style
40. [ ] T002-040 – Update `README.md` with a short description of the autoexpanding feature and any usage notes

---

## Optional Enhancements (Stretch)

These are not required for the core feature but may be nice to have if time permits.

41. [ ] T002-041 – Add subtle animation to cell appearance when board expands
42. [ ] T002-042 – Add a small textual indicator when max board size is reached (e.g., "Max size reached; reset to start over")
43. [ ] T002-043 – Add developer comments in `specs/002-autoexpand-board/quickstart.md` (if created) with hints on testing large boards
