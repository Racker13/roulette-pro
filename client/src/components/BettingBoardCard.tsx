
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useRouletteStore } from "@/store/useRouletteStore";
import { getAttributesForNumber } from "@/utils/getAttributesForNumber";
import { RouletteNumber } from "@/lib/types";

export function BettingBoardCard() {
  const { selectedChipValue, addBet } = useRouletteStore();

  // Function to handle single number bets
  const handleNumberClick = (num: RouletteNumber) => {
    addBet({
      type: "single",
      numbers: [num],
      amount: selectedChipValue
    });
  };

  // Function to handle column bets
  const handleColumnBet = (column: number[]) => {
    addBet({
      type: "column",
      numbers: column,
      amount: selectedChipValue
    });
  };

  // Function to handle dozen bets
  const handleDozenBet = (start: number, end: number) => {
    addBet({
      type: "dozen",
      numbers: Array.from({length: end - start + 1}, (_, i) => start + i),
      amount: selectedChipValue
    });
  };

  // Function to handle outside bets
  const handleOutsideBet = (type: string, numbers: number[]) => {
    addBet({
      type,
      numbers,
      amount: selectedChipValue
    });
  };

  // Column definitions
  const column1 = [1,4,7,10,13,16,19,22,25,28,31,34];
  const column2 = [2,5,8,11,14,17,20,23,26,29,32,35];
  const column3 = [3,6,9,12,15,18,21,24,27,30,33,36];

  return (
    <Card>
      <TooltipProvider>
        <CardHeader className="relative">
          <CardTitle>Betting Board</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-0 left-0 mt-1 ml-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs cursor-help">
                  i
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>BettingBoardCard</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
      </TooltipProvider>
      <CardContent>
        <div className="w-full bg-green-600 p-4 rounded-lg">
          <div className="grid grid-cols-[auto_repeat(12,_minmax(0,_1fr))_auto] gap-1">
            {/* Zero */}
            <div 
              className="row-span-3 w-12 bg-green-700 text-white h-full rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
              onClick={() => handleNumberClick(0)}
            >
              0
            </div>

            {/* Main betting grid 1-36 */}
            <div className="col-span-12">
              <div className="grid grid-rows-3 gap-1">
                {/* Row 1: [1,4,7,...,34] */}
                <div className="grid grid-cols-12 gap-1">
                  {column1.map((num) => (
                    <div
                      key={num}
                      className={`${getAttributesForNumber(num).color === 'red' ? 'bg-red-700' : 'bg-black'} text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {/* Row 2: [2,5,8,...,35] */}
                <div className="grid grid-cols-12 gap-1">
                  {column2.map((num) => (
                    <div
                      key={num}
                      className={`${getAttributesForNumber(num).color === 'red' ? 'bg-red-700' : 'bg-black'} text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {/* Row 3: [3,6,9,...,36] */}
                <div className="grid grid-cols-12 gap-1">
                  {column3.map((num) => (
                    <div
                      key={num}
                      className={`${getAttributesForNumber(num).color === 'red' ? 'bg-red-700' : 'bg-black'} text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column bets (2:1) */}
            <div className="flex flex-col justify-between h-full">
              {[column1, column2, column3].map((column, index) => (
                <div
                  key={`col-${index}`}
                  className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
                  onClick={() => handleColumnBet(column)}
                >
                  2:1
                </div>
              ))}
            </div>
          </div>

          {/* Dozen bets */}
          <div className="grid grid-cols-12 gap-1 mt-4">
            <div
              className="col-span-4 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleDozenBet(1, 12)}
            >
              1st Dozen
            </div>
            <div
              className="col-span-4 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleDozenBet(13, 24)}
            >
              2nd Dozen
            </div>
            <div
              className="col-span-4 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleDozenBet(25, 36)}
            >
              3rd Dozen
            </div>
          </div>

          {/* Outside bets */}
          <div className="flex justify-center gap-1 mt-4">
            <div
              className="w-24 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('low', Array.from({length: 18}, (_, i) => i + 1))}
            >
              1 to 18
            </div>
            <div
              className="w-24 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('even', Array.from({length: 18}, (_, i) => (i + 1) * 2))}
            >
              EVEN
            </div>
            <div
              className="w-24 bg-red-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('red', Array.from({length: 18}, (_, i) => i + 1).filter(n => getAttributesForNumber(n).color === 'red'))}
            >
              RED
            </div>
            <div
              className="w-24 bg-black text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('black', Array.from({length: 36}, (_, i) => i + 1).filter(n => getAttributesForNumber(n).color === 'black'))}
            >
              BLACK
            </div>
            <div
              className="w-24 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('odd', Array.from({length: 18}, (_, i) => i * 2 + 1))}
            >
              ODD
            </div>
            <div
              className="w-24 bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('high', Array.from({length: 18}, (_, i) => i + 19))}
            >
              19 to 36
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
