# Tic-Tac-Toe Game 

A classic tic-tac-toe game built with vanilla JavaScript, HTML5, and CSS3. Play against a friend on the same device!

## Features

- **Two-Player Gameplay**: Take turns playing as X and O
- **Win Detection**: Automatically detects wins (rows, columns, diagonals) and draws
- **Game Reset**: Start a new game anytime with the reset button
- **Responsive Design**: Works great on mobile, tablet, and desktop
- **Accessible**: Keyboard navigation and screen reader support
- **Clean UI**: Modern, intuitive interface with smooth animations

## Live Demo

Visit the game at: `https://dawidb.github.io/tictactoegame.github.io`

## Quick Start

### Option 1: Open Directly
1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

## How to Play

1. Player X always goes first
2. Click any empty cell to place your mark
3. Players alternate turns (X → O → X → O...)
4. First player to get 3 in a row (horizontally, vertically, or diagonally) wins
5. If all 9 cells are filled without a winner, the game is a draw
6. Click "Reset Game" to start over at any time

## Project Structure

```
tictactoegame.github.io/
├── index.html          # Main game page
├── css/
│   └── styles.css      # All game styling
├── js/
│   ├── game.js         # Game logic and state management
│   ├── ui.js           # UI rendering and events
│   └── main.js         # Application initialization
├── specs/              # Project specifications and documentation
└── README.md           # This file
```

## Technology Stack

- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Grid layout with responsive design
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **No Build Tools**: Works directly in the browser

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Development

### File Organization

- **game.js**: Pure game logic (state, rules, win/draw detection)
- **ui.js**: DOM manipulation and event handling
- **main.js**: Application initialization and coordination
- **styles.css**: All styling with mobile-first approach

### Making Changes

1. Edit the relevant file (HTML, CSS, or JS)
2. Save the file
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R for hard refresh)
4. Test your changes

No build process required!

## Testing

Manual testing checklist:
- [ ] Play a game to win (test all 8 winning combinations)
- [ ] Play a game to draw
- [ ] Click occupied cells (should do nothing)
- [ ] Try to play after game ends (should be disabled)
- [ ] Reset during active game
- [ ] Reset after win/draw
- [ ] Test on mobile device (or DevTools responsive mode)
- [ ] Test keyboard navigation (Tab + Enter/Space)

## Performance

- Page load: <1 second
- Click response: <100ms
- Total page weight: <500KB

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support (Tab + Enter/Space)
- Focus indicators
- Screen reader compatible

## License

MIT License - feel free to use this code for learning or your own projects!

## Credits

Created as part of a software engineering learning exercise using the Specify methodology.
