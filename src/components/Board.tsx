import React, { useState } from 'react';
import './Board.css';
import TreasureIcon from '../assets/Treasure.svg';
import KrokodileIcon from '../assets/Krokodile.svg';
import SwirlIcon from '../assets/Swirl.svg';
import TreasureHintIcon from '../assets/Treasure-hint.svg';
import KrokodileHintIcon from '../assets/Krokodile-hint.svg';
import SwirlHintIcon from '../assets/Swirl-hint.svg';

type SquareContent = string;

type SquareState = {
  uncovered: boolean;
  content: SquareContent;
  label: string;
};

const Board: React.FC = () => {
  const excludedPositions = new Set(['5,0', '4,0', '5,1']);

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
        uncovered: row === 5 && col === 0,
        content: '',
        label: `${rows[5 - row]}${col + 1}`,
      }))
    );

    const addContent = (r: number, c: number, content: SquareContent) => {
      if (r >= 0 && r < 6 && c >= 0 && c < 6) {
        if (!board[r][c].content.includes(content)) {
          board[r][c].content += content;
        }
      }
    };

    const exclude = new Set<string>();

    const placeRandomHints = (main: SquareContent, hint: SquareContent) => {
      const [r, c] = getRandomPosition(exclude);
      addContent(r, c, main);
      addContent(r - 1, c, hint);
      addContent(r + 1, c, hint);
      addContent(r, c - 1, hint);
      addContent(r, c + 1, hint);
    };

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
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    return adjacentCoords.some(
      ([r, c]) =>
        r >= 0 && r < 6 && c >= 0 && c < 6 && board[r][c].uncovered
    );
  };

  const toggleSquare = (row: number, col: number) => {
    if (!board[row][col].uncovered && isAdjacentUncovered(row, col)) {
      const squareContent = board[row][col].content;

      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[row] = [...newBoard[row]];
        newBoard[row][col] = {
          ...newBoard[row][col],
          uncovered: true,
        };
        return newBoard;
      });

      setTimeout(() => {
        if (squareContent.includes('S')) {
          alert('You lose because of S');
          resetGame();
        } else if (squareContent.includes('K')) {
          alert('You lose because of K');
          resetGame();
        } else if (squareContent.includes('T')) {
          alert('You won, as you found the treasure');
        }
      }, 100);
    }
  };

  const renderContent = (content: string) => {
    const icons = [];

    // Hauptsymbole haben Priorität
    if (content.includes('K')) icons.push(<img key="K" src={KrokodileIcon} alt="Krokodile" className="icon" />);
    if (content.includes('T')) icons.push(<img key="T" src={TreasureIcon} alt="Treasure" className="icon" />);
    if (content.includes('S')) icons.push(<img key="S" src={SwirlIcon} alt="Swirl" className="icon" />);

    // Hinweis-Symbole nur anzeigen, wenn keine Hauptsymbole vorhanden sind
    if (!content.includes('K') && content.includes('k')) icons.push(<img key="k" src={KrokodileHintIcon} alt="Krokodile Hint" className="icon" />);
    if (!content.includes('T') && content.includes('t')) icons.push(<img key="t" src={TreasureHintIcon} alt="Treasure Hint" className="icon" />);
    if (!content.includes('S') && content.includes('s')) icons.push(<img key="s" src={SwirlHintIcon} alt="Swirl Hint" className="icon" />);

    return <div className="icon-container">{icons}</div>;
  };

  const renderRowLabels = () => {
    return (
      <div className="row-labels">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="row-label">
            {6 - index}
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