/* eslint-disable no-undef */
const port = 4000;
const local = `http://localhost:${port}/`;
const getMoveLocal = `http://localhost:${port}/getMove`;

const live = "https://chess-engine-backend.herokuapp.com/";
const getMoveLive = "https://chess-engine-backend.herokuapp.com/getMove";

const localURLS = { home: local, getMove: getMoveLocal };
const liveURLS = { home: live, getMove: getMoveLive };

const URLS = [localURLS, liveURLS][1]; //0-local, 1-live

var humanColour = "w";
var freelyMove = true;
// toggle above when playing computer

async function getMove(gameParam) {
  //gameParam is the pgn string of the current of the chess instance
  const data = { gameKey: gameParam };
  const options = {
    method: "POST",
    body: JSON.stringify(data), // sends client chess game as a pgn to backend
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Backend server sends a pgn, updates chess instance, then board updates
  // from chess instance
  fetch(URLS.getMove, options)
    .then((response) => response.json())
    .then((response) => {
      //set client chess instance to pgn
      //game.load_pgn(response.PGN);
      game.move(response.PGN);

      //set client board placement from chess instance
      board.position(game.fen());
      /*
                  does not make a move based on current board but rather completely sets the board
                  to a new position given the response pgn. This response pgn is a position one move
                  after the clien board
                  */
      console.log(response.PGN);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
}

//Chessboard
var board = null;
//Chess game
var game = new Chess();

//Chess game instance is what makes this whole application work, after every move
// the client chess game instance, which is the above variable, is passed for the server side
// then the server side operates on the clients game instead of just passing move by move to the server
// this allows multiple user to play at the same time

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for White
  if (!freelyMove) {
    if (humanColour === "w") {
      if (piece.search(/^b/) !== -1) return false;
    } else {
      if (piece.search(/^w/) !== -1) return false;
    }
  }
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
  if (!freelyMove) {
    getMove(game.pgn());
  }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen());
}

// configuration files, custom defined functions
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
document.getElementById("flipBtn").addEventListener("click", () => {
  board.flip();
  humanColour = humanColour === "w" ? "b" : "w";
});
document.getElementById("calcBtn").addEventListener("click", () => {
  //makeRandomMove();
  getMove(game.pgn());
});
document.getElementById("pgnLabel").addEventListener("keydown", (event) => {
  // executes on enter or any key
  game.reset();
  game.load_pgn(event.target.value);

  board.position(game.fen());
});
