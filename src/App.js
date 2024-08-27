import { useState } from "react";

/**
 * Square component that renders a button representing a square in the tic-tac-toe board.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.value - The value of the square ('X', 'O', or null).
 * @param {Function} props.onSquareClick - The function to call when the square is clicked.
 * @returns {JSX.Element} The rendered square button.
 */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 * Board component that renders the tic-tac-toe board.
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.xIsNext - Indicates whether the next move is by 'X'.
 * @param {Array<string|null>} props.squares - The current state of the board.
 * @param {Function} props.onPlay - The function to call when a square is clicked.
 * @returns {JSX.Element} The rendered board component.
 */
function Board({ xIsNext, squares, onPlay }) {
  /**
   * Handles a click on a square, updating the board state.
   * @param {number} i - The index of the clicked square.
   */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/**
 * Game component that manages the state of the tic-tac-toe game.
 * @returns {JSX.Element} The rendered game component.
 */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  /**
   * Handles the state update when a new move is played.
   * @param {Array<string|null>} nextSquares - The updated state of the board after the move.
   */
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * Jumps to a specific move in the game history.
   * @param {number} nextMove - The move number to jump to.
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/**
 * Determines the winner of the tic-tac-toe game.
 * @param {Array<string|null>} squares - The current state of the board.
 * @returns {string|null} The winner ('X' or 'O') or null if there is no winner.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
