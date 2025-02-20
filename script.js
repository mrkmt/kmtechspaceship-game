const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const rows = 3;
const cols = 3;
const pieceWidth = canvas.width / cols;
const pieceHeight = canvas.height / rows;

const pieces = [];
let emptyPiece = { x: 2, y: 2 }; // The position of the empty piece
let isAutoPlay = false;  // Toggle auto-play mode

const img = new Image();
img.src = "puzzle-image.jpg"; // Replace with your puzzle image

img.onload = () => {
    createPuzzle();
    drawPuzzle();
    if (isAutoPlay) {
        startAutoPlay();
    }
};

// Create puzzle pieces
function createPuzzle() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (!(x === 2 && y === 2)) { // Skip the empty piece
                pieces.push({ x, y });
            }
        }
    }
}

// Draw puzzle on canvas
function drawPuzzle() {
    pieces.forEach(piece => {
        ctx.drawImage(
            img,
            piece.x * pieceWidth,
            piece.y * pieceHeight,
            pieceWidth,
            pieceHeight,
            piece.x * pieceWidth,
            piece.y * pieceHeight,
            pieceWidth,
            pieceHeight
        );
    });
}

// Start auto-play to solve the puzzle
function startAutoPlay() {
    let moveIndex = 0;
    const moves = [
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
    ];
    const interval = setInterval(() => {
        if (moveIndex < moves.length) {
            const move = moves[moveIndex];
            movePiece(move.x, move.y);
            moveIndex++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Delay between moves (1 second)
}

// Move a puzzle piece to the empty space
function movePiece(x, y) {
    const pieceIndex = pieces.findIndex(piece => piece.x === x && piece.y === y);
    if (pieceIndex !== -1) {
        // Swap piece positions
        [pieces[pieceIndex], emptyPiece] = [emptyPiece, pieces[pieceIndex]];
        drawPuzzle();
    }
}
