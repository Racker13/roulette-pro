
import { create } from 'zustand';
import type { ChipValue, Bet, SpinResult } from '@/lib/types';

interface RouletteState {
  selectedChipValue: ChipValue;
  placedBets: Bet[];
  spinResults: SpinResult[];
  setSelectedChipValue: (value: ChipValue) => void;
  addBet: (bet: Omit<Bet, 'id'>) => void;
  clearBets: () => void;
  addSpinResult: (result: SpinResult) => void;
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
  addSpinResult: (result) => set((state) => ({
    spinResults: [result, ...state.spinResults].slice(0, 20)
  })),
  clearSpinResults: () => set({ spinResults: [] }),
  exportSession: () => JSON.stringify({
    placedBets: get().placedBets,
    spinResults: get().spinResults,
    timestamp: new Date().toISOString()
  }, null, 2)
}));
