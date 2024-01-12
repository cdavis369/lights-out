import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard;
    // TODO: create array-of-arrays of true/false values
    let offNum = 3;
    while (offNum % 2 !== 0 ) {
      offNum = 0;
      initialBoard = [];
      for (let r = 0; r < nrows; r++) {
        const row = [];
        for (let c = 0; c < ncols; c++) {
          const lit = Math.floor(Math.random() * 2)  === 0 ? false : true;
          row.push(lit);
          if (!lit) offNum++;
          
        }
        initialBoard.push(row);
      }
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return "WON!";
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(x, y, newBoard);
      flipCell(x-1, y, newBoard);
      flipCell(x+1, y, newBoard);
      flipCell(x, y-1, newBoard);
      flipCell(x, y+1, newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  function hasWon() {
    for (let row = 0; row < nrows; row++) {
      for (let col = 0; col < ncols; col++) {
        if (board[row][col]) {
          return false;
        }
      }
    }
    return true;
  };
  // TODO

  // make table board

  function tableBoard() {
    return (
      <table className="board-table">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} className="board-row">
              {row.map((col, colIndex) => (
                <Cell 
                  key={rowIndex-colIndex} 
                  flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)} 
                  isLit={col}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // TODO

  if (hasWon()) {
    return(
      <div className="board-container">
        <h1 className="winning-banner">You Won!</h1>
      </div>
    );
  }

  return(
    <div className="board-container">
      {tableBoard(board)}
    </div>
  );
}

export default Board;
