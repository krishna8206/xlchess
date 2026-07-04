import React from 'react';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  Tv, Compass, Sparkles, AlertCircle, CheckCircle2, 
  HelpCircle, ShieldAlert, Award
} from 'lucide-react';

export default function ControlPanel({
  activeMode,
  setActiveMode,
  // Watch Game Props
  games,
  selectedGame,
  onGameSelect,
  isPlaying,
  setIsPlaying,
  currentMoveIndex,
  totalMoves,
  onPrevMove,
  onNextMove,
  onResetGame,
  speed,
  setSpeed,
  moveComment,
  // Puzzle Props
  puzzles,
  selectedPuzzle,
  onPuzzleSelect,
  puzzleStatus,
  onResetPuzzle,
  onShowHint,
  // Free Play Props
  onResetFreePlay,
  freePlayTurn,
  setFreePlayTurn
}) {
  return (
    <div className="control-panel">
      {/* Mode Navigation Tabs */}
      <div className="mode-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeMode === 'watch'}
          className={`mode-tab ${activeMode === 'watch' ? 'active' : ''}`}
          onClick={() => setActiveMode('watch')}
        >
          <Tv size={16} /> Watch Games
        </button>
        <button
          role="tab"
          aria-selected={activeMode === 'puzzle'}
          className={`mode-tab ${activeMode === 'puzzle' ? 'active' : ''}`}
          onClick={() => setActiveMode('puzzle')}
        >
          <Compass size={16} /> Solve Puzzles
        </button>
        <button
          role="tab"
          aria-selected={activeMode === 'freeplay'}
          className={`mode-tab ${activeMode === 'freeplay' ? 'active' : ''}`}
          onClick={() => setActiveMode('freeplay')}
        >
          <Sparkles size={16} /> Free Play
        </button>
      </div>

      <div className="panel-content">
        {/* ==================== WATCH GAME PANEL ==================== */}
        {activeMode === 'watch' && (
          <div className="mode-panel active">
            <div className="form-group">
              <label htmlFor="game-select">Select Masterpiece</label>
              <select
                id="game-select"
                value={selectedGame.id}
                onChange={(e) => onGameSelect(e.target.value)}
                className="select-control"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Game Info Card */}
            <div className="game-info-card">
              <div className="game-header">
                <span className="badge-opening">{selectedGame.opening}</span>
                <span className="game-result">{selectedGame.result}</span>
              </div>
              <h3 className="game-title">{selectedGame.players}</h3>
              <p className="game-desc">{selectedGame.description}</p>
            </div>

            {/* Autoplay Controls */}
            <div className="media-controls-container">
              <div className="media-buttons">
                <button 
                  onClick={onResetGame} 
                  className="btn-icon" 
                  aria-label="Reset game to start"
                  title="Restart"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={onPrevMove} 
                  disabled={currentMoveIndex === 0} 
                  className="btn-icon"
                  aria-label="Previous move"
                  title="Previous Move"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="btn-play-pause"
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={onNextMove} 
                  disabled={currentMoveIndex >= totalMoves} 
                  className="btn-icon"
                  aria-label="Next move"
                  title="Next Move"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Speed Controller */}
              <div className="speed-control">
                <span className="speed-label">Speed</span>
                <div className="speed-buttons">
                  {[2000, 1000, 500].map((s, idx) => {
                    const label = ['Slow', 'Normal', 'Fast'][idx];
                    return (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`speed-btn ${speed === s ? 'active' : ''}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Commentator Box */}
            <div className="commentary-box">
              <div className="commentary-header">
                <span className="commentary-tag">Live Commentary</span>
                <span className="move-progress">Move {Math.floor(currentMoveIndex / 2) + 1} / {Math.floor(totalMoves / 2) + 1}</span>
              </div>
              <p className="commentary-text">
                {moveComment || "Autoplay in progress... Watch Adolf Anderssen and Paul Morphy weave tactical magic!"}
              </p>
            </div>
          </div>
        )}

        {/* ==================== SOLVE PUZZLE PANEL ==================== */}
        {activeMode === 'puzzle' && (
          <div className="mode-panel active">
            <div className="form-group">
              <label htmlFor="puzzle-select">Choose Challenge</label>
              <select
                id="puzzle-select"
                value={selectedPuzzle.id}
                onChange={(e) => onPuzzleSelect(e.target.value)}
                className="select-control"
              >
                {puzzles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Puzzle Metadata */}
            <div className="puzzle-meta-card">
              <div className="puzzle-meta-row">
                <span className={`badge-difficulty ${selectedPuzzle.difficulty.toLowerCase()}`}>
                  <Award size={14} /> {selectedPuzzle.difficulty}
                </span>
                <span className="puzzle-turn">
                  {selectedPuzzle.toMove === 'w' ? 'White to Move' : 'Black to Move'}
                </span>
              </div>
              <p className="puzzle-instruction">{selectedPuzzle.description}</p>
            </div>

            {/* Puzzle State Feedback Banner */}
            <div className={`puzzle-feedback-banner ${puzzleStatus.state}`}>
              <div className="feedback-icon">
                {puzzleStatus.state === 'solved' && <CheckCircle2 className="text-success" size={24} />}
                {puzzleStatus.state === 'wrong' && <ShieldAlert className="text-danger" size={24} />}
                {puzzleStatus.state === 'playing' && <AlertCircle className="text-info" size={24} />}
              </div>
              <div className="feedback-content">
                <h4 className="feedback-title">
                  {puzzleStatus.state === 'solved' && "Success! Puzzle Solved"}
                  {puzzleStatus.state === 'wrong' && "Wrong Move"}
                  {puzzleStatus.state === 'playing' && "Find the Best Move"}
                </h4>
                <p className="feedback-text">{puzzleStatus.message}</p>
              </div>
            </div>

            {/* Puzzle Action Buttons */}
            <div className="puzzle-actions">
              <button onClick={onShowHint} className="btn-secondary flex-grow">
                <HelpCircle size={16} /> Show Hint
              </button>
              <button onClick={onResetPuzzle} className="btn-secondary">
                <RotateCcw size={16} /> Reset Puzzle
              </button>
            </div>
          </div>
        )}

        {/* ==================== FREE PLAY PANEL ==================== */}
        {activeMode === 'freeplay' && (
          <div className="mode-panel active">
            <div className="freeplay-card">
              <h3 className="freeplay-title">Sandbox Mode</h3>
              <p className="freeplay-desc">
                Drag pieces freely across the board or click to select and move. Real-time legal move paths will guide your steps.
              </p>
            </div>

            {/* Turn Controller & Active Indicator */}
            <div className="turn-indicator-card">
              <span className="indicator-label">Active Turn</span>
              <div className="turn-buttons">
                <button
                  className={`turn-btn white ${freePlayTurn === 'w' ? 'active' : ''}`}
                  onClick={() => setFreePlayTurn('w')}
                >
                  <span className="turn-dot white-dot"></span> White
                </button>
                <button
                  className={`turn-btn black ${freePlayTurn === 'b' ? 'active' : ''}`}
                  onClick={() => setFreePlayTurn('b')}
                >
                  <span className="turn-dot black-dot"></span> Black
                </button>
              </div>
            </div>

            {/* Actions */}
            <button onClick={onResetFreePlay} className="btn-secondary w-full">
              <RotateCcw size={16} /> Reset Board to Starting Position
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
