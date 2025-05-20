import { create } from 'zustand';
import type { Bet } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface RouletteStore {
  placedBets: Bet[];
  lastPlacedBets: Bet[];
  spinResults: number[];

  // Actions
  addBet: (bet: Bet) => void;
  addBets: (bets: Bet[]) => void;
  clearBets: () => void;

  addSpinResult: (result: number) => void;
  clearSpinResults: () => void;

  setLastPlacedBets: (bets: Bet[]) => void;

  startSession: () => void;
}

export const useRouletteStore = create<RouletteStore>((set) => ({
  // Initial state
  placedBets: [],
  lastPlacedBets: [],
  spinResults: [],

  // Bet actions
  addBet: (bet) =>
    set((state) => ({
      placedBets: [...state.placedBets, bet],
    })),

  addBets: (bets) =>
    set((state) => ({
      placedBets: [...state.placedBets, ...bets],
    })),

  clearBets: () => set({ placedBets: [] }),

  // Spin actions
  addSpinResult: (result) =>
    set((state) => ({
      spinResults: [...state.spinResults, result],
    })),

  clearSpinResults: () => set({ spinResults: [] }),

  // Rebet memory
  setLastPlacedBets: (bets) => set({ lastPlacedBets: bets }),

  // NEW: Session start/reset logic
  startSession: () =>
    set(() => ({
      placedBets: [],
      spinResults: [],
      lastPlacedBets: [],
      // You could add sessionId: uuidv4() here if needed
    })),
}));
