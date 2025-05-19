
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import RouletteTable from "./RouletteTable";
import { useRoulette } from "@/hooks/useRoulette";

export function BettingBoardCard() {
  const {
    selectedChip,
    setSelectedChip,
    activeBets,
    onPlaceBet,
    onClearBets,
    onDoubleBets,
    onSpin,
    spinResult,
    setSpinResult
  } = useRoulette();

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-4">
        <RouletteTable
          selectedChip={selectedChip}
          setSelectedChip={setSelectedChip}
          activeBets={activeBets}
          onPlaceBet={onPlaceBet}
          onClearBets={onClearBets}
          onDoubleBets={onDoubleBets}
          onSpin={onSpin}
          spinResult={spinResult}
          setSpinResult={setSpinResult}
        />
      </CardContent>
    </Card>
  );
}
