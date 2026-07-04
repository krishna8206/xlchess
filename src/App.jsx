import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Chessboard from './components/Chessboard';
import ControlPanel from './components/ControlPanel';
import { gamesData } from './data/gamesData';
import { puzzlesData } from './data/puzzlesData';
import { 
  getInitialBoard, 
  applyMove, 
  getLegalMoves, 
  parseSquare 
} from './utils/chessEngine';
import { 
  Play, Compass, Sparkles, ShieldCheck, 
  ExternalLink, Github
} from 'lucide-react';

export default function App() {
  // Modes: 'watch' | 'puzzle' | 'freeplay'
  const [activeMode, setActiveMode] = useState('watch');
  const [boardTheme, setBoardTheme] = useState('forest');

  // --- Watch Game State ---
  const [selectedGameId, setSelectedGameId] = useState(gamesData[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [speed, setSpeed] = useState(1000); // ms per move

  const selectedGame = useMemo(() => {
    return gamesData.find(g => g.id === selectedGameId) || gamesData[0];
  }, [selectedGameId]);

  // Derived watch game flats moves & boards
  const watchGameInfo = useMemo(() => {
    const flatMoves = [];
    selectedGame.moves.forEach(m => {
      if (m.w) flatMoves.push({ ...m.w, color: 'w', moveNum: m.num });
      if (m.b) flatMoves.push({ ...m.b, color: 'b', moveNum: m.num });
    });

    let b = getInitialBoard();
    let lastM = null;
    let comment = '';

    const limit = Math.min(currentMoveIndex, flatMoves.length);
    for (let i = 0; i < limit; i++) {
      const move = flatMoves[i];
      b = applyMove(b, move.from, move.to, { castling: move.castling });
      lastM = { from: move.from, to: move.to };
      if (move.details) {
        comment = move.details;
      }
    }

    return { board: b, lastMove: lastM, comment, flatMoves };
  }, [selectedGame, currentMoveIndex]);

  // Watch autoplay effect
  useEffect(() => {
    let timer = null;
    if (activeMode === 'watch' && isPlaying) {
      timer = setInterval(() => {
        setCurrentMoveIndex(prev => {
          if (prev >= watchGameInfo.flatMoves.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeMode, isPlaying, speed, watchGameInfo.flatMoves.length]);

  const handleGameSelect = (id) => {
    setSelectedGameId(id);
    setCurrentMoveIndex(0);
    setIsPlaying(true);
  };

  // --- Puzzle State ---
  const [selectedPuzzleId, setSelectedPuzzleId] = useState(puzzlesData[0].id);
  const [puzzleStepIndex, setPuzzleStepIndex] = useState(0);
  const [puzzleStatus, setPuzzleStatus] = useState({
    state: 'playing',
    message: 'Find the winning move for White.'
  });
  const [wrongMoveAttempt, setWrongMoveAttempt] = useState(null);
  const [showHintPulse, setShowHintPulse] = useState(false);

  const selectedPuzzle = useMemo(() => {
    return puzzlesData.find(p => p.id === selectedPuzzleId) || puzzlesData[0];
  }, [selectedPuzzleId]);

  // Derived puzzle board state
  const puzzleInfo = useMemo(() => {
    let b = selectedPuzzle.initialBoard.map(row => [...row]);
    let lastM = null;

    const limit = Math.min(puzzleStepIndex, selectedPuzzle.solution.length);
    for (let i = 0; i < limit; i++) {
      const move = selectedPuzzle.solution[i];
      b = applyMove(b, move.from, move.to, { castling: move.castling });
      lastM = { from: move.from, to: move.to };
    }

    // Apply wrong attempt visually if existing
    if (wrongMoveAttempt) {
      b = applyMove(b, wrongMoveAttempt.from, wrongMoveAttempt.to);
      lastM = { from: wrongMoveAttempt.from, to: wrongMoveAttempt.to };
    }

    return { board: b, lastMove: lastM };
  }, [selectedPuzzle, puzzleStepIndex, wrongMoveAttempt]);

  const handlePuzzleSelect = (id) => {
    setSelectedPuzzleId(id);
    setPuzzleStepIndex(0);
    setWrongMoveAttempt(null);
    setShowHintPulse(false);
    const puzzle = puzzlesData.find(p => p.id === id) || puzzlesData[0];
    setPuzzleStatus({
      state: 'playing',
      message: `Find the winning move for ${puzzle.toMove === 'w' ? 'White' : 'Black'}.`
    });
  };

  const handlePuzzleMove = (from, to) => {
    if (puzzleStatus.state === 'solved') return;

    const expectedMove = selectedPuzzle.solution[puzzleStepIndex];
    if (from === expectedMove.from && to === expectedMove.to) {
      const nextStep = puzzleStepIndex + 1;
      setPuzzleStepIndex(nextStep);
      setShowHintPulse(false);

      if (nextStep >= selectedPuzzle.solution.length) {
        setPuzzleStatus({
          state: 'solved',
          message: expectedMove.details || 'Checkmate! Beautifully solved.'
        });
      } else {
        // Opponent's forced move in a multi-step puzzle
        setPuzzleStatus({
          state: 'playing',
          message: 'Correct! Opponent is moving...'
        });

        setTimeout(() => {
          const opponentMove = selectedPuzzle.solution[nextStep];
          const finalStep = nextStep + 1;
          setPuzzleStepIndex(finalStep);

          if (finalStep >= selectedPuzzle.solution.length) {
            setPuzzleStatus({
              state: 'solved',
              message: opponentMove.details || 'Checkmate! Challenge complete.'
            });
          } else {
            setPuzzleStatus({
              state: 'playing',
              message: 'Your turn! Make the mating move.'
            });
          }
        }, 1000);
      }
    } else {
      // Wrong move
      setWrongMoveAttempt({ from, to });
      setPuzzleStatus({
        state: 'wrong',
        message: 'That is not the correct move. Study the pieces and try again!'
      });

      setTimeout(() => {
        setWrongMoveAttempt(null);
        setPuzzleStatus({
          state: 'playing',
          message: `Find the winning move for ${selectedPuzzle.toMove === 'w' ? 'White' : 'Black'}.`
        });
      }, 1500);
    }
  };

  const handleShowHint = () => {
    const expectedMove = selectedPuzzle.solution[puzzleStepIndex];
    setPuzzleStatus({
      state: 'playing',
      message: `Hint: Try moving the piece starting on ${expectedMove.from.toUpperCase()}.`
    });
    setShowHintPulse(expectedMove.from);
  };

  // --- Free Play State ---
  const [freePlayBoard, setFreePlayBoard] = useState(getInitialBoard());
  const [freePlayTurn, setFreePlayTurn] = useState('w');
  const [freePlayLastMove, setFreePlayLastMove] = useState(null);

  const handleFreePlayMove = (from, to) => {
    const startRowCol = parseSquare(from);
    const piece = freePlayBoard[startRowCol.row][startRowCol.col];
    if (!piece || piece[0] !== freePlayTurn) return;

    // Check if destination is in legal moves
    const legalDestinations = getLegalMoves(freePlayBoard, from);
    if (!legalDestinations.includes(to)) return;

    const newBoard = applyMove(freePlayBoard, from, to);
    setFreePlayBoard(newBoard);
    setFreePlayLastMove({ from, to });
    setFreePlayTurn(prev => prev === 'w' ? 'b' : 'w');
  };

  const handleResetFreePlay = () => {
    setFreePlayBoard(getInitialBoard());
    setFreePlayTurn('w');
    setFreePlayLastMove(null);
    setSelectedSquare(null);
  };

  // --- General Interactive Board Coordinate Selection ---
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Compute active board and legal moves depending on mode
  const activeBoardInfo = useMemo(() => {
    if (activeMode === 'watch') {
      return {
        board: watchGameInfo.board,
        lastMove: watchGameInfo.lastMove,
        turn: 'w',
        validMoves: []
      };
    } else if (activeMode === 'puzzle') {
      const isPlayerTurn = selectedPuzzle.toMove === 'w'; // White is player
      const currentPuzzleBoard = puzzleInfo.board;
      const validMoves = selectedSquare && isPlayerTurn
        ? getLegalMoves(currentPuzzleBoard, selectedSquare)
        : [];

      // If hint pulse is active, overlay it as a valid visual cue or highlight
      if (showHintPulse && selectedSquare === showHintPulse) {
        // Just highlights normal moves
      }

      return {
        board: currentPuzzleBoard,
        lastMove: puzzleInfo.lastMove,
        turn: selectedPuzzle.toMove,
        validMoves
      };
    } else {
      // Free play
      const validMoves = selectedSquare
        ? getLegalMoves(freePlayBoard, selectedSquare)
        : [];
      return {
        board: freePlayBoard,
        lastMove: freePlayLastMove,
        turn: freePlayTurn,
        validMoves
      };
    }
  }, [
    activeMode, 
    watchGameInfo, 
    puzzleInfo, 
    freePlayBoard, 
    freePlayLastMove, 
    freePlayTurn, 
    selectedSquare,
    selectedPuzzle,
    showHintPulse
  ]);

  // Mode change cleaner
  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setSelectedSquare(null);
    setShowHintPulse(false);
    if (mode === 'watch') {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleBoardMove = (from, to) => {
    if (activeMode === 'puzzle') {
      handlePuzzleMove(from, to);
    } else if (activeMode === 'freeplay') {
      handleFreePlayMove(from, to);
    }
  };

  return (
    <div className="app-layout">
      {/* Dynamic drifting chess pieces background decoration */}
      <div className="background-decorations" aria-hidden="true">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="drifting-piece dp-1">♘</div>
        <div className="drifting-piece dp-2">♗</div>
        <div className="drifting-piece dp-3">♙</div>
        <div className="drifting-piece dp-4">♖</div>
        <div className="drifting-piece dp-5">♕</div>
      </div>

      <Header />

      {/* Main Page Layout */}
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-grid">
            
            {/* Left Column: Heading and Controls */}
            <div className="hero-left-column">
              <div className="badge-wrapper">
                <span className="hero-tag">
                  <ShieldCheck size={14} /> Next-Gen Chess Engine Showcase
                </span>
              </div>
              <h1 className="hero-heading">
                Build the Future of <br />
                <span className="gradient-text">Online Chess</span>
              </h1>
              <p className="hero-subheading">
                Making the Best Move on the Way to the Top
              </p>
              <p className="hero-description">
                A complete chess platform to play, learn, compete, and grow—built to become the world's #1 destination for chess. Try out our interactive demo widgets below.
              </p>

              {/* Mode switching shortcuts */}
              <div className="hero-ctas">
                <button 
                  className={`btn-cta-primary ${activeMode === 'freeplay' ? 'active' : ''}`}
                  onClick={() => handleModeChange('freeplay')}
                >
                  <Play size={18} fill="currentColor" /> Play vs AI / Sandbox
                </button>
                <button 
                  className={`btn-cta-secondary ${activeMode === 'puzzle' ? 'active' : ''}`}
                  onClick={() => handleModeChange('puzzle')}
                >
                  <Compass size={18} /> Solve Mate Puzzles
                </button>
              </div>

              {/* Control Panel Widget */}
              <ControlPanel
                activeMode={activeMode}
                setActiveMode={handleModeChange}
                // Watch Mode Props
                games={gamesData}
                selectedGame={selectedGame}
                onGameSelect={handleGameSelect}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentMoveIndex={currentMoveIndex}
                totalMoves={watchGameInfo.flatMoves.length}
                onPrevMove={() => { setIsPlaying(false); setCurrentMoveIndex(prev => Math.max(0, prev - 1)); }}
                onNextMove={() => { setIsPlaying(false); setCurrentMoveIndex(prev => Math.min(watchGameInfo.flatMoves.length, prev + 1)); }}
                onResetGame={() => { setIsPlaying(false); setCurrentMoveIndex(0); }}
                speed={speed}
                setSpeed={setSpeed}
                moveComment={watchGameInfo.comment}
                // Puzzle Props
                puzzles={puzzlesData}
                selectedPuzzle={selectedPuzzle}
                onPuzzleSelect={handlePuzzleSelect}
                puzzleStatus={puzzleStatus}
                onResetPuzzle={() => handlePuzzleSelect(selectedPuzzleId)}
                onShowHint={handleShowHint}
                // Free Play Props
                onResetFreePlay={handleResetFreePlay}
                freePlayTurn={freePlayTurn}
                setFreePlayTurn={setFreePlayTurn}
              />
            </div>

            {/* Right Column: Chessboard Display Widget */}
            <div className="hero-right-column">
              <div className="board-container-card">
                {/* Theme Selector Overlay */}
                <div className="theme-selector-bar">
                  <span className="theme-bar-label">Board Style:</span>
                  <div className="theme-chips">
                    <button
                      className={`theme-chip forest ${boardTheme === 'forest' ? 'active' : ''}`}
                      onClick={() => setBoardTheme('forest')}
                      aria-label="Green forest board theme"
                    >
                      Forest
                    </button>
                    <button
                      className={`theme-chip slate ${boardTheme === 'slate' ? 'active' : ''}`}
                      onClick={() => setBoardTheme('slate')}
                      aria-label="Grey slate board theme"
                    >
                      Slate
                    </button>
                    <button
                      className={`theme-chip cosmic ${boardTheme === 'cosmic' ? 'active' : ''}`}
                      onClick={() => setBoardTheme('cosmic')}
                      aria-label="Purple cosmic board theme"
                    >
                      Cosmic
                    </button>
                  </div>
                </div>

                {/* The Chessboard itself */}
                <Chessboard
                  board={activeBoardInfo.board}
                  onMove={handleBoardMove}
                  lastMove={activeBoardInfo.lastMove}
                  selectedSquare={selectedSquare}
                  setSelectedSquare={setSelectedSquare}
                  validMoves={activeBoardInfo.validMoves}
                  theme={boardTheme}
                  turn={activeBoardInfo.turn}
                />

                {/* Chessboard Dashboard Footer */}
                <div className="board-dashboard-footer">
                  {activeMode === 'watch' && (
                    <div className="dashboard-status watch-status">
                      <span className="status-indicator live"></span>
                      <span className="status-text font-medium text-white">
                        {isPlaying ? 'Autoplay in Progress...' : 'Autoplay Paused'}
                      </span>
                      <span className="status-meta">
                        {selectedGame.players}
                      </span>
                    </div>
                  )}
                  {activeMode === 'puzzle' && (
                    <div className="dashboard-status puzzle-status">
                      <span className={`status-indicator ${puzzleStatus.state}`}></span>
                      <span className="status-text font-medium text-white">
                        {puzzleStatus.state === 'solved' ? 'Solved!' : 'Challenge Active'}
                      </span>
                      <span className="status-meta">
                        {selectedPuzzle.title} • {selectedPuzzle.difficulty}
                      </span>
                    </div>
                  )}
                  {activeMode === 'freeplay' && (
                    <div className="dashboard-status sandbox-status">
                      <span className="status-indicator active"></span>
                      <span className="status-text font-medium text-white">
                        Sandbox Mode
                      </span>
                      <span className="status-meta">
                        {freePlayTurn === 'w' ? "White's turn" : "Black's turn"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-copyright">
            © 2026 XLChess. Designed for high-fidelity interactive performance.
          </div>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <Github size={14} /> GitHub Repository
            </a>
            <a href="https://xlchess.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              <ExternalLink size={14} /> Original Site
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
