import { create } from 'zustand';

interface SessionState {
  autoSpinCount: number;
  autoSpinMinutes: number;
  setAutoSpinCount: (count: number) => void;
  setAutoSpinMinutes: (minutes: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  autoSpinCount: 0,
  autoSpinMinutes: 0,
  setAutoSpinCount: (count) => set({ autoSpinCount: count }),
  setAutoSpinMinutes: (minutes) => set({ autoSpinMinutes: minutes })
}));