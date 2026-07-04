import React from 'react';
import ChessPiece from './ChessPiece';
import { parseSquare, getSquareName } from '../utils/chessEngine';

export default function Chessboard({ 
  board, 
  onMove, 
  lastMove, 
  selectedSquare, 
  setSelectedSquare,
  validMoves = [],
  theme = 'forest',
  turn = 'w'
}) {
  // Translate a square string (e.g., 'e4') into row/col coordinates
  const handleSquareClick = (squareName, piece) => {
    if (selectedSquare) {
      if (selectedSquare === squareName) {
        setSelectedSquare(null);
      } else if (validMoves.includes(squareName)) {
        onMove(selectedSquare, squareName);
        setSelectedSquare(null);
      } else if (piece && piece[0] === turn) {
        // Switch selection to another piece of the same color
        setSelectedSquare(squareName);
      } else {
        setSelectedSquare(null);
      }
    } else {
      // Select piece if it belongs to the player whose turn it is
      if (piece && piece[0] === turn) {
        setSelectedSquare(squareName);
      }
    }
  };

  // Drag and drop event handlers
  const handleDragStart = (e, squareName) => {
    e.dataTransfer.setData('text/plain', squareName);
    setSelectedSquare(squareName);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow dropping
  };

  const handleDrop = (e, targetSquareName) => {
    e.preventDefault();
    const sourceSquareName = e.dataTransfer.getData('text/plain');
    if (sourceSquareName && sourceSquareName !== targetSquareName) {
      onMove(sourceSquareName, targetSquareName);
    }
    setSelectedSquare(null);
  };

  const isSquareLastMove = (squareName) => {
    return lastMove && (lastMove.from === squareName || lastMove.to === squareName);
  };

  return (
    <div className={`chessboard-wrapper theme-${theme}`} aria-label="Chessboard">
      <div className="chessboard">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex} role="row">
            {row.map((piece, colIndex) => {
              const squareName = getSquareName(rowIndex, colIndex);
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const isSelected = selectedSquare === squareName;
              const isValidDest = validMoves.includes(squareName);
              const isHighlighted = isSquareLastMove(squareName);

              return (
                <div
                  key={colIndex}
                  className={`board-square ${isDark ? 'dark-sq' : 'light-sq'} ${
                    isSelected ? 'selected' : ''
                  } ${isHighlighted ? 'last-move' : ''}`}
                  onClick={() => handleSquareClick(squareName, piece)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, squareName)}
                  role="gridcell"
                  aria-label={`${squareName} ${piece ? piece : 'empty'}`}
                >
                  {/* Pieces */}
                  {piece && (
                    <div
                      className="piece-container"
                      draggable={piece[0] === turn}
                      onDragStart={(e) => handleDragStart(e, squareName)}
                    >
                      <ChessPiece type={piece} />
                    </div>
                  )}

                  {/* Valid move indicators */}
                  {isValidDest && (
                    <div className={`valid-move-indicator ${piece ? 'capture' : 'dot'}`} />
                  )}

                  {/* Coordinates: rank labels on column 0 */}
                  {colIndex === 0 && (
                    <span className="coordinate coordinate-rank">
                      {8 - rowIndex}
                    </span>
                  )}

                  {/* Coordinates: file labels on row 7 */}
                  {rowIndex === 7 && (
                    <span className="coordinate coordinate-file">
                      {String.fromCharCode(97 + colIndex)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
