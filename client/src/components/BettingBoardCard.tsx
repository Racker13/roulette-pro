import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouletteStore } from "@/store/useRouletteStore";
import { getAttributesForNumber } from "@/utils/getAttributesForNumber";
import { RouletteNumber } from "@/lib/types";

export function BettingBoardCard() {
  const { selectedChipValue, addBet } = useRouletteStore();

  // Array of numbers for the betting grid (1-36)
  const numbers: number[] = Array.from({ length: 36 }, (_, i) => 36 - i);

  // Function to handle number click
  const handleNumberClick = (num: RouletteNumber) => {
    addBet({
      type: "single",
      numbers: [num],
      amount: selectedChipValue
    });
  };

  // Function to handle outside bet click
  const handleOutsideBetClick = (type: string, numbers: number[]) => {
    addBet({
      type,
      numbers,
      amount: selectedChipValue
    });
  };

  // Function to get color classes
  const getColorClasses = (num: number) => {
    const { color } = getAttributesForNumber(num);
    return color === 'red' ? 'bg-red-700' : color === 'black' ? 'bg-black' : 'bg-green-700';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Betting Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-green-600 p-4 rounded-lg">
          {/* Main betting grid */}
          <div className="grid grid-cols-13 gap-1">
            {/* 0 cell */}
            <div className="row-span-3 flex items-center">
              <div 
                className="bg-green-700 text-white h-36 w-full rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
                onClick={() => handleNumberClick(0)}
              >
                0
              </div>
            </div>

            {/* Numbers 1-36 */}
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-1">
                {numbers.map((num) => (
                  <div
                    key={num}
                    className={`${getColorClasses(num)} text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80`}
                    onClick={() => handleNumberClick(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dozens */}
          <div className="grid grid-cols-3 gap-1 mt-1">
            {[1, 2, 3].map((dozen) => (
              <div
                key={`dozen-${dozen}`}
                className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
                onClick={() => handleOutsideBetClick(
                  'dozen',
                  Array.from({ length: 12 }, (_, i) => i + 1 + (dozen - 1) * 12)
                )}
              >
                {dozen === 1 ? '1st 12' : dozen === 2 ? '2nd 12' : '3rd 12'}
              </div>
            ))}
          </div>

          {/* Outside bets */}
          <div className="grid grid-cols-6 gap-1 mt-1">
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick(
                'low',
                Array.from({ length: 18 }, (_, i) => i + 1)
              )}
            >
              1-18
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick('even', [])}
            >
              EVEN
            </div>
            <div
              className="bg-red-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick('red', [])}
            >
              RED
            </div>
            <div
              className="bg-black text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick('black', [])}
            >
              BLACK
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick('odd', [])}
            >
              ODD
            </div>
            <div
              className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
              onClick={() => handleOutsideBetClick(
                'high',
                Array.from({ length: 18 }, (_, i) => i + 19)
              )}
            >
              19-36
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-3 gap-1 mt-1">
            {[1, 2, 3].map((col) => (
              <div
                key={`col-${col}`}
                className="bg-green-700 text-white h-12 rounded-md flex items-center justify-center font-medium cursor-pointer hover:opacity-80"
                onClick={() => handleOutsideBetClick(
                  'column',
                  Array.from({ length: 12 }, (_, i) => i * 3 + col)
                )}
              >
                Column {col}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}