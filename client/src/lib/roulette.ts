import { 
  RouletteNumber, 
  RouletteColor, 
  SpinResult, 
  Bet, 
  BetType
} from "./types";

// Array of all roulette numbers
export function getRouletteNumbers(): RouletteNumber[] {
  return [
    0, "00",
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
  ];
}

// Number attributes interface
interface BetAttributes {
  number: number;
  color: 'red' | 'black' | 'green';
  isOdd: boolean;
  isEven: boolean;
  isLow: boolean;    // 1–18
  isHigh: boolean;   // 19–36
  dozen: 1 | 2 | 3 | null;   // null for 0
  column: 1 | 2 | 3 | null;  // null for 0
}

// Define red numbers
const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

export const getColorFromNumber = (n: number): 'red' | 'black' | 'green' => {
  if (n === 0) return 'green';
  return RED_NUMBERS.has(n) ? 'red' : 'black';
};

export const getAttributesForNumber = (n: number): BetAttributes => {
  return {
    number: n,
    color: getColorFromNumber(n),
    isOdd: n !== 0 && n % 2 === 1,
    isEven: n !== 0 && n % 2 === 0,
    isLow: n >= 1 && n <= 18,
    isHigh: n >= 19 && n <= 36,
    dozen: n === 0 ? null : Math.ceil(n / 12) as 1 | 2 | 3,
    column: n === 0 ? null : (n % 3 === 1 ? 1 : n % 3 === 2 ? 2 : 3)
  };
};

// Define black numbers
const blackNumbers: number[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35
];

// Get color of a number
export function getNumberColor(num: RouletteNumber): RouletteColor {
  if (num === 0 || num === "00") return "green";
  if (redNumbers.includes(num as number)) return "red";
  return "black";
}

// Get properties of a number
export function getNumberProperties(num: RouletteNumber): SpinResult {
  const numValue = typeof num === "number" ? num : 0;
  const color = getNumberColor(num);
  
  return {
    number: num,
    color,
    isEven: numValue > 0 && numValue % 2 === 0,
    isLow: numValue >= 1 && numValue <= 18
  };
}

// Get user-friendly display name for a bet
export function getBetDisplayName(betType: BetType): string {
  switch (betType.type) {
    case "straight":
      return `Number ${betType.number}`;
    case "split":
      return `Split ${betType.numbers.join("/")}`;
    case "street":
      return `Street ${betType.numbers[0]}-${betType.numbers[2]}`;
    case "corner":
      return `Corner ${betType.numbers.join("/")}`;
    case "five":
      return "Five Number Bet";
    case "sixline":
      return `Six Line ${betType.numbers[0]}-${betType.numbers[5]}`;
    case "dozen":
      return `${betType.dozen} Dozen`;
    case "column":
      return `Column ${betType.column}`;
    case "red":
      return "Red";
    case "black":
      return "Black";
    case "even":
      return "Even";
    case "odd":
      return "Odd";
    case "low":
      return "1-18";
    case "high":
      return "19-36";
    default:
      return "Unknown Bet";
  }
}

// Calculate winnings for all bets based on the spin result
export function calculateWinnings(bets: Bet[], result: SpinResult): number {
  let totalWinnings = 0;

  for (const bet of bets) {
    const { betType, amount } = bet;
    
    switch (betType.type) {
      case "straight":
        // Pays 35:1
        if (betType.number === result.number) {
          totalWinnings += amount * 36; // Original bet + 35x winnings
        }
        break;
        
      case "split":
        // Pays 17:1
        if (betType.numbers.includes(result.number)) {
          totalWinnings += amount * 18; // Original bet + 17x winnings
        }
        break;
        
      case "street":
        // Pays 11:1
        if (betType.numbers.includes(result.number)) {
          totalWinnings += amount * 12; // Original bet + 11x winnings
        }
        break;
        
      case "corner":
        // Pays 8:1
        if (betType.numbers.includes(result.number)) {
          totalWinnings += amount * 9; // Original bet + 8x winnings
        }
        break;
        
      case "five":
        // Pays 6:1
        if (betType.numbers.includes(result.number)) {
          totalWinnings += amount * 7; // Original bet + 6x winnings
        }
        break;
        
      case "sixline":
        // Pays 5:1
        if (betType.numbers.includes(result.number)) {
          totalWinnings += amount * 6; // Original bet + 5x winnings
        }
        break;
        
      case "dozen":
        // Pays 2:1
        if (
          (betType.dozen === "1st" && result.number >= 1 && result.number <= 12) ||
          (betType.dozen === "2nd" && result.number >= 13 && result.number <= 24) ||
          (betType.dozen === "3rd" && result.number >= 25 && result.number <= 36)
        ) {
          totalWinnings += amount * 3; // Original bet + 2x winnings
        }
        break;
        
      case "column":
        // Pays 2:1
        // Column 1: 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34
        // Column 2: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35
        // Column 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36
        if (typeof result.number === 'number' && result.number > 0) {
          const remainder = result.number % 3;
          const column = remainder === 0 ? 3 : remainder;
          
          if (column === betType.column) {
            totalWinnings += amount * 3; // Original bet + 2x winnings
          }
        }
        break;
        
      case "red":
        // Pays 1:1
        if (result.color === "red") {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
        
      case "black":
        // Pays 1:1
        if (result.color === "black") {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
        
      case "even":
        // Pays 1:1
        if (result.isEven) {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
        
      case "odd":
        // Pays 1:1
        if (!result.isEven && result.number !== 0 && result.number !== "00") {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
        
      case "low":
        // Pays 1:1
        if (result.isLow) {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
        
      case "high":
        // Pays 1:1
        if (!result.isLow && result.number !== 0 && result.number !== "00") {
          totalWinnings += amount * 2; // Original bet + 1x winnings
        }
        break;
    }
  }

  return totalWinnings;
}
