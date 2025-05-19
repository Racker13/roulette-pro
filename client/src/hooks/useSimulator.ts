
import { useState } from 'react';

export function useSimulator() {
  const [bankroll, setBankroll] = useState(1000);
  const [activeBets, setActiveBets] = useState<any[]>([]);
  const [spinHistory, setSpinHistory] = useState<any[]>([]);

  const placeBet = (target: string | number, amount: number) => {
    setActiveBets([...activeBets, { target, amount }]);
  };

  const resetBets = () => setActiveBets([]);

  return {
    bankroll,
    setBankroll,
    activeBets,
    setActiveBets,
    placeBet,
    resetBets,
    spinHistory,
    setSpinHistory
  };
}
