# Tasks: Tic-Tac-Toe Game

**Input**: Design documents from `/specs/001-tictactoe-game/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual browser testing only (no automated test suite required)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a single-page static web application:
- Root directory: `/workspaces/tictactoegame.github.io/`
- HTML: `index.html` at root
- JavaScript: `js/` directory
- CSS: `css/` directory

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic file structure

- [x] T001 Create directory structure: `css/` and `js/` folders at repository root
- [x] T002 [P] Create empty `css/styles.css` file with basic reset styles
- [x] T003 [P] Create empty `js/game.js` file with module comment header
- [x] T004 [P] Create empty `js/ui.js` file with module comment header
- [x] T005 [P] Create empty `js/main.js` file with module comment header

**Checkpoint**: Basic project structure ready - can now implement features

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core HTML structure and constants that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create `index.html` with semantic structure: head, body, viewport meta tag
- [x] T007 Add game container structure to `index.html`: status div, board div (with 9 cells), reset button
- [x] T008 Link CSS and JavaScript files in `index.html` (css/styles.css, js/game.js, js/ui.js, js/main.js)
- [x] T009 Add data-index attributes (0-8) to all cell elements in `index.html`
- [x] T010 Define WINNING_COMBINATIONS constant in `js/game.js`
- [x] T011 Add CSS Grid layout for game board in `css/styles.css`
- [x] T012 Add basic cell styling in `css/styles.css` (borders, sizing, cursor)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Play Complete Game (Priority: P1) 🎯 MVP

**Goal**: Two players can play a complete game from start to finish with win/draw detection

**Independent Test**: Open index.html in browser, take turns clicking cells, verify X and O alternate, verify winner detection for rows/columns/diagonals, verify draw detection when board fills

### Implementation for User Story 1

- [x] T013 [P] [US1] Implement `initGame()` function in `js/game.js` to create initial game state
- [x] T014 [P] [US1] Implement `getGameState()` helper function in `js/game.js` to return current state
- [x] T015 [US1] Implement `makeMove(state, cellIndex)` function in `js/game.js` with validation
- [x] T016 [US1] Implement `checkWinner(board)` function in `js/game.js` using WINNING_COMBINATIONS
- [x] T017 [US1] Implement `checkDraw(board)` function in `js/game.js` to detect full board
- [x] T018 [P] [US1] Implement `renderBoard(board, gameActive)` function in `js/ui.js` to display marks
- [x] T019 [P] [US1] Implement `renderStatus(currentPlayer, winner, gameActive)` function in `js/ui.js`
- [x] T020 [US1] Implement `bindCellClick(callback)` function in `js/ui.js` with event delegation
- [x] T021 [US1] Implement `render(state)` convenience function in `js/ui.js`
- [x] T022 [US1] Wire up game logic and UI in `js/main.js` initApp() function
- [x] T023 [US1] Add DOMContentLoaded event listener in `js/main.js` to call initApp()
- [x] T024 [US1] Add cell hover effects in `css/styles.css`
- [x] T025 [US1] Add occupied cell styling in `css/styles.css`
- [x] T026 [US1] Style X and O marks for readability in `css/styles.css`
- [ ] T027 [US1] Manual test: Play complete game to win (test all 8 winning combinations)
- [ ] T028 [US1] Manual test: Play complete game to draw (fill all cells without winner)
- [ ] T029 [US1] Manual test: Verify occupied cells cannot be clicked
- [ ] T030 [US1] Manual test: Verify no moves allowed after game ends

**Checkpoint**: User Story 1 complete and testable - players can play full games with win/draw detection

---

## Phase 4: User Story 2 - Reset and Replay (Priority: P2)

**Goal**: Players can reset the game at any time to start fresh

**Independent Test**: Play a partial game, click reset button, verify grid clears and new game starts with Player X first

### Implementation for User Story 2

- [x] T031 [US2] Implement `resetGame()` function in `js/game.js` that returns initial state
- [x] T032 [US2] Implement `bindResetClick(callback)` function in `js/ui.js`
- [x] T033 [US2] Wire up reset button in `js/main.js` initApp() function
- [x] T034 [US2] Add reset button styling in `css/styles.css` (positioning, colors, hover)
- [ ] T035 [US2] Manual test: Reset during active game, verify state clears
- [ ] T036 [US2] Manual test: Reset after win, verify new game starts
- [ ] T037 [US2] Manual test: Reset after draw, verify new game starts

**Checkpoint**: User Stories 1 AND 2 both work independently - can play and reset

---

## Phase 5: User Story 3 - Clear Game State Display (Priority: P2)

**Goal**: Players always know whose turn it is and when game has ended

**Independent Test**: Play through game scenarios, verify status messages update correctly at each stage

### Implementation for User Story 3

- [x] T038 [US3] Add status message container styling in `css/styles.css` (size, position, font)
- [x] T039 [US3] Enhance `renderStatus()` in `js/ui.js` with clear message formatting
- [x] T040 [US3] Add winner announcement styling in `css/styles.css` (bold, color)
- [x] T041 [US3] Add draw announcement styling in `css/styles.css`
- [x] T042 [US3] Update `renderBoard()` in `js/ui.js` to add visual indicator when game ends
- [x] T043 [US3] Add disabled cell styling in `css/styles.css` for ended games
- [ ] T044 [US3] Manual test: Verify turn indicator updates after each move
- [ ] T045 [US3] Manual test: Verify winner message displays correctly
- [ ] T046 [US3] Manual test: Verify draw message displays correctly
- [ ] T047 [US3] Manual test: Verify clear indication that game has ended

**Checkpoint**: All game state feedback is clear and visible

---

## Phase 6: User Story 4 - Responsive Design (Priority: P3)

**Goal**: Game works and looks good on mobile, tablet, and desktop

**Independent Test**: Open game in browser DevTools responsive mode, test at 320px, 768px, 1024px widths, verify layout adapts

### Implementation for User Story 4

- [x] T048 [P] [US4] Add mobile-first base styles in `css/styles.css` (min 320px width)
- [x] T049 [P] [US4] Ensure touch targets are minimum 44x44px in `css/styles.css`
- [x] T050 [P] [US4] Add tablet media query (min-width: 768px) in `css/styles.css`
- [x] T051 [P] [US4] Add desktop media query (min-width: 1024px) in `css/styles.css`
- [x] T052 [US4] Add container max-width and centering in `css/styles.css`
- [x] T053 [US4] Ensure game board scales proportionally in `css/styles.css`
- [x] T054 [US4] Adjust font sizes for different screen sizes in `css/styles.css`
- [ ] T055 [US4] Manual test: Test on mobile viewport (320px-480px width)
- [ ] T056 [US4] Manual test: Test on tablet viewport (768px-1024px width)
- [ ] T057 [US4] Manual test: Test on desktop viewport (1024px+ width)
- [ ] T058 [US4] Manual test: Verify no horizontal scrolling at any size
- [ ] T059 [US4] Manual test: Test on actual mobile device if available

**Checkpoint**: Game is fully responsive across all device sizes

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, accessibility, and documentation

- [x] T060 [P] Add ARIA labels to cells in `index.html` for accessibility
- [x] T061 [P] Add page title and meta description in `index.html`
- [x] T062 [P] Add semantic HTML improvements (proper heading structure) in `index.html`
- [x] T063 [P] Add focus styles for keyboard navigation in `css/styles.css`
- [x] T064 [P] Add color contrast verification in `css/styles.css` (WCAG AA minimum)
- [x] T065 [P] Add code comments and documentation in `js/game.js`
- [x] T066 [P] Add code comments and documentation in `js/ui.js`
- [x] T067 [P] Add code comments and documentation in `js/main.js`
- [x] T068 Update root `README.md` with game description and setup instructions
- [x] T069 Add console.error handling for edge cases in `js/game.js`
- [ ] T070 Final cross-browser test: Chrome
- [ ] T071 Final cross-browser test: Firefox
- [ ] T072 Final cross-browser test: Safari (if available)
- [ ] T073 Final cross-browser test: Edge
- [ ] T074 Performance check: Verify page load time <1 second
- [ ] T075 Performance check: Verify click response <100ms
- [ ] T076 Performance check: Verify total page weight <500KB

**Checkpoint**: Game is polished, accessible, and production-ready

---

## Dependencies & Execution Order

### Critical Path (Must Complete in Order)

```
Phase 1 (Setup) → Phase 2 (Foundation) → Phase 3 (US1: Play Game) → Phase 7 (Polish)
```

### Independent Parallel Work

Once Phase 2 is complete, these can be developed in parallel:
- User Story 1 tasks (T013-T030) - Core gameplay
- User Story 2 tasks (T031-T037) - Reset functionality (depends on US1 for game state)
- User Story 3 tasks (T038-T047) - Status display (depends on US1 for state changes)
- User Story 4 tasks (T048-T059) - Responsive design (independent of game logic)

### Story Dependencies

- **US1** (Play Complete Game): No dependencies - this is the MVP
- **US2** (Reset and Replay): Depends on US1 (needs game state to reset)
- **US3** (Clear Game State Display): Depends on US1 (needs game state to display)
- **US4** (Responsive Design): Independent - can implement anytime after Phase 2

### Recommended MVP Scope

**Minimum Viable Product**: Complete through Phase 3 (User Story 1 only)
- Players can play complete games
- Win and draw detection works
- Basic styling functional
- **Deploy this first** to get early feedback

**Enhanced MVP**: Add Phase 4 (User Story 2)
- Players can reset and play multiple games

**Full Feature Set**: Complete all phases
- All user stories implemented
- Responsive design complete
- Polished and accessible

---

## Parallel Execution Examples

### Phase 1 (Setup) - All Parallel

Developer A: T001, T002
Developer B: T003, T004, T005

### Phase 2 (Foundation) - Mixed

Developer A: T006, T007, T008, T009 (HTML structure - sequential)
Developer B: T010, T011, T012 (constants and CSS - parallel with HTML)

### Phase 3 (User Story 1) - Split by Module

Developer A: T013-T017 (game.js - game logic)
Developer B: T018-T021 (ui.js - UI rendering)
Developer C: T024-T026 (styles.css - styling)
Then: T022-T023 (integration by Developer A or B)
Finally: T027-T030 (manual testing by any developer)

### Phase 4-6 (User Stories 2-4) - Fully Parallel

After US1 is complete:
- Developer A: User Story 2 (T031-T037)
- Developer B: User Story 3 (T038-T047)
- Developer C: User Story 4 (T048-T059)

### Phase 7 (Polish) - Mostly Parallel

Most tasks (T060-T069) can be done in parallel
Testing tasks (T070-T076) done sequentially by tester

---

## Implementation Strategy

### Week 1: MVP (User Story 1)
- Day 1-2: Setup and Foundation (Phase 1-2)
- Day 3-4: Core gameplay implementation (Phase 3)
- Day 5: Testing and bug fixes

**Deliverable**: Working tic-tac-toe game deployable to GitHub Pages

### Week 2: Enhanced Features
- Day 1: Reset functionality (Phase 4)
- Day 2: Status display enhancements (Phase 5)
- Day 3-4: Responsive design (Phase 6)
- Day 5: Polish and final testing (Phase 7)

**Deliverable**: Full-featured, responsive, polished game

---

## Task Summary

- **Total Tasks**: 76
- **Setup & Foundation**: 12 tasks (T001-T012)
- **User Story 1 (MVP)**: 18 tasks (T013-T030)
- **User Story 2**: 7 tasks (T031-T037)
- **User Story 3**: 10 tasks (T038-T047)
- **User Story 4**: 12 tasks (T048-T059)
- **Polish**: 17 tasks (T060-T076)

**Parallelization Opportunities**: 
- Setup: 4 parallel tasks
- Foundation: Some parallelization (HTML vs CSS/JS)
- User Story 1: High parallelization (game.js, ui.js, styles.css independent)
- User Stories 2-4: Fully parallel after US1 complete
- Polish: Most tasks parallel

**Estimated Effort**: 
- Solo developer: 5-7 days
- Team of 3: 2-3 days (with good parallelization)

---

## Next Steps

1. Start with Phase 1 (Setup) - create directory structure
2. Complete Phase 2 (Foundation) - HTML structure and constants
3. Implement Phase 3 (User Story 1) - **DEPLOY THIS AS MVP**
4. Add remaining user stories incrementally
5. Polish and finalize

Use `/speckit.implement` to begin implementation with AI assistance.
