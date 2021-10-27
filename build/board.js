/* eslint-disable no-undef */
var board1 = Chessboard("board1", {
  draggable: true,
  dropOffBoard: "trash",
  sparePieces: true,
});

document.getElementById("startBtn").addEventListener("click", () => board1.start());
document.getElementById("clearBtn").addEventListener("click", () => board1.clear());
