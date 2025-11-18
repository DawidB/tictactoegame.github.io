# Quick Start Guide: Tic-Tac-Toe Game

**Feature**: 001-tictactoe-game  
**Created**: 2025-11-17  
**Purpose**: Get started developing and testing the game

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge - current or previous version)
- Text editor or IDE
- Git (for version control)
- No build tools, package managers, or dependencies required

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DawidB/tictactoegame.github.io.git
cd tictactoegame.github.io
```

### 2. Checkout the Feature Branch

```bash
git checkout 001-tictactoe-game
```

### 3. Open the Game

Simply open `index.html` in your browser:

**Option A - Double Click**:
- Navigate to the project folder
- Double-click `index.html`

**Option B - Command Line**:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

**Option C - VS Code Live Server** (if installed):
- Right-click `index.html`
- Select "Open with Live Server"

That's it! No build step required.

## Project Structure

```
tictactoegame.github.io/
├── index.html           # Main game page (START HERE)
├── css/
│   └── styles.css       # All game styling
├── js/
│   ├── game.js          # Game logic: state, rules, win detection
│   ├── ui.js            # UI rendering and event handling
│   └── main.js          # App initialization
├── specs/
│   └── 001-tictactoe-game/
│       ├── spec.md      # Feature requirements
│       ├── plan.md      # Implementation plan
│       ├── data-model.md    # Game state model
│       ├── research.md      # Technical decisions
│       └── quickstart.md    # This file
└── README.md
```

## Making Changes

### HTML Changes (`index.html`)

1. Open `index.html` in your editor
2. Make changes to structure
3. Save file
4. Refresh browser to see changes

**Key Elements**:
- `.game-container` - Main wrapper
- `.game-status` - Shows turn/winner
- `.game-board` - 3x3 grid container
- `.cell` - Individual grid cells (9 total)
- `.reset-button` - Reset game button

### CSS Changes (`css/styles.css`)

1. Open `css/styles.css` in your editor
2. Modify styles
3. Save file
4. Refresh browser (Ctrl+F5 or Cmd+Shift+R for hard refresh)

**Key Classes**:
- `.game-board` - Grid layout
- `.cell` - Cell styling and hover states
- `.cell.occupied` - Cells with marks
- `.game-status` - Status message styling

### JavaScript Changes (`js/*.js`)

1. Open the relevant JS file
2. Make changes
3. Save file
4. Refresh browser (errors appear in DevTools console)

**Module Responsibilities**:
- `game.js` - Change game logic, rules, state management
- `ui.js` - Change how game renders, event handling
- `main.js` - Change app initialization, wiring

## Development Workflow

### 1. Open DevTools

**Chrome/Edge**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)  
**Firefox**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)  
**Safari**: Cmd+Option+I (enable in Preferences → Advanced first)

### 2. View Console

Check for JavaScript errors:
- Console tab shows errors and logs
- Red text = errors that need fixing
- Yellow text = warnings

### 3. Test Changes

Manual testing checklist:
- [ ] Click each cell - mark appears
- [ ] Make 3 in a row - winner announced
- [ ] Fill board with no winner - draw announced
- [ ] Click occupied cell - nothing happens
- [ ] Click after game ends - nothing happens
- [ ] Click reset - game clears and restarts
- [ ] Resize window - layout stays responsive

### 4. Debug Issues

**If cells don't respond to clicks**:
1. Check Console for JavaScript errors
2. Verify `data-index` attributes on cells (0-8)
3. Check that `main.js` is loading

**If game doesn't detect winner**:
1. Check `game.js` → `checkWinner()` function
2. Verify `WINNING_COMBINATIONS` array
3. Log board state to console

**If layout is broken**:
1. Check `css/styles.css` for syntax errors
2. Inspect element in DevTools
3. Check grid CSS properties

## Testing on Multiple Devices

### Desktop Testing

Test in all available browsers:
- Chrome/Chromium
- Firefox
- Safari (macOS)
- Edge

### Mobile Testing

**Option A - Device Simulation**:
1. Open DevTools (F12)
2. Click device toggle icon (or Ctrl+Shift+M)
3. Select device from dropdown
4. Test touch interactions

**Option B - Real Device**:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if installed)
   npx http-server -p 8000
   ```
3. On mobile device, navigate to `http://[your-ip]:8000`
4. Test on actual device

### Responsive Testing Checklist

- [ ] Mobile portrait (320px width minimum)
- [ ] Mobile landscape (480px+ width)
- [ ] Tablet (768px+ width)
- [ ] Desktop (1024px+ width)
- [ ] Touch targets ≥44x44px on mobile
- [ ] No horizontal scrolling at any size

## Common Tasks

### Add Console Logging

```javascript
// In game.js or ui.js
console.log('Current state:', state);
console.log('Cell clicked:', cellIndex);
```

### Change Cell Symbols

In `ui.js`, find where cells are rendered:
```javascript
cellElement.textContent = mark; // 'X' or 'O'
```

Change to Unicode symbols:
```javascript
cellElement.textContent = mark === 'X' ? '✕' : '○';
```

### Adjust Grid Size

In `css/styles.css`:
```css
.game-board {
  max-width: 400px; /* Change this value */
}
```

### Change Colors

In `css/styles.css`:
```css
.cell {
  background: white;    /* Cell background */
  border: 2px solid #333; /* Cell border */
  color: #333;          /* Text color */
}
```

## Committing Changes

```bash
# Check what changed
git status
git diff

# Stage changes
git add index.html css/styles.css js/game.js

# Commit with clear message
git commit -m "Add win detection for diagonal lines"

# Push to remote
git push origin 001-tictactoe-game
```

## Deployment to GitHub Pages

### Option 1: Deploy from Feature Branch

1. Go to repository settings on GitHub
2. Navigate to "Pages" section
3. Under "Source", select branch: `001-tictactoe-game`
4. Click "Save"
5. Site will be published at: `https://dawidb.github.io/tictactoegame.github.io`

### Option 2: Merge to Main (Recommended)

1. Complete development and testing
2. Create pull request: `001-tictactoe-game` → `main`
3. Review changes
4. Merge pull request
5. In repository settings → Pages, set source to `main` branch
6. Site automatically deploys on merge

**Deployment Time**: Usually 1-5 minutes after push

## Troubleshooting

### JavaScript Not Working

**Symptom**: Clicks do nothing, no errors visible

**Fixes**:
1. Check that `<script>` tags are at end of `<body>`
2. Verify file paths: `./js/main.js` not `js/main.js`
3. Check for typos in function names
4. Look at Console for errors

### CSS Not Loading

**Symptom**: Game has no styling

**Fixes**:
1. Verify `<link>` tag in `<head>`: `<link rel="stylesheet" href="./css/styles.css">`
2. Check file path is correct
3. Hard refresh: Ctrl+F5 or Cmd+Shift+R
4. Check for CSS syntax errors

### Game State Gets Stuck

**Symptom**: Can't make moves after certain actions

**Fixes**:
1. Check `gameActive` flag in state
2. Verify `resetGame()` sets `gameActive = true`
3. Check winner detection doesn't have false positives
4. Add console logging to track state changes

### Layout Broken on Mobile

**Symptom**: Elements overlap or require horizontal scrolling

**Fixes**:
1. Check viewport meta tag exists: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Test in DevTools device mode
3. Check CSS media queries
4. Ensure max-width is set, not fixed width

## Resources

### Documentation

- [Specification](./spec.md) - What the game should do
- [Implementation Plan](./plan.md) - How it's built
- [Data Model](./data-model.md) - Game state structure
- [Contracts](./contracts/javascript-modules.md) - Module interfaces
- [Research](./research.md) - Technical decisions

### Web References

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript reference
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript ES6 Features](https://github.com/lukehoban/es6features)

### Browser DevTools Guides

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Firefox Developer Tools](https://firefox-source-docs.mozilla.org/devtools-user/)
- [Safari Web Inspector](https://webkit.org/web-inspector/)

## Getting Help

1. **Check Console**: Most issues show errors in DevTools console
2. **Read Docs**: Review spec.md and data-model.md for requirements
3. **Check Contracts**: Verify function signatures match contracts/javascript-modules.md
4. **Test in Isolation**: Comment out code to isolate the problem
5. **Git Diff**: See what changed: `git diff`

## Next Steps

Once comfortable with the codebase:

1. Review [tasks.md](./tasks.md) for implementation tasks (when created)
2. Pick a task to implement
3. Write the code
4. Test thoroughly
5. Commit and push changes
6. Move to next task

Happy coding! 🎮
