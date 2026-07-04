export const puzzlesData = [
  {
    id: 'mate_in_1_easy',
    title: 'Queen & Bishop Battery',
    description: 'White to move. Find the winning move that delivers checkmate in 1 step.',
    difficulty: 'Easy',
    toMove: 'w',
    initialBoard: [
      [null, null, null, null, null, null, null, 'bk'],
      [null, null, null, null, null, 'bp', 'bp', 'bp'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 'wq', null, null, null, null],
      [null, null, 'wb', null, null, 'wp', 'wp', 'wp'],
      [null, null, null, null, null, null, 'wk', null]
    ],
    solution: [
      {
        from: 'd3',
        to: 'h7',
        san: 'Qh7#',
        details: 'Checkmate! The Bishop on c2 supports the Queen on h7, trapping the Black King with no escape squares.'
      }
    ]
  },
  {
    id: 'smothered_mate',
    title: 'Smothered Mate',
    description: 'White to move. The Black King is trapped behind its own defensive shield. Deliver the final blow.',
    difficulty: 'Easy',
    toMove: 'w',
    initialBoard: [
      [null, null, null, null, null, null, 'br', 'bk'],
      [null, null, null, null, null, 'bp', null, 'bp'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, 'wn', null],
      [null, null, 'wq', null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['wp', 'wp', 'wp', null, null, 'wp', 'wp', 'wp'],
      [null, null, null, null, null, null, 'wk', null]
    ],
    solution: [
      {
        from: 'g5',
        to: 'f7',
        san: 'Nf7#',
        details: 'Smothered Mate! The Black King is completely boxed in by its own Rook and Pawns. The Knight delivers a lethal check.'
      }
    ]
  },
  {
    id: 'anastasia_mate',
    title: "Anastasia's Mate",
    description: 'White to move. Sacrifice your most valuable piece to force open the king’s shelter and execute a classical mate in 2 moves.',
    difficulty: 'Medium',
    toMove: 'w',
    initialBoard: [
      [null, null, null, null, null, null, null, 'bk'],
      [null, null, null, null, 'wn', null, 'bp', 'bp'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, 'wq'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, 'wr', null, null, null, null],
      ['wp', 'wp', 'wp', null, null, 'wp', 'wp', 'wp'],
      [null, null, null, null, null, null, 'wk', null]
    ],
    solution: [
      {
        from: 'h5',
        to: 'h7',
        san: 'Qxh7+',
        details: 'Brilliant Queen sacrifice! Forcing the Black King to expose itself.'
      },
      {
        // Forced reply by black
        from: 'h8',
        to: 'h7',
        san: 'Kxh7',
        details: 'Black is forced to capture the Queen.'
      },
      {
        from: 'd3',
        to: 'h3',
        san: 'Rh3#',
        details: "Checkmate! The Rook on h3 attacks the King, while the Knight on e7 controls the g6 and g8 escape squares."
      }
    ]
  }
];
