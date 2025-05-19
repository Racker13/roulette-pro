
import { create } from 'zustand';
import type { ChipValue, Bet } from '@/lib/types';

interface RouletteState {
  selectedChipValue: ChipValue;
  placedBets: Bet[];
  setSelectedChipValue: (value: ChipValue) => void;
  addBet: (bet: Omit<Bet, 'id'>) => void;
  clearBets: () => void;
  exportBets: () => string;
}

export const useRouletteStore = create<RouletteState>((set, get) => ({
  selectedChipValue: 1,
  placedBets: [],
  setSelectedChipValue: (value) => set({ selectedChipValue: value }),
  addBet: (bet) => set((state) => ({
    placedBets: [...state.placedBets, { ...bet, id: crypto.randomUUID() }]
  })),
  clearBets: () => set({ placedBets: [] }),
  exportBets: () => JSON.stringify(get().placedBets, null, 2)
}));
