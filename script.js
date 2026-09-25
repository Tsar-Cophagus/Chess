const boardElement = document.getElementById("board");
const settingsIcon = document.getElementById("settings-icon");
const settingsMenu = document.getElementById("settings-menu");
const resetBtn = document.getElementById("reset-btn");
const closeSettings = document.getElementById("close-settings");

let selectedSquare = null;
let legalMoves = [];

const initialBoard = [
  ["♜","♞","♝","♛","♚","♝","♞","♜"],
  ["♟","♟","♟","♟","♟","♟","♟","♟"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["♙","♙","♙","♙","♙","♙","♙","♙"],
  ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

let board = JSON.parse(JSON.stringify(initialBoard));

function drawBoard() {
  boardElement.innerHTML = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((r + c) % 2 === 0 ? "light" : "dark");
      square.dataset.row = r;
      square.dataset.col = c;
      square.textContent = board[r][c];
      square.addEventListener("click", () => handleClick(r, c));
      boardElement.appendChild(square);
    }
  }
}

function clearHighlights() {
  document.querySelectorAll(".highlight").forEach(el => {
    el.classList.remove("highlight");
  });
}

function handleClick(r, c) {
  const piece = board[r][c];

  if (legalMoves.some(m => m.r === r && m.c === c)) {
    board[r][c] = board[selectedSquare.r][selectedSquare.c];
    board[selectedSquare.r][selectedSquare.c] = "";
    selectedSquare = null;
    legalMoves = [];
    clearHighlights();
    drawBoard();
    return;
  }

  selectedSquare = { r, c };
  legalMoves = getLegalMoves(r, c);
  clearHighlights();

  legalMoves.forEach(move => {
    const sq = document.querySelector(
      `.square[data-row='${move.r}'][data-col='${move.c}']`
    );
    sq.classList.add("highlight");
  });
}

function getLegalMoves(r, c) {
  return [
    { r: r + 1, c },
    { r: r - 1, c },
    { r, c + 1 },
    { r, c - 1 }
  ].filter(m => m.r >= 0 && m.r < 8 && m.c >= 0 && m.c < 8);
}

settingsIcon.onclick = () => settingsMenu.classList.toggle("hidden");
closeSettings.onclick = () => settingsMenu.classList.add("hidden");

resetBtn.onclick = () => {
  board = JSON.parse(JSON.stringify(initialBoard));
  drawBoard();
};

drawBoard();
