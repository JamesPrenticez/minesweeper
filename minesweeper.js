
document.addEventListener('DOMContentLoaded', startGame)

/* Define your `board` object here!
var board = {
  "cells": [{row: 0,
             col: 0,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 0,
             col: 1,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 0,
             col: 2,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 1,
             col: 0,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 1,
             col: 1,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 1,
             col: 2,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 2,
             col: 0,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 2,
             col: 1,
             isMine: true,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            },
            {row: 2,
             col: 2,
             isMine: false,
             isMarked: false,
             hidden: true,
             surroundingMines: 0
            }
           ]
}
*/
//Sound Function
function sound() {
  var themesong = document.getElementById("themesong");
  themesong.play()
}

//Stop Audio



//Declare a board object
var board = {} 


//Loop through board adding row and col also update isMine with randomization
function createBoard(){
board.cells = []
  for (var i = 0; i < 6; i++){
    board.cells.push({row: 0, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  }
  for (var i = 0; i < 6; i++) {
  board.cells.push({row: 1, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  }
  for (var i = 0; i < 6; i++) {
  board.cells.push({row: 2, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  }
  for (var i = 0; i < 6; i++) {
  board.cells.push({row: 3, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  } 
  for (var i = 0; i < 6; i++) {
  board.cells.push({row: 4, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  } 
  for (var i = 0; i < 6; i++) {
  board.cells.push({row: 5, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
  }    
}


function startGame () {
  //call create board
  createBoard()

  //Event Listener for win condition
  document.addEventListener("mousedown", checkForWin)
  document.addEventListener("contextmenu", checkForWin)

  //Event Listener for play sound button  
  document.getElementById("play").addEventListener("click", sound)
  
  //Call resetBoard
  document.getElementById("reset").addEventListener("click", resetBoard); 

//JP - Cycle through "cells" and update value of "surroundingMines"
  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
    console.log(board.cells[i])
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  if (board.cells.every((cell) => (cell.isMine == false && cell.hidden == false) || (cell.isMine == true && cell.isMarked == true))) {
    lib.displayMessage('You win!')
}
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
//JP- Assign value of getSurroundingCells to a variable "surrounding"
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var countMines = 0;
//JP - Loop through surroundingCells if true then add to count
  for (var i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine == true){
    countMines++;
    }
  }
//JP - Dont forget to return the result!
  return countMines
}

function resetBoard() {
  document.getElementsByClassName("board")[0].remove();
  newBoard = document.createElement("div")
  newBoard.className = 'board'
  document.getElementsByTagName('body')[0].insertBefore(newBoard, document.getElementById('reset'))

  board = {}
  
  createBoard()

  lib.initBoard()
}


