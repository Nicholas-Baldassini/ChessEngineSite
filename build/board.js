/* eslint-disable no-undef */

//let humanColour = Math.round(Math.random()) ? "white": "black"

const local = "http://localhost:5000/";
const resetLocal = "http://localhost:5000/reset";

const live = "https://chess-engine-backend.herokuapp.com/";
const resetLive = "https://chess-engine-backend.herokuapp.com/reset";

const localURLS = {home: local, reset: resetLocal}
const liveURLS = {home: local, reset: resetLive}

const URLS = [localURLS, liveURLS][1]



// let turn = ["white", "black"];
// let currentTurn = turn[0];

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
  // see if the move is legal
  //console.log("Droped");
  const moveObj = {
    from: source,
    to: target,
    promotion: "q", // NOTE: always promote to a queen for example simplicity
  };
  PostFEN(moveObj);
  //var move = game.move()

  // illegal move
  //if (move === null) return 'snapback'

  // make random legal move for black
  //window.setTimeout(makeRandomMove, 250)
}

async function PostFEN(pos) {
  const data = { key: pos };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(URLS.home, options)
    .then((response) => response.json())
    .then((data) => {
      //console.log("Success:", data.ASC);
      board1.position(data.ASC);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

var board1 = Chessboard("board1", {
  draggable: true,
  dropOffBoard: "snapback",
  sparePieces: true,
  showNotation: true,
  onDrop: onDrop,
  onDragStart: onDragStart,
});

document.getElementById("startBtn").addEventListener("click", () => {
  board1.start();
  ResetBoard();
});
document.getElementById("clearBtn").addEventListener("click", () => board1.clear());

async function ResetBoard() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(URLS.reset, options);
}
