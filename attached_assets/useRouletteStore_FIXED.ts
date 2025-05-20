import { create } from "zustand";

function getColorFromNumber(num) {
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  if (num === 0 || num === "00") return "green";
  if (redNumbers.includes(Number(num))) return "red";
  return "black";
}

export const useRouletteStore = create((set, get) => ({
  sessionId: null,
  selectedChipValue: 1,
  placedBets: [],
  spinResults: [],
  sessionProfit: 0,
  autoSpinCount: 0,
  autoSpinMinutes: 0,

  setAutoSpinCount: (count) => set({ autoSpinCount: count }),
  setAutoSpinMinutes: (minutes) => set({ autoSpinMinutes: minutes }),
  setSelectedChipValue: (value) => set({ selectedChipValue: value }),
  setSessionProfit: (profit) => set({ sessionProfit: profit }),

  addBet: (bet) =>
    set((state) => ({
      placedBets: [...state.placedBets, { ...bet, id: crypto.randomUUID() }],
    })),

  clearBets: () => set({ placedBets: [] }),

  addSpinResult: (number) => set((state) => {
    const color = getColorFromNumber(number);
    const numValue = typeof number === 'number' ? number : 0;

    const currentBets = [...state.placedBets];
    let spinProfit = 0;

    currentBets.forEach((bet) => {
      if (
        (bet.type === 'red' && color === 'red') ||
        (bet.type === 'black' && color === 'black')
      ) {
        spinProfit += bet.amount;
      } else {
        spinProfit -= bet.amount;
      }
    });

    const newSessionProfit = state.sessionProfit + spinProfit;

    const result = {
      number,
      color,
      isEven: numValue > 0 && numValue % 2 === 0,
      isLow: numValue >= 1 && numValue <= 18,
      profitLoss: spinProfit,
      runningTotal: newSessionProfit,
      bets: currentBets,
    };

    return {
      spinResults: [result, ...state.spinResults].slice(0, 20),
      sessionProfit: newSessionProfit,
      placedBets: [],
    };
  }),

  clearSpinResults: () => set({ spinResults: [] }),

  exportSession: () =>
    JSON.stringify(
      {
        placedBets: get().placedBets,
        spinResults: get().spinResults,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    ),

  startSession: () =>
    set(() => ({
      sessionId: `session-${Date.now()}`,
      spinResults: [],
      placedBets: [],
      sessionProfit: 0,
    })),

  reset: () =>
    set(() => ({
      placedBets: [],
      spinResults: [],
      sessionId: null,
      sessionProfit: 0,
    })),
}));
