
import { RouletteColor, RouletteNumber } from "@/lib/types";

interface NumberAttributes {
  color: RouletteColor;
  isEven: boolean;
  isOdd: boolean;
  isLow: boolean;
  isHigh: boolean;
  dozen: 1 | 2 | 3 | null;
  column: 1 | 2 | 3 | null;
}

const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

export function getAttributesForNumber(n: number): NumberAttributes {
  if (n === 0) {
    return {
      color: 'green',
      isEven: false,
      isOdd: false,
      isLow: false,
      isHigh: false,
      dozen: null,
      column: null
    };
  }

  return {
    color: RED_NUMBERS.has(n) ? 'red' : 'black',
    isEven: n % 2 === 0,
    isOdd: n % 2 === 1,
    isLow: n <= 18,
    isHigh: n > 18,
    dozen: Math.ceil(n / 12) as 1 | 2 | 3,
    column: ((n - 1) % 3 + 1) as 1 | 2 | 3
  };
}
