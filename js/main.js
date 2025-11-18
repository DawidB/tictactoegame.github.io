/**
 * main.js - Application Initialization
 * 
 * Entry point that wires together game logic and UI.
 * Initializes the application when DOM is ready.
 */

/**
 * Initialize the application
 */
function initApp() {
  // Initialize game state
  let state = initGame();
  
  // Bind cell click handler
  bindCellClick((cellIndex) => {
    const result = makeMove(state, cellIndex);
    if (result.success) {
      state = result.state;
      render(state);
    }
  });
  
  // Bind reset button handler
  bindResetClick(() => {
    state = resetGame();
    render(state);
  });
  
  // Initial render
  render(state);
}

// Wait for DOM to load before initializing
document.addEventListener('DOMContentLoaded', initApp);
