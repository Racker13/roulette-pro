
import { create } from 'zustand';
import type { ChipValue, Bet, SpinResult } from '@/lib/types';

function getColorFromNumber(num: number | '00'): 'red' | 'black' | 'green' {
  const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
  if (num === 0 || num === '00') return 'green';
  if (redNumbers.includes(Number(num))) return 'red';
  return 'black';
}

interface RouletteState {
  selectedChipValue: ChipValue;
  placedBets: Bet[];
  spinResults: SpinResult[];
  setSelectedChipValue: (value: ChipValue) => void;
  addBet: (bet: Omit<Bet, 'id'>) => void;
  clearBets: () => void;
  addSpinResult: (number: number | '00') => void;
  clearSpinResults: () => void;
  exportSession: () => string;
}

export const useRouletteStore = create<RouletteState>((set, get) => ({
  selectedChipValue: 1,
  placedBets: [],
  spinResults: [],
  setSelectedChipValue: (value) => set({ selectedChipValue: value }),
  addBet: (bet) => set((state) => ({
    placedBets: [...state.placedBets, { ...bet, id: crypto.randomUUID() }]
  })),
  clearBets: () => set({ placedBets: [] }),
  addSpinResult: (number) => set((state) => {
    const color = getColorFromNumber(number);
    const numValue = typeof number === 'number' ? number : 0;
    const result: SpinResult = {
      number,
      color,
      isEven: numValue > 0 && numValue % 2 === 0,
      isLow: numValue >= 1 && numValue <= 18
    };
    return {
      spinResults: [result, ...state.spinResults].slice(0, 20)
    };
  }),
  clearSpinResults: () => set({ spinResults: [] }),
  exportSession: () => JSON.stringify({
    placedBets: get().placedBets,
    spinResults: get().spinResults,
    timestamp: new Date().toISOString()
  }, null, 2)
}));
