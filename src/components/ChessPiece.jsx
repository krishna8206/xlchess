import React from 'react';

// Highly optimized, visually premium custom SVGs for the chess pieces.
// Designed with crisp lines and subtle gradients for a modern look.
const PIECE_SVGS = {
  // --- WHITE PIECES ---
  wp: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path
        d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-.83.65-1.41 1.63-1.41 2.75 0 .28.03.55.09.81H27.9c.06-.26.1-.53.1-.81 0-1.13-.58-2.11-1.41-2.75C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
        fill="url(#wp-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 35.5h22v3h-22zM15.5 30.5h14v2h-14z"
        fill="url(#wp-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  wr: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wr-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path
        d="M9 39h27v-3H9v3zm3-13v7h21v-7H12zm2.5-4h16l1.5-6H13l1.5 6zm-3-10V9h4v3h5V9h5v3h5V9h4v3h9v-3z"
        fill="url(#wr-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 30h21M14.5 19.5h16" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),
  wn: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wn-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path
        d="M 22,10 C 22,10 19,11 16,15 C 13,19 13,23 13,23 C 13,23 15,20 18,20 C 18,20 17,21 15,24 C 13,27 13,30 13,30 C 13,30 14.5,27.5 17,27.5 C 19.5,27.5 20,29 20,29 C 20,29 17,31 16,33 C 15,35 15,38 15,38 L 31,38 C 31,38 31,31 33,28 C 35,25 36,22 35,16 C 34,10 29,8 22,10 z"
        fill="url(#wn-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27.5" cy="16.5" r="2" fill="#475569" />
      <path d="M9 39h27v-3H9v3z" fill="url(#wn-grad)" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),
  wb: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wb-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path
        d="M9 39h27v-3H9v3zm13.5-30c-3.5 0-6.5 2.5-6.5 6 0 1.5.5 3 1.5 4.5C12.5 21.5 11 25.5 11 29c0 1.5 1 2.5 2.5 2.5h18c1.5 0 2.5-1 2.5-2.5 0-3.5-1.5-7.5-3-9.5 1-1.5 1.5-3 1.5-4.5 0-3.5-3-6-6.5-6z"
        fill="url(#wb-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="5.5" r="2.2" fill="url(#wb-grad)" stroke="#475569" strokeWidth="1.5" />
      <path d="M15 15.5c3.5-1 11.5-1 15 0M17.5 20.5h10M15.5 25.5h14" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),
  wq: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wq-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path
        d="M8 12a2 2 0 100 4 2 2 0 000-4zm7-3a2 2 0 100 4 2 2 0 000-4zm7.5-2a2 2 0 100 4 2 2 0 000-4zm7.5 2a2 2 0 100 4 2 2 0 000-4zm7 3a2 2 0 100 4 2 2 0 000-4z"
        fill="url(#wq-grad)"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <path
        d="M9 37h27v-3H9v3zm3-5l2.5-14.5L20 28l2.5-21 2.5 21 5.5-10.5L33 32H12z"
        fill="url(#wq-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.5 30h22" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),
  wk: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg white">
      <defs>
        <linearGradient id="wk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      {/* Crown */}
      <path
        d="M22.5 11.63V6M19.69 8.81h5.62M11.5 37h22v-3.5h-22V37zm3.5-8.5c0-4.5 4.5-5.5 7.5-12 3 6.5 7.5 7.5 7.5 12h-15z"
        fill="url(#wk-grad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base details */}
      <path
        d="M11.5 30h22M15 33.5h15"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <path
        d="M22.5 16.5c-3.25 0-6 2.75-6 6h12c0-3.25-2.75-6-6-6z"
        fill="url(#wk-grad)"
        stroke="#475569"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // --- BLACK PIECES ---
  bp: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="bp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path
        d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-.83.65-1.41 1.63-1.41 2.75 0 .28.03.55.09.81H27.9c.06-.26.1-.53.1-.81 0-1.13-.58-2.11-1.41-2.75C28.06 24.84 29 23.03 29 21c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
        fill="url(#bp-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 35.5h22v3h-22zM15.5 30.5h14v2h-14z"
        fill="url(#bp-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  br: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="br-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path
        d="M9 39h27v-3H9v3zm3-13v7h21v-7H12zm2.5-4h16l1.5-6H13l1.5 6zm-3-10V9h4v3h5V9h5v3h5V9h4v3h9v-3z"
        fill="url(#br-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 30h21M14.5 19.5h16" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  ),
  bn: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="bn-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path
        d="M 22,10 C 22,10 19,11 16,15 C 13,19 13,23 13,23 C 13,23 15,20 18,20 C 18,20 17,21 15,24 C 13,27 13,30 13,30 C 13,30 14.5,27.5 17,27.5 C 19.5,27.5 20,29 20,29 C 20,29 17,31 16,33 C 15,35 15,38 15,38 L 31,38 C 31,38 31,31 33,28 C 35,25 36,22 35,16 C 34,10 29,8 22,10 z"
        fill="url(#bn-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27.5" cy="16.5" r="2" fill="#A5B4FC" />
      <path d="M9 39h27v-3H9v3z" fill="url(#bn-grad)" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  ),
  bb: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="bb-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path
        d="M9 39h27v-3H9v3zm13.5-30c-3.5 0-6.5 2.5-6.5 6 0 1.5.5 3 1.5 4.5C12.5 21.5 11 25.5 11 29c0 1.5 1 2.5 2.5 2.5h18c1.5 0 2.5-1 2.5-2.5 0-3.5-1.5-7.5-3-9.5 1-1.5 1.5-3 1.5-4.5 0-3.5-3-6-6.5-6z"
        fill="url(#bb-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="5.5" r="2.2" fill="url(#bb-grad)" stroke="#0F172A" strokeWidth="1.5" />
      <path d="M15 15.5c3.5-1 11.5-1 15 0M17.5 20.5h10M15.5 25.5h14" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  ),
  bq: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="bq-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path
        d="M8 12a2 2 0 100 4 2 2 0 000-4zm7-3a2 2 0 100 4 2 2 0 000-4zm7.5-2a2 2 0 100 4 2 2 0 000-4zm7.5 2a2 2 0 100 4 2 2 0 000-4zm7 3a2 2 0 100 4 2 2 0 000-4z"
        fill="url(#bq-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      <path
        d="M9 37h27v-3H9v3zm3-5l2.5-14.5L20 28l2.5-21 2.5 21 5.5-10.5L33 32H12z"
        fill="url(#bq-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.5 30h22" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  ),
  bk: (
    <svg viewBox="0 0 45 45" className="chess-piece-svg black">
      <defs>
        <linearGradient id="bk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      {/* Crown */}
      <path
        d="M22.5 11.63V6M19.69 8.81h5.62M11.5 37h22v-3.5h-22V37zm3.5-8.5c0-4.5 4.5-5.5 7.5-12 3 6.5 7.5 7.5 7.5 12h-15z"
        fill="url(#bk-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base details */}
      <path
        d="M11.5 30h22M15 33.5h15"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      <path
        d="M22.5 16.5c-3.25 0-6 2.75-6 6h12c0-3.25-2.75-6-6-6z"
        fill="url(#bk-grad)"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
    </svg>
  )
};

export default function ChessPiece({ type }) {
  if (!type) return null;
  return PIECE_SVGS[type] || null;
}
