import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CR6Downloader() {
  const handleDownload = async () => {
    try {
      // Create a new zip file
      const zip = new JSZip();

      // Add the required files to the zip
      const bettingBoardCardContent = `import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouletteStore } from "@/store/useRouletteStore";
import { getAttributesForNumber } from "@/lib/roulette";
import { RouletteNumber } from "@/lib/types";

export function BettingBoardCard() {
  const { selectedChipValue, addBet } = useRouletteStore();

  // Array of numbers for the betting grid (1-36)
  const numbers: number[] = Array.from({ length: 36 }, (_, i) => 36 - i);

  // Function to handle number click
  const handleNumberClick = (num: RouletteNumber) => {
    addBet({
      type: "straight",
      number: num,
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
                    className={\`\${getColorClasses(num)} text-white h-12 rounded-md flex items-center justify-center font-bold cursor-pointer hover:opacity-80\`}
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
                key={\`dozen-\${dozen}\`}
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
                key={\`col-\${col}\`}
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
}`;

      const rouletteTypesContent = `export type RouletteNumber = number | '00';
export type RouletteColor = 'red' | 'black' | 'green';

export interface SpinResult {
  number: RouletteNumber;
  color: RouletteColor;
  isEven: boolean;
  isLow: boolean;
}

export type ChipValue = 1 | 5 | 10 | 25 | 100 | 500 | 1000;

export interface Bet {
  id: string;
  type: string;
  number?: RouletteNumber;
  numbers?: number[];
  amount: number;
}`;

      const rouletteStoreContent = `import { create } from 'zustand';
import type { ChipValue, Bet, SpinResult } from '@/lib/types';

interface RouletteState {
  selectedChipValue: ChipValue;
  placedBets: Bet[];
  spinResults: SpinResult[];
  setSelectedChipValue: (value: ChipValue) => void;
  addBet: (bet: Omit<Bet, 'id'>) => void;
  clearBets: () => void;
  addSpinResult: (number: number | '00') => void;
  clearSpinResults: () => void;
}

export const useRouletteStore = create<RouletteState>((set) => ({
  selectedChipValue: 1,
  placedBets: [],
  spinResults: [],
  setSelectedChipValue: (value) => set({ selectedChipValue: value }),
  addBet: (bet) => set((state) => ({
    placedBets: [...state.placedBets, { ...bet, id: crypto.randomUUID() }]
  })),
  clearBets: () => set({ placedBets: [] }),
  addSpinResult: (number) => set((state) => {
    const color = number === 0 || number === '00' ? 'green' : 
      [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(number as number) ? 'red' : 'black';
    const numValue = typeof number === 'number' ? number : 0;
    const result: SpinResult = {
      number,
      color,
      isEven: numValue > 0 && numValue % 2 === 0,
      isLow: numValue >= 1 && numValue <= 18
    };
    return {
      spinResults: [result, ...state.spinResults].slice(0, 20)
    };
  }),
  clearSpinResults: () => set({ spinResults: [] })
}));`;

      const getAttributesForNumberContent = `import { RouletteColor, RouletteNumber } from "./types";

interface NumberAttributes {
    color: RouletteColor;
    isEven: boolean;
    isLow: boolean;
}

export const getAttributesForNumber = (number: RouletteNumber): NumberAttributes => {
    const num = typeof number === 'number' ? number : -1;
    const color: RouletteColor = number === 0 ? 'green' :
        [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number as number) ? 'red' : 'black';
    const isEven = num > 0 && num % 2 === 0;
    const isLow = num >= 1 && num <= 18;

    return {
        color,
        isEven,
        isLow,
    };
};`;

      // Add files to the zip
      zip.file("BettingBoardCard.tsx", bettingBoardCardContent);
      zip.file("types.ts", rouletteTypesContent);
      zip.file("useRouletteStore.ts", rouletteStoreContent);
      zip.file("getAttributesForNumber.ts", getAttributesForNumberContent);

      // Generate the zip
      const content = await zip.generateAsync({ type: "blob" });

      // Save the zip file
      saveAs(content, "cr7-files.zip");
    } catch (error) {
      console.error("Error downloading files:", error);
      alert("Failed to download files. See console for details.");
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      variant="outline" 
      size="sm" 
      className="flex items-center"
    >
      <Download className="mr-2 h-4 w-4" /> Zip Download
    </Button>
  );
}