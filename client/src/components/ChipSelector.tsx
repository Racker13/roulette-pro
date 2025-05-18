import React from "react";
import { ChipValue } from "@/lib/types";

interface ChipSelectorProps {
  selectedChip: ChipValue;
  onChipSelect: (value: ChipValue) => void;
}

export default function ChipSelector({ selectedChip, onChipSelect }: ChipSelectorProps) {
  const chipValues: ChipValue[] = [1, 5, 25, 100, 500];
  
  // Function to get chip styling
  const getChipStyle = (value: ChipValue) => {
    const isSelected = value === selectedChip;
    
    let baseStyle = "h-10 w-10 rounded-full font-bold text-sm flex items-center justify-center cursor-pointer";
    let selectedStyle = isSelected ? "ring-2 ring-offset-2 scale-110" : "";
    
    switch (value) {
      case 1:
        return `${baseStyle} ${selectedStyle} bg-red-100 border-2 border-red-300 text-red-700`;
      case 5:
        return `${baseStyle} ${selectedStyle} bg-green-100 border-2 border-green-300 text-green-700`;
      case 25:
        return `${baseStyle} ${selectedStyle} bg-blue-100 border-2 border-blue-300 text-blue-700`;
      case 100:
        return `${baseStyle} ${selectedStyle} bg-purple-100 border-2 border-purple-300 text-purple-700`;
      case 500:
        return `${baseStyle} ${selectedStyle} bg-yellow-100 border-2 border-yellow-600 text-yellow-600`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="mb-4 flex space-x-2 items-center">
      <span className="text-sm font-medium text-gray-700">Chips:</span>
      {chipValues.map((value) => (
        <button
          key={`chip-${value}`}
          className={getChipStyle(value)}
          onClick={() => onChipSelect(value)}
        >
          ${value}
        </button>
      ))}
    </div>
  );
}
