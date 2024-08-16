import React, { useState } from 'react';
import './Board.css';
import TreasureIcon from '../assets/Treasure.svg';
import KrokodileIcon from '../assets/Krokodile.svg';
import SwirlIcon from '../assets/Swirl.svg';
import TreasureHintIcon from '../assets/Treasure-hint.svg';
import KrokodileHintIcon from '../assets/Krokodile-hint.svg';
import SwirlHintIcon from '../assets/Swirl-hint.svg';

type SquareContent = string; // Can contain multiple characters like "ks", "st", etc.

type SquareState = {
  uncovered: boolean;
  content: SquareContent;
  label: string;
};

const Board: React.FC = () => {
  const excludedPositions = new Set(['5,0', '4,0', '5,1']); // A1 (5,0), A2 (4,0), B1 (5,1)

  const getRandomPosition = (exclude: Set<string>): [number, number] => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 6);
      col = Math.floor(Math.random() * 6);
    } while (exclude.has(`${row},${col}`) || excludedPositions.has(`${row},${col}`));
    exclude.add(`${row},${col}`);
    return [row, col];
  };

  const createInitialBoard = (): SquareState[][] => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const board = Array.from({ length: 6 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => ({
        uncovered: row === 5 && col === 0, // A1 (bottom-left corner) uncovered initially
        content: '', // Content is empty initially
        label: `${rows[5 - row]}${col + 1}`, // A1, B1, etc. starting from bottom-left
      }))
    );

    // Function to add content to a specific square with bounds checking
    const addContent = (r: number, c: number, content: SquareContent) => {
      if (r >= 0 && r < 6 && c >= 0 && c < 6) {
        if (!board[r][c].content.includes(content)) {
          board[r][c].content += content; // Add the content to the existing string
        }
      }
    };

    const exclude = new Set<string>();

    // Place the main items and their hints randomly
    const placeRandomHints = (main: SquareContent, hint: SquareContent) => {
      const [r, c] = getRandomPosition(exclude);
      addContent(r, c, main); // Place the main item
      addContent(r - 1, c, hint); // above
      addContent(r + 1, c, hint); // below
      addContent(r, c - 1, hint); // left
      addContent(r, c + 1, hint); // right
    };

    // Randomly place K, S, and T with their hints
    placeRandomHints('K', 'k');
    placeRandomHints('S', 's');
    placeRandomHints('T', 't');

    return board;
  };

  const [board, setBoard] = useState<SquareState[][]>(createInitialBoard());

  const resetGame = () => {
    setBoard(createInitialBoard());
  };

  const isAdjacentUncovered = (row: number, col: number): boolean => {
    const adjacentCoords = [
      [row - 1, col], // above
      [row + 1, col], // below
      [row, col - 1], // left
      [row, col + 1], // right
    ];

    return adjacentCoords.some(
      ([r, c]) =>
        r >= 0 && r < 6 && c >= 0 && c < 6 && board[r][c].uncovered
    );
  };

  const toggleSquare = (row: number, col: number) => {
    if (!board[row][col].uncovered && isAdjacentUncovered(row, col)) {
      const squareContent = board[row][col].content;

      // First, uncover the square
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[row] = [...newBoard[row]];
        newBoard[row][col] = {
          ...newBoard[row][col],
          uncovered: true,
        };
        return newBoard;
      });

      // Delay the alert to allow the UI to update first
      setTimeout(() => {
        if (squareContent.includes('S')) {
          alert('You lose because of S');
          resetGame(); // Reset the game after losing
        } else if (squareContent.includes('K')) {
          alert('You lose because of K');
          resetGame(); // Reset the game after losing
        } else if (squareContent.includes('T')) {
          alert('You won, as you found the treasure');
          // No reset, as the player won
        }
      }, 100); // 100ms delay to allow the UI to update
    }
  };

  const renderContent = (content: string) => {
    switch (content) {
      case 'T':
        return <img src={TreasureIcon} alt="Treasure" className="icon" />;
      case 'K':
        return <img src={KrokodileIcon} alt="Krokodile" className="icon" />;
      case 'S':
        return <img src={SwirlIcon} alt="Swirl" className="icon" />;
      case 't':
        return <img src={TreasureHintIcon} alt="Treasure Hint" className="icon" />;
      case 'k':
        return <img src={KrokodileHintIcon} alt="Krokodile Hint" className="icon" />;
      case 's':
        return <img src={SwirlHintIcon} alt="Swirl Hint" className="icon" />;
      default:
        return content; // In case of multiple characters like "ks"
    }
  };

  const renderRowLabels = () => {
    return (
      <div className="row-labels">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="row-label">
            {6 - index} {/* Flip the order so that 1 is at the bottom */}
          </div>
        ))}
      </div>
    );
  };

  const renderColumnLabels = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    return (
      <div className="column-labels">
        {rows.map((label, index) => (
          <div key={index} className="column-label">
            {label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="board-container">
      <div className="board-with-labels">
        {renderRowLabels()}
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((square, colIndex) => (
                <div
                  key={colIndex}
                  className={`square ${square.uncovered ? 'uncovered' : ''}`}
                  onClick={() => toggleSquare(rowIndex, colIndex)}
                >
                  {square.uncovered ? renderContent(square.content) : square.label}
                </div>
              ))}
            </div>
          ))}
          {renderColumnLabels()}
        </div>
      </div>
    </div>
  );
};

export default Board;