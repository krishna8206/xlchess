export const getInitialBoard = () => [
  ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
  ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];

export const parseSquare = (sq) => {
  if (!sq || sq.length < 2) return { row: -1, col: -1 };
  const file = sq.charCodeAt(0) - 97; // 'a' is 97
  const rank = 8 - parseInt(sq[1], 10);
  return { row: rank, col: file };
};

export const getSquareName = (row, col) => {
  const file = String.fromCharCode(97 + col);
  const rank = 8 - row;
  return `${file}${rank}`;
};

export const applyMove = (board, from, to, options = {}) => {
  const { castling, promotion } = options;
  const newBoard = board.map(row => [...row]);
  const start = parseSquare(from);
  const end = parseSquare(to);

  if (start.row < 0 || start.row > 7 || start.col < 0 || start.col > 7) return newBoard;
  if (end.row < 0 || end.row > 7 || end.col < 0 || end.col > 7) return newBoard;

  const piece = newBoard[start.row][start.col];
  
  newBoard[start.row][start.col] = null;
  newBoard[end.row][end.col] = promotion ? (piece ? piece[0] : 'w') + promotion : piece;

  // Handle castling
  if (castling) {
    if (to === 'g1') { // White Kingside
      newBoard[7][5] = 'wr'; // f1
      newBoard[7][7] = null; // h1
    } else if (to === 'c1') { // White Queenside
      newBoard[7][3] = 'wr'; // d1
      newBoard[7][0] = null; // a1
    } else if (to === 'g8') { // Black Kingside
      newBoard[0][5] = 'br'; // f8
      newBoard[0][7] = null; // h8
    } else if (to === 'c8') { // Black Queenside
      newBoard[0][3] = 'br'; // d8
      newBoard[0][0] = null; // a8
    }
  }

  // Handle en passant
  if (piece && piece[1] === 'p' && start.col !== end.col && !board[end.row][end.col]) {
    newBoard[start.row][end.col] = null;
  }

  return newBoard;
};

export const getLegalMoves = (board, squareStr) => {
  const start = parseSquare(squareStr);
  if (start.row < 0 || start.row > 7 || start.col < 0 || start.col > 7) return [];

  const piece = board[start.row][start.col];
  if (!piece) return [];

  const color = piece[0];
  const type = piece[1];
  const moves = [];

  const addMove = (r, c) => {
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const destPiece = board[r][c];
      if (!destPiece || destPiece[0] !== color) {
        moves.push(getSquareName(r, c));
        return !destPiece; // Continue sliding if empty
      }
    }
    return false; // Blocked
  };

  if (type === 'p') {
    const dir = color === 'w' ? -1 : 1;
    const startRank = color === 'w' ? 6 : 1;

    // Single push
    const nextRow = start.row + dir;
    if (nextRow >= 0 && nextRow < 8 && !board[nextRow][start.col]) {
      moves.push(getSquareName(nextRow, start.col));
      // Double push
      const doubleRow = start.row + 2 * dir;
      if (start.row === startRank && !board[doubleRow][start.col]) {
        moves.push(getSquareName(doubleRow, start.col));
      }
    }

    // Captures
    for (const dCol of [-1, 1]) {
      const targetCol = start.col + dCol;
      if (targetCol >= 0 && targetCol < 8 && nextRow >= 0 && nextRow < 8) {
        const destPiece = board[nextRow][targetCol];
        if (destPiece && destPiece[0] !== color) {
          moves.push(getSquareName(nextRow, targetCol));
        }
      }
    }
  } 
  else if (type === 'n') {
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of offsets) {
      addMove(start.row + dr, start.col + dc);
    }
  } 
  else if (type === 'b' || type === 'q') {
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    for (const [dr, dc] of directions) {
      let r = start.row + dr;
      let c = start.col + dc;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const canContinue = addMove(r, c);
        if (!canContinue) break;
        r += dr;
        c += dc;
      }
    }
  }
  
  if (type === 'r' || type === 'q') {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    for (const [dr, dc] of directions) {
      let r = start.row + dr;
      let c = start.col + dc;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const canContinue = addMove(r, c);
        if (!canContinue) break;
        r += dr;
        c += dc;
      }
    }
  } 
  else if (type === 'k') {
    const offsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of offsets) {
      addMove(start.row + dr, start.col + dc);
    }

    // Basic castling validation (only sandbox/free play)
    if (color === 'w' && start.row === 7 && start.col === 4) {
      // White Kingside Castle
      if (board[7][7] === 'wr' && !board[7][5] && !board[7][6]) {
        moves.push('g1');
      }
      // White Queenside Castle
      if (board[7][0] === 'wr' && !board[7][1] && !board[7][2] && !board[7][3]) {
        moves.push('c1');
      }
    } else if (color === 'b' && start.row === 0 && start.col === 4) {
      // Black Kingside Castle
      if (board[0][7] === 'br' && !board[0][5] && !board[0][6]) {
        moves.push('g8');
      }
      // Black Queenside Castle
      if (board[0][0] === 'br' && !board[0][1] && !board[0][2] && !board[0][3]) {
        moves.push('c8');
      }
    }
  }

  return moves;
};
