import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import type { ChipValue, Bet } from '@/lib/types';
import { useRouletteStore } from '@/store/useRouletteStore';
import { v4 as uuidv4 } from 'uuid';

const CHIP_VALUES: ChipValue[] = [1, 5, 10, 25, 100];

export const BetControlsCard = () => {
  const [selectedAmount, setSelectedAmount] = useState<ChipValue>(1);
  const placedBets = useRouletteStore((state) => state.placedBets);
  const addSpinResult = useRouletteStore((state) => state.addSpinResult);
  const clearBets = useRouletteStore((state) => state.clearBets);
  const addBet = useRouletteStore((state) => state.addBet);
  const setLastPlacedBets = useRouletteStore((state) => state.setLastPlacedBets);
  const lastPlacedBets = useRouletteStore((state) => state.lastPlacedBets);

  const handleChipSelect = (amount: ChipValue) => {
    setSelectedAmount(amount);
  };

  const handleSpin = () => {
    console.log('[SPIN] Placed Bets:', placedBets);
    setLastPlacedBets([...placedBets]); // preserve full bet structure
    const result = Math.floor(Math.random() * 37); // 0 to 36
    addSpinResult(result);
  };

  const handleClear = () => {
    setLastPlacedBets([...placedBets]);
    clearBets();
  };

  const handleDoubleBets = () => {
    const doubled: Bet[] = placedBets.map((bet) => ({
      id: uuidv4(),
      betType: bet.betType,
      amount: bet.amount * 2,
      displayName: bet.displayName,
    }));
    console.log('[2X] Doubled Bets:', doubled);
    clearBets();
    doubled.forEach(addBet);
  };

  const handleRebet = () => {
    const rebets: Bet[] = lastPlacedBets.map((bet) => ({
      id: uuidv4(),
      betType: bet.betType,
      amount: bet.amount,
      displayName: bet.displayName,
    }));
    console.log('[REBET] Restoring Bets:', rebets);
    clearBets();
    rebets.forEach(addBet);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bet Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chip Selection */}
          <div className="flex gap-2 justify-start flex-wrap">
            {CHIP_VALUES.map((value) => (
              <Button
                key={value}
                variant={selectedAmount === value ? 'default' : 'outline'}
                onClick={() => handleChipSelect(value)}
              >
                ${value}
              </Button>
            ))}
          </div>

          {/* Inline Control Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSpin} disabled={placedBets.length === 0}>
              Spin
            </Button>
            <Button onClick={handleClear} variant="secondary" disabled={placedBets.length === 0}>
              Clear Bets
            </Button>
            <Button onClick={handleDoubleBets} disabled={placedBets.length === 0}>
              2×
            </Button>
            <Button onClick={handleRebet} disabled={lastPlacedBets.length === 0}>
              Rebet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
