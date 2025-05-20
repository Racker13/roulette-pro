// Number types on a roulette wheel
export type RouletteNumber = 
  | 0 | "00" 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 
  | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 
  | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;

// Color of a roulette number
export type RouletteColor = "red" | "black" | "green";

// Different types of bets
export type BetType = 
  | { type: "straight", number: RouletteNumber } // Single number (35:1)
  | { type: "split", numbers: [RouletteNumber, RouletteNumber] } // Two adjacent numbers (17:1)
  | { type: "street", numbers: [RouletteNumber, RouletteNumber, RouletteNumber] } // Three numbers horizontal (11:1)
  | { type: "corner", numbers: [RouletteNumber, RouletteNumber, RouletteNumber, RouletteNumber] } // Four numbers (8:1)
  | { type: "five", numbers: [0, "00", 1, 2, 3] } // Five numbers: 0, 00, 1, 2, 3 (6:1)
  | { type: "sixline", numbers: RouletteNumber[] } // Six numbers (5:1)
  | { type: "dozen", dozen: "1st" | "2nd" | "3rd" } // 1st, 2nd, or 3rd dozen (2:1)
  | { type: "column", column: 1 | 2 | 3 } // Column of 12 numbers (2:1)
  | { type: "red" } // Red (1:1)
  | { type: "black" } // Black (1:1)
  | { type: "even" } // Even (1:1)
  | { type: "odd" } // Odd (1:1)
  | { type: "low", numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] } // 1-18 (1:1)
  | { type: "high", numbers: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] } // 19-36 (1:1)

// Bet with amount
export interface Bet {
  id: string;
  betType: BetType;
  amount: number;
  displayName: string;
}

// Chip values
export type ChipValue = 1 | 5 | 25 | 100 | 500;

// Result of a spin
export interface SpinResult {
  number: RouletteNumber;
  color: RouletteColor;
  isEven: boolean;
  isLow: boolean;
  profitLoss: number;
  runningTotal: number;
  bets: Bet[];
}

// History of a spin
export interface SpinHistory {
  id: string;
  result: SpinResult;
  bets: Bet[];
  winAmount: number;
  timestamp: Date;
}

// Session statistics
export interface SessionStats {
  totalSpins: number;
  winRate: number;
  biggestWin: number;
  biggestLoss: number;
  mostCommonNumbers: Array<{ number: RouletteNumber; count: number }>;
  colorDistribution: {
    red: number;
    black: number;
    green: number;
  };
}

// Game state for undo/redo
export interface GameState {
  bankroll: number;
  bets: Bet[];
  history: SpinHistory[];
}

// Action for the game
export type GameAction = 
  | { type: "PLACE_BET"; bet: Bet }
  | { type: "REMOVE_BET"; id: string }
  | { type: "CLEAR_BETS" }
  | { type: "DOUBLE_BETS" }
  | { type: "SPIN"; result: SpinResult }
  | { type: "REBET"; previousBets: Bet[] }
  | { type: "RESET" };
