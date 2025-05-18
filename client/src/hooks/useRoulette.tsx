import { useState, useReducer, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Bet, 
  ChipValue, 
  SpinHistory, 
  SpinResult, 
  SessionStats, 
  GameState, 
  GameAction, 
  RouletteNumber, 
  BetType 
} from "@/lib/types";
import { 
  calculateWinnings, 
  getRouletteNumbers, 
  getNumberProperties, 
  getNumberColor, 
  getBetDisplayName 
} from "@/lib/roulette";
import { v4 as uuidv4 } from 'uuid';

// Define initial state
const initialState: GameState = {
  bankroll: 1000,
  bets: [],
  history: []
};

// Game state reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "PLACE_BET":
      return {
        ...state,
        bets: [...state.bets, action.bet],
      };

    case "REMOVE_BET":
      return {
        ...state,
        bets: state.bets.filter(bet => bet.id !== action.id),
      };

    case "CLEAR_BETS":
      return {
        ...state,
        bets: [],
      };

    case "DOUBLE_BETS":
      return {
        ...state,
        bets: state.bets.map(bet => ({
          ...bet,
          amount: bet.amount * 2
        })),
      };

    case "SPIN": {
      if (state.bets.length === 0) return state;

      const totalBetAmount = state.bets.reduce((sum, bet) => sum + bet.amount, 0);
      const winnings = calculateWinnings(state.bets, action.result);
      const netWin = winnings - totalBetAmount;

      const newSpin: SpinHistory = {
        id: uuidv4(),
        result: action.result,
        bets: [...state.bets],
        winAmount: netWin,
        timestamp: new Date()
      };

      return {
        bankroll: state.bankroll + netWin,
        bets: [], // Clear bets after spin
        history: [newSpin, ...state.history]
      };
    }

    case "REBET": {
      // Check if there are previous bets from history
      if (action.previousBets.length === 0) return state;

      // Check if player has enough money for all bets
      const totalPreviousBetAmount = action.previousBets.reduce(
        (sum, bet) => sum + bet.amount, 0
      );

      if (state.bankroll < totalPreviousBetAmount) {
        // Not enough money to place all bets
        return state;
      }

      return {
        ...state,
        bets: action.previousBets.map(bet => ({
          ...bet,
          id: uuidv4() // Generate new IDs for the bets
        })),
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

// History tracking for undo/redo
type History = {
  past: GameState[];
  present: GameState;
  future: GameState[];
};

// Custom hook for roulette game
export function useRoulette() {
  const { toast } = useToast();
  const [selectedChip, setSelectedChip] = useState<ChipValue>(5);
  const [spinResult, setSpinResult] = useState("");
  const [stats, setStats] = useState<SessionStats>({
    totalSpins: 0,
    winRate: 0,
    biggestWin: 0,
    biggestLoss: 0,
    mostCommonNumbers: [],
    colorDistribution: { red: 0, black: 0, green: 0 }
  });

  // Set up history with present state
  const [history, setHistory] = useState<History>({
    past: [],
    present: initialState,
    future: []
  });
  
  // Get current values from present state
  const { bankroll, bets, history: spinHistory } = history.present;
  
  // Calculate session P/L
  const sessionPL = bankroll - initialState.bankroll;
  
  // Get last spin if available
  const lastSpin = spinHistory.length > 0 ? spinHistory[0].result : null;

  // Function to update history with new state
  const updateHistory = (newState: GameState) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newState,
      future: []
    }));
  };

  // Place a bet
  const placeBet = (betType: BetType, amount: number) => {
    if (amount > bankroll) {
      toast({
        title: "Insufficient funds",
        description: `You don't have enough money to place a bet of $${amount}`,
        variant: "destructive"
      });
      return;
    }

    const newBet: Bet = {
      id: uuidv4(),
      betType,
      amount,
      displayName: getBetDisplayName(betType)
    };

    const newState = gameReducer(history.present, { type: "PLACE_BET", bet: newBet });
    updateHistory(newState);
  };

  // Clear all bets
  const clearBets = () => {
    const newState = gameReducer(history.present, { type: "CLEAR_BETS" });
    updateHistory(newState);
  };

  // Double all bets
  const doubleBets = () => {
    if (bets.length === 0) {
      toast({
        title: "No bets to double",
        description: "Place some bets first",
        variant: "destructive"
      });
      return;
    }

    // Check if player has enough money to double bets
    const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    if (totalBetAmount > bankroll) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough money to double your bets",
        variant: "destructive"
      });
      return;
    }

    const newState = gameReducer(history.present, { type: "DOUBLE_BETS" });
    updateHistory(newState);
  };

  // Spin the wheel
  const spin = () => {
    if (bets.length === 0) {
      toast({
        title: "No bets placed",
        description: "Place some bets before spinning",
        variant: "destructive"
      });
      return;
    }

    // Validate spin result if provided
    let result: RouletteNumber | null = null;
    const validNumbers = getRouletteNumbers();
    
    if (spinResult) {
      if (spinResult === "0" || spinResult === "00") {
        result = spinResult === "0" ? 0 : "00";
      } else {
        const num = parseInt(spinResult, 10);
        if (!isNaN(num) && num >= 1 && num <= 36) {
          result = num as RouletteNumber;
        } else {
          toast({
            title: "Invalid spin result",
            description: "Please enter a valid number (0, 00, or 1-36)",
            variant: "destructive"
          });
          return;
        }
      }
    } else {
      // Generate random result
      const randomIndex = Math.floor(Math.random() * validNumbers.length);
      result = validNumbers[randomIndex];
    }

    // Get properties of the spin result
    const resultProperties = getNumberProperties(result);
    
    const newState = gameReducer(history.present, { 
      type: "SPIN", 
      result: resultProperties
    });

    updateHistory(newState);
    setSpinResult(""); // Clear spin result input
  };

  // Undo last action
  const undo = () => {
    if (history.past.length === 0) {
      toast({
        title: "Nothing to undo",
        description: "You haven't made any actions yet",
        variant: "destructive"
      });
      return;
    }

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future]
    });
  };

  // Redo last undone action
  const redo = () => {
    if (history.future.length === 0) {
      toast({
        title: "Nothing to redo",
        description: "You haven't undone any actions",
        variant: "destructive"
      });
      return;
    }

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture
    });
  };

  // Rebet last bet pattern
  const rebet = () => {
    if (spinHistory.length === 0) {
      toast({
        title: "No previous bets",
        description: "You need to place bets and spin first",
        variant: "destructive"
      });
      return;
    }

    const previousBets = spinHistory[0].bets;
    const newState = gameReducer(history.present, { 
      type: "REBET", 
      previousBets 
    });
    
    updateHistory(newState);
  };

  // Export session data to clipboard
  const exportSession = () => {
    if (spinHistory.length === 0) {
      toast({
        title: "No data to export",
        description: "Play some spins first",
        variant: "destructive"
      });
      return;
    }

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(amount);
    };

    const sessionData = {
      date: new Date().toISOString(),
      initialBankroll: initialState.bankroll,
      finalBankroll: bankroll,
      profit: sessionPL,
      spins: spinHistory.map(spin => ({
        number: spin.result.number,
        color: spin.result.color,
        bets: spin.bets.map(bet => ({
          type: bet.displayName,
          amount: bet.amount
        })),
        winAmount: spin.winAmount,
        timestamp: spin.timestamp
      })),
      stats: {
        totalSpins: stats.totalSpins,
        winRate: stats.winRate,
        biggestWin: stats.biggestWin,
        biggestLoss: stats.biggestLoss
      }
    };

    const jsonData = JSON.stringify(sessionData, null, 2);
    navigator.clipboard.writeText(jsonData).then(
      () => {
        toast({
          title: "Session data exported",
          description: "Data has been copied to clipboard as JSON",
        });
      },
      () => {
        toast({
          title: "Export failed",
          description: "Could not copy data to clipboard",
          variant: "destructive"
        });
      }
    );
  };

  // Update statistics whenever spin history changes
  useEffect(() => {
    if (spinHistory.length === 0) return;

    // Calculate wins/losses
    const wins = spinHistory.filter(spin => spin.winAmount > 0).length;
    const winRate = spinHistory.length > 0 ? wins / spinHistory.length : 0;
    
    // Find biggest win and loss
    const winAmounts = spinHistory.map(spin => spin.winAmount);
    const biggestWin = Math.max(0, ...winAmounts);
    const biggestLoss = Math.min(0, ...winAmounts);
    
    // Count number occurrences
    const numberCounts = new Map<string | number, number>();
    spinHistory.forEach(spin => {
      const num = spin.result.number;
      const current = numberCounts.get(num) || 0;
      numberCounts.set(num, current + 1);
    });
    
    // Get most common numbers (up to 4)
    const sortedNumbers = Array.from(numberCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([number, count]) => ({ 
        number: number as RouletteNumber, 
        count 
      }));
    
    // Calculate color distribution
    let redCount = 0;
    let blackCount = 0;
    let greenCount = 0;
    
    spinHistory.forEach(spin => {
      if (spin.result.color === 'red') redCount++;
      else if (spin.result.color === 'black') blackCount++;
      else greenCount++;
    });
    
    const total = spinHistory.length;
    const colorDistribution = {
      red: total > 0 ? redCount / total : 0,
      black: total > 0 ? blackCount / total : 0,
      green: total > 0 ? greenCount / total : 0
    };
    
    setStats({
      totalSpins: spinHistory.length,
      winRate,
      biggestWin,
      biggestLoss,
      mostCommonNumbers: sortedNumbers,
      colorDistribution
    });
  }, [spinHistory]);

  return {
    bankroll,
    sessionPL,
    lastSpin,
    activeBets: bets,
    spinHistory,
    stats,
    selectedChip,
    setSelectedChip,
    placeBet,
    clearBets,
    doubleBets,
    spin,
    undo,
    redo,
    rebet,
    exportSession,
    spinResult,
    setSpinResult
  };
}
