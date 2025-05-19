
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Function to handle outside bets
  const handleOutsideBet = (type: string, numbers: number[]) => {
    addBet({
      type,
      numbers,
      amount: selectedChipValue
    });
  };

  // Function to get color classes
  const getColorClasses = (num: number) => {
    const { color } = getAttributesForNumber(num);
    return `${color === 'red' ? 'bg-red-700' : color === 'black' ? 'bg-black' : 'bg-green-700'} 
            text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Betting Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-green-600 p-4 rounded-lg">
          <div className="grid grid-cols-[auto_repeat(12,_minmax(0,_1fr))] gap-1">
            {/* Zero */}
            <div 
              className="row-span-3 bg-green-700 text-white h-full rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
              onClick={() => handleNumberClick(0)}
            >
              0
            </div>

            {/* Main betting grid 1-36 */}
            <div className="col-span-12">
              <div className="grid grid-rows-3 gap-1">
                {/* Top row: 3, 6, 9, ..., 36 */}
                <div className="grid grid-cols-12 gap-1">
                  {[3,6,9,12,15,18,21,24,27,30,33,36].map((num) => (
                    <div
                      key={num}
                      className={getColorClasses(num)}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                
                {/* Middle row: 2, 5, 8, ..., 35 */}
                <div className="grid grid-cols-12 gap-1">
                  {[2,5,8,11,14,17,20,23,26,29,32,35].map((num) => (
                    <div
                      key={num}
                      className={getColorClasses(num)}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                
                {/* Bottom row: 1, 4, 7, ..., 34 */}
                <div className="grid grid-cols-12 gap-1">
                  {[1,4,7,10,13,16,19,22,25,28,31,34].map((num) => (
                    <div
                      key={num}
                      className={getColorClasses(num)}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outside bets */}
          <div className="grid grid-cols-6 gap-1 mt-4">
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('low', Array.from({ length: 18 }, (_, i) => i + 1))}
            >
              1 to 18
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('even', Array.from({ length: 18 }, (_, i) => (i + 1) * 2))}
            >
              EVEN
            </div>
            <div
              className="bg-red-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('red', Array.from(RED_NUMBERS))}
            >
              RED
            </div>
            <div
              className="bg-black text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('black', Array.from({ length: 36 }, (_, i) => i + 1).filter(n => !RED_NUMBERS.has(n)))}
            >
              BLACK
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('odd', Array.from({ length: 18 }, (_, i) => i * 2 + 1))}
            >
              ODD
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBet('high', Array.from({ length: 18 }, (_, i) => i + 19))}
            >
              19 to 36
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
