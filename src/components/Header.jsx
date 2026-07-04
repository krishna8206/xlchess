import React, { useState } from 'react';
import { Menu, X, Play, Award, BookOpen, Compass, Tv, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <a href="/" className="logo-area">
          <div className="logo-icon-wrapper">
            <svg 
              viewBox="0 0 100 100" 
              className="logo-svg"
              aria-hidden="true"
            >
              {/* Custom stylized Chess Knight with upward arrow shape */}
              <defs>
                <linearGradient id="knight-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
              <path 
                d="M50 90 C50 90, 80 90, 80 70 C80 50, 75 40, 75 25 C65 25, 58 35, 58 35 C58 35, 55 15, 38 15 C28 15, 20 28, 25 45 C15 50, 18 68, 30 68 C35 68, 42 62, 42 62 C42 62, 45 78, 35 82 C30 84, 25 80, 25 80 L22 86 C22 86, 32 90, 50 90 Z" 
                fill="url(#knight-grad)"
              />
              <path 
                d="M38 15 L50 5 L55 18" 
                stroke="#A5B4FC" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
              {/* Mane accents */}
              <path d="M58 35 L68 38" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M64 48 L74 51" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M68 62 L78 64" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-title">XLCHESS</span>
            <span className="logo-subtitle">Excel at Chess</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a href="#play" className="nav-link active">
                <Play className="nav-link-icon" size={16} /> Play
              </a>
            </li>
            <li>
              <a href="#puzzles" className="nav-link">
                <Compass className="nav-link-icon" size={16} /> Puzzles
              </a>
            </li>
            <li>
              <a href="#learn" className="nav-link">
                <BookOpen className="nav-link-icon" size={16} /> Learn
              </a>
            </li>
            <li>
              <a href="#watch" className="nav-link">
                <Tv className="nav-link-icon" size={16} /> Watch
              </a>
            </li>
            <li>
              <a href="#leaderboard" className="nav-link">
                <Award className="nav-link-icon" size={16} /> Leaderboard
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="auth-buttons-desktop">
          <button className="btn-secondary">
            <LogIn size={16} /> Sign In
          </button>
          <button className="btn-primary">
            <UserPlus size={16} /> Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-links">
              <li>
                <a href="#play" className="mobile-nav-link active" onClick={() => setIsOpen(false)}>
                  <Play size={18} /> Play
                </a>
              </li>
              <li>
                <a href="#puzzles" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                  <Compass size={18} /> Puzzles
                </a>
              </li>
              <li>
                <a href="#learn" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                  <BookOpen size={18} /> Learn
                </a>
              </li>
              <li>
                <a href="#watch" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                  <Tv size={18} /> Watch
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                  <Award size={18} /> Leaderboard
                </a>
              </li>
              <li className="mobile-menu-divider"></li>
              <li>
                <button className="mobile-menu-btn btn-secondary" onClick={() => setIsOpen(false)}>
                  <LogIn size={18} /> Sign In
                </button>
              </li>
              <li>
                <button className="mobile-menu-btn btn-primary" onClick={() => setIsOpen(false)}>
                  <UserPlus size={18} /> Sign Up
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
