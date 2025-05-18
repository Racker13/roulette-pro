import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChipSelector from "@/components/ChipSelector";
import ActiveBets from "@/components/ActiveBets";
import { Bet, ChipValue, RouletteNumber } from "@/lib/types";
import { getNumberColor } from "@/lib/roulette";

interface RouletteTableProps {
  selectedChip: ChipValue;
  setSelectedChip: (value: ChipValue) => void;
  activeBets: Bet[];
  onPlaceBet: (betType: any, amount: number) => void;
  onClearBets: () => void;
  onDoubleBets: () => void;
  onSpin: () => void;
  spinResult: string;
  setSpinResult: (value: string) => void;
}

export default function RouletteTable({
  selectedChip,
  setSelectedChip,
  activeBets,
  onPlaceBet,
  onClearBets,
  onDoubleBets,
  onSpin,
  spinResult,
  setSpinResult,
}: RouletteTableProps) {
  // Function to get the background color for a number
  const getNumberBackground = (num: RouletteNumber) => {
    if (num === 0 || num === "00") return "bg-green-700";
    
    const color = getNumberColor(num);
    return color === "red" ? "bg-red-700" : "bg-black";
  };

  // Numbers for the roulette wheel
  const numbers: RouletteNumber[] = [
    0, "00",
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
  ];

  const handleNumberClick = (num: RouletteNumber) => {
    onPlaceBet({ type: "straight", number: num }, selectedChip);
  };

  const handleBetTypeClick = (betType: any) => {
    onPlaceBet(betType, selectedChip);
  };

  // Calculate total bet amount
  const totalBetAmount = activeBets.reduce((total, bet) => total + bet.amount, 0);

  return (
    <Card>
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Place Your Bets</h2>
      </div>
      
      <CardContent className="p-4">
        <ChipSelector 
          selectedChip={selectedChip} 
          onChipSelect={setSelectedChip} 
        />

        {/* Roulette Table Layout */}
        <div className="w-full bg-green-600 p-4 rounded-lg select-none">
          {/* 0 and 00 */}
          <div className="grid grid-cols-13 gap-1 mb-2">
            {numbers.slice(0, 2).map((num) => (
              <div
                key={`num-${num}`}
                className={`rounded-md ${getNumberBackground(num)} text-white h-12 flex items-center justify-center font-bold col-span-1 cursor-pointer hover:opacity-80`}
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </div>
            ))}
            <div className="col-span-11"></div>
          </div>
          
          {/* Numbers 1-36 in a 3x12 grid */}
          <div className="grid grid-cols-12 gap-1 mb-4">
            {/* First row: 1-12 */}
            {numbers.slice(2, 14).map((num) => (
              <div
                key={`num-${num}`}
                className={`rounded-md ${getNumberBackground(num)} text-white h-12 flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </div>
            ))}
            
            {/* Second row: 13-24 */}
            {numbers.slice(14, 26).map((num) => (
              <div
                key={`num-${num}`}
                className={`rounded-md ${getNumberBackground(num)} text-white h-12 flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </div>
            ))}
            
            {/* Third row: 25-36 */}
            {numbers.slice(26).map((num) => (
              <div
                key={`num-${num}`}
                className={`rounded-md ${getNumberBackground(num)} text-white h-12 flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </div>
            ))}
          </div>
          
          {/* Bottom section - dozens */}
          <div className="grid grid-cols-3 gap-1">
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "dozen", dozen: "1st" })}
            >
              1st 12
            </div>
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "dozen", dozen: "2nd" })}
            >
              2nd 12
            </div>
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "dozen", dozen: "3rd" })}
            >
              3rd 12
            </div>
          </div>
          
          {/* Bottom section - outside bets */}
          <div className="grid grid-cols-6 gap-1 mt-1">
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "low" })}
            >
              1-18
            </div>
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "even" })}
            >
              EVEN
            </div>
            <div 
              className="bg-red-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "red" })}
            >
              RED
            </div>
            <div 
              className="bg-black text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "black" })}
            >
              BLACK
            </div>
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "odd" })}
            >
              ODD
            </div>
            <div 
              className="bg-green-700 text-white rounded-md h-12 flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleBetTypeClick({ type: "high" })}
            >
              19-36
            </div>
          </div>
        </div>
        
        {/* Active Bets Display */}
        <ActiveBets 
          bets={activeBets}
          totalBetAmount={totalBetAmount}
        />
      </CardContent>

      {/* Spin Controls */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearBets}
          >
            Clear Bets
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDoubleBets}
          >
            Double Bets
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Label htmlFor="spin-result" className="text-sm font-medium text-gray-700">
              Spin Result
            </Label>
            <Input 
              id="spin-result" 
              type="text" 
              value={spinResult}
              onChange={(e) => setSpinResult(e.target.value)}
              className="w-24 mt-1" 
              placeholder="00-36" 
            />
          </div>
          <Button
            onClick={onSpin}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Spin
          </Button>
        </div>
      </div>
    </Card>
  );
}
