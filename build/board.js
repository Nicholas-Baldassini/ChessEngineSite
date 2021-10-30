/* eslint-disable no-undef */
const local = "http://localhost:5000/";
const getMoveLocal = "http://localhost:5000/getMove";

const live = "https://chess-engine-backend.herokuapp.com/";
const getMoveLive = "https://chess-engine-backend.herokuapp.com/getMove";

const localURLS = { home: local, getMove: getMoveLocal };
const liveURLS = { home: live, getMove: getMoveLive };

const URLS = [localURLS, liveURLS][1]; //0-local, 1-live

async function getMove(gameParam) {
  const data = { gameKey: gameParam };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  // GET on .../
  fetch(URLS.getMove, options)
    .then((response) => response.json())
    .then((response) => {
      game.load_pgn(response.PGN);
      board.position(game.fen());
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
}

var board = null;
var game = new Chess();

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false;
}

function makeRandomMove() {
  var possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) return;

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: "q", // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return "snapback";

  // make random legal move for black
  //window.setTimeout(makeRandomMove, 250);

  getMove(game.pgn());
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
}

var config = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
};
board = Chessboard("board1", config);

// Buttons
document.getElementById("startBtn").addEventListener("click", () => {
  board.start();
  game.reset();
});
document.getElementById("clearBtn").addEventListener("click", () => {
  board.clear();
  game.reset();
});
