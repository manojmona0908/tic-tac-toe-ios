// ========================================
// TIC TAC TOE GAME
// ========================================

// Get HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");


// ========================================
// GAME VARIABLES
// ========================================

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;


// All possible winning combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row

    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column

    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];


// ========================================
// CELL CLICK
// ========================================

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});


function handleCellClick(event) {

    const clickedCell = event.target;

    const clickedIndex = clickedCell.dataset.index;


    // Don't allow clicking an occupied cell
    // or clicking after game ends
    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }


    // Add player's symbol
    board[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;

    clickedCell.classList.add(
        currentPlayer.toLowerCase()
    );


    // Check game status
    checkGame();
}


// ========================================
// CHECK GAME
// ========================================

function checkGame() {

    let roundWon = false;

    let winningCombination = null;


    // Check all winning combinations
    for (let i = 0; i < winningConditions.length; i++) {

        const [a, b, c] = winningConditions[i];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            roundWon = true;

            winningCombination = winningConditions[i];

            break;
        }
    }


    // ================================
    // WIN
    // ================================

    if (roundWon) {

        statusText.textContent =
            `Player ${currentPlayer} Wins! 🎉`;

        gameActive = false;


        // Highlight winning cells
        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        return;
    }


    // ================================
    // DRAW
    // ================================

    if (!board.includes("")) {

        statusText.textContent = "It's a Draw! 🤝";

        gameActive = false;

        return;
    }


    // ================================
    // CHANGE PLAYER
    // ================================

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";


    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}


// ========================================
// RESTART GAME
// ========================================

restartBtn.addEventListener("click", restartGame);


function restartGame() {

    // Reset board
    board = ["", "", "", "", "", "", "", "", ""];


    // Reset player
    currentPlayer = "X";


    // Enable game
    gameActive = true;


    // Reset status
    statusText.textContent = "Player X's Turn";


    // Clear all cells
    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );
    });
}